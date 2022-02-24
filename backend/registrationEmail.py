import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime


def sendRegistrationEmail(sendTo, camperName, weekDetails, total):
    port = 465  # For SSL
    sender_email = "info@campizza.com"
    receiver_email = f"{sendTo}"
    password = "fmbudhyxhglbhiis"

    message = MIMEMultipart("alternative")
    message["Subject"] = f"Camp Izza Registration Summary for {camperName}"
    message["From"] = sender_email
    message["To"] = receiver_email

    text = f"""\
    You have registered {camperName} for the following week(s) at Camp Izza!
    """
    text += "\n".join([weekDetail for weekDetail in weekDetails])
    for weekDetail in weekDetails:
        if "waitlist" in weekDetail.lower():
            text += f"""\
            Waitlist Information:
            As soon as a spot becomes available for a week you are on the waitlist for, you will be contacted.
            If a space does not become available, you will receive a full refund for that week.
            """
            break
    text += f"""\
    Total Amount Paid: ${total}
    Transaction Date: {datetime.now().strftime("%m/%d/%Y %H:%M:%S")}
    
    Camp Izza is a 501 (c)(3) non-profit organization registered in the state of California with federal tax ID 
    #26-2174441.
    PO Box 50326, Irvine CA, 92612 • (949) 422-8123
    © 2022 Camp Izza
    """

    html = f"""\
    <html>
        <body>
            <img src="https://tinyurl.com/campizzalogo" alt="Camp Izza Logo" height="75"> 
            <h2>Receipt</h2>
            <p>You have registered {camperName} for the following week(s) at Camp Izza!</p>
            <ul>
    """
    html += "\n".join([f"<li>{weekDetail}</li>" for weekDetail in weekDetails]) + "</ul>"
    html += f"""
    <p>Total Amount Paid: ${total}</p>
    <p>Transaction Date: {datetime.now().strftime("%m/%d/%Y %H:%M:%S")}</p>
    """
    for weekDetail in weekDetails:
        if "waitlist" in weekDetail.lower():
            html += """
                <b>Waitlist Information:</b>
                <p>As soon as a spot becomes available for a week you are on the waitlist for, you will be contacted.</p>
                <p>If a space does not become available, you will receive a full refund for that week.</p>
            """

    html += f"""\
    <div style="padding-top: 10px; background-color: rgb(255, 224, 143); bottom: 0; left: 0; width: 100%; margin-top: 50px; min-height: 10vh;">
        <div style ="margin-left: auto; margin-right: auto; font-family: Comfortaa; text-align: center; font-size: 12px; font-weight: 700;">
            Camp Izza is a 501 (c)(3) non-profit organization registered in the state of California with federal tax ID
            #26-2174441.
            <br /> PO Box 50326, Irvine CA, 92612 • (949) 422-8123 • info@campizza.com
            <br /> © 2022 Camp Izza
        </div>
    </div>
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
