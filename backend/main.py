
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, field_validator
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime
import smtplib
import os
from dotenv import load_dotenv
import logging

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ── App ────────────────────────────────────────────────
app = FastAPI(
    title="Portfolio Contact API",
    description="Sends contact form submissions to Anshul's email",
    version="1.0.0"
)

# ── CORS — allow your frontend origin ─────────────────
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS").split(",")
print(ALLOWED_ORIGINS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

# ── Config from .env ───────────────────────────────────
SMTP_HOST     = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT     = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER     = os.getenv("SMTP_USER")       # your Gmail address
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")   # Gmail App Password
OWNER_EMAIL   = os.getenv("OWNER_EMAIL")     # where YOU receive messages
OWNER_NAME    = os.getenv("OWNER_NAME", "Anshul Guleria")


# ── Request schema ─────────────────────────────────────
class ContactPayload(BaseModel):
    name: str
    email: EmailStr
    message: str

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Name cannot be empty")
        if len(v) > 100:
            raise ValueError("Name is too long")
        return v

    @field_validator("message")
    @classmethod
    def message_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Message cannot be empty")
        if len(v) > 5000:
            raise ValueError("Message exceeds 5000 characters")
        return v


# ── Email builders ─────────────────────────────────────
def build_owner_email(payload: ContactPayload) -> MIMEMultipart:
    """
    Rich HTML email delivered to the portfolio owner.
    """
    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"📬 Portfolio Contact: {payload.name}"
    msg["From"]    = f"Portfolio Contact <{SMTP_USER}>"
    msg["To"]      = OWNER_EMAIL
    msg["Reply-To"] = payload.email

    timestamp = datetime.now().strftime("%d %b %Y, %H:%M")

    html = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body      {{ font-family: 'Segoe UI', sans-serif; background:#f5f0e8; margin:0; padding:0; }}
    .wrapper  {{ max-width:580px; margin:40px auto; background:#fff;
                 border-radius:12px; overflow:hidden;
                 box-shadow:0 4px 24px rgba(100,60,20,0.12); }}
    .header   {{ background:#1F1610; padding:28px 32px; }}
    .header h1{{ color:#E8AD54; font-size:22px; margin:0; letter-spacing:-0.5px; }}
    .header p {{ color:#A08060; font-size:12px; margin:6px 0 0; letter-spacing:1px; text-transform:uppercase; }}
    .body     {{ padding:28px 32px; }}
    .field    {{ margin-bottom:20px; }}
    .label    {{ font-size:10px; letter-spacing:2px; text-transform:uppercase;
                 color:#B09070; font-weight:600; margin-bottom:6px; }}
    .value    {{ font-size:15px; color:#1E1208; line-height:1.6; }}
    .message  {{ background:#FAF6EF; border-left:3px solid #C48C3C;
                 padding:16px 20px; border-radius:0 8px 8px 0;
                 font-size:14px; color:#3C2A14; line-height:1.75; white-space:pre-wrap; }}
    .reply-btn{{ display:inline-block; margin-top:24px; padding:12px 28px;
                 background:#B5621E; color:#fff; text-decoration:none;
                 border-radius:4px; font-size:13px; font-weight:700;
                 letter-spacing:1px; text-transform:uppercase; }}
    .footer   {{ background:#FAF6EF; padding:16px 32px; border-top:1px solid #EDE4D8;
                 font-size:11px; color:#B09070; text-align:center; letter-spacing:0.5px; }}
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>New Portfolio Message</h1>
      <p>Received {timestamp}</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">From</div>
        <div class="value"><strong>{payload.name}</strong></div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:{payload.email}" style="color:#B5621E">{payload.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message">{payload.message}</div>
      </div>
      <a class="reply-btn" href="mailto:{payload.email}?subject=Re: Your message on my portfolio">
        Reply to {payload.name} →
      </a>
    </div>
    <div class="footer">Sent via your portfolio contact form · anshulguleria.dev</div>
  </div>
</body>
</html>
"""
    msg.attach(MIMEText(html, "html"))
    return msg


def build_confirmation_email(payload: ContactPayload) -> MIMEMultipart:
    """
    Auto-reply confirmation sent back to the visitor.
    """
    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Got your message, {payload.name.split()[0]}! 👋"
    msg["From"]    = f"{OWNER_NAME} <{SMTP_USER}>"
    msg["To"]      = payload.email

    html = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body      {{ font-family: 'Segoe UI', sans-serif; background:#f5f0e8; margin:0; padding:0; }}
    .wrapper  {{ max-width:580px; margin:40px auto; background:#fff;
                 border-radius:12px; overflow:hidden;
                 box-shadow:0 4px 24px rgba(100,60,20,0.12); }}
    .header   {{ background:#1F1610; padding:28px 32px; }}
    .header h1{{ color:#E8AD54; font-size:22px; margin:0; }}
    .header p {{ color:#A08060; font-size:13px; margin:8px 0 0; }}
    .body     {{ padding:28px 32px; color:#3C2A14; line-height:1.75; font-size:15px; }}
    .body p   {{ margin:0 0 16px; }}
    .quote    {{ background:#FAF6EF; border-left:3px solid #C48C3C;
                 padding:14px 18px; border-radius:0 8px 8px 0;
                 font-size:13px; color:#5C3D1E; white-space:pre-wrap; margin:20px 0; }}
    .sig      {{ margin-top:24px; font-size:14px; color:#8C6030; }}
    .footer   {{ background:#FAF6EF; padding:14px 32px; border-top:1px solid #EDE4D8;
                 font-size:11px; color:#B09070; text-align:center; }}
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Thanks for reaching out!</h1>
      <p>I'll get back to you as soon as possible.</p>
    </div>
    <div class="body">
      <p>Hi <strong>{payload.name.split()[0]}</strong>,</p>
      <p>
        Thanks for getting in touch! I've received your message and will
        reply within 1–2 business days.
      </p>
      <p>Here's a copy of what you sent:</p>
      <div class="quote">{payload.message}</div>
      <p>Looking forward to connecting!</p>
      <div class="sig">
        — {OWNER_NAME}<br>
        <a href="mailto:{OWNER_EMAIL}" style="color:#B5621E">{OWNER_EMAIL}</a>
      </div>
    </div>
    <div class="footer">This is an automated confirmation · Please do not reply to this email</div>
  </div>
</body>
</html>
"""
    msg.attach(MIMEText(html, "html"))
    return msg


# ── SMTP sender ────────────────────────────────────────
def send_email(msg: MIMEMultipart) -> None:
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.ehlo()
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(msg["From"], msg["To"], msg.as_string())
        logger.info(f"Email sent → {msg['To']}")


# ── Routes ─────────────────────────────────────────────

@app.get("/")
def hello():
    return "Hello from backend"

@app.get("/health")
def health():
    return {"status": "ok", "service": "portfolio-contact-api"}


@app.post("/api/contact")
async def contact(payload: ContactPayload):
    # Guard: ensure env vars are configured
    if not all([SMTP_USER, SMTP_PASSWORD, OWNER_EMAIL]):
        logger.error("SMTP credentials not configured in .env")
        raise HTTPException(
            status_code=503,
            detail="Email service is not configured. Please set up .env credentials."
        )

    try:
        # 1. Notify the owner
        owner_msg = build_owner_email(payload)
        send_email(owner_msg)

        # 2. Auto-reply to the sender
        confirm_msg = build_confirmation_email(payload)
        send_email(confirm_msg)

        logger.info(f"Contact form handled: {payload.name} <{payload.email}>")
        return {
            "success": True,
            "message": f"Message received! A confirmation has been sent to {payload.email}."
        }

    except smtplib.SMTPAuthenticationError:
        logger.error("SMTP authentication failed — check SMTP_USER and SMTP_PASSWORD in .env")
        raise HTTPException(status_code=401, detail="Email authentication failed. Check your SMTP credentials.")

    except smtplib.SMTPException as e:
        logger.error(f"SMTP error: {e}")
        raise HTTPException(status_code=502, detail="Failed to send email. Please try again later.")

    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")


# ── Validation error handler ───────────────────────────
@app.exception_handler(422)
async def validation_error_handler(request: Request, exc):
    return JSONResponse(
        status_code=422,
        content={"success": False, "message": "Invalid form data. Please check all fields."}
    )

# This is important for Vercel
if __name__ == "__main__":
    import uvicorn
    print("Running app")
    uvicorn.run(app, host="0.0.0.0", port=8000)