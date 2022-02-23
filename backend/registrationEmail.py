import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def sendRegistrationEmail(sendTo, camperName, weekDetails):
    port = 465  # For SSL
    sender_email = "info@campizza.com"
    receiver_email = f"{sendTo}"
    password = "fmbudhyxhglbhiis"

    message = MIMEMultipart("alternative")
    message["Subject"] = f"Camp Izza Registration Summary for {camperName}"
    message["From"] = sender_email
    message["To"] = receiver_email

    text = f"""\
    You have registered {camperName} for the following week(s)!
    """
    text += "\n".join([weekDetail for weekDetail in weekDetails])
    text += f"""\
    As soon as a spot becomes available for a week you are on the waitlist for, you will be contacted.
    If a space does not become available, you will receive a full refund for that week.
    """

    html = f"""\
    <html>
      <body>
        <h2>Weeks Registered</h2>
        <p>You have registered {camperName} for the following week(s)!</p>
        <ul>
    """
    html += "\n".join([f"<li>{weekDetail}</li>" for weekDetail in weekDetails])
    html += """
        </ul>
        <p>As soon as a spot becomes available for a week you are on the waitlist for, you will be contacted.</p>
        <p>If a space does not become available, you will receive a full refund for that week.</p>
      </body>
    </html>
    """

    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")
    message.attach(part1)
    message.attach(part2)

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())
