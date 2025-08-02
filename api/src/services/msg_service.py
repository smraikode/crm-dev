from twilio.rest import Client

from env import TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER


WHATSAPP_SANDBOX_NUMBER = "whatsapp:+14155238886"
# Twilio config
TWILIO_ACCOUNT_SID

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)


def send_sms(to_number: str, message: str):
    return client.messages.create(body=message, from_=TWILIO_PHONE_NUMBER, to=to_number)


def send_whatsapp(to_number: str, message: str):
    return client.messages.create(
        body=message, from_=WHATSAPP_SANDBOX_NUMBER, to=f"whatsapp:{to_number}"
    )

def make_call(to_number: str, twiml_url: str):
    return client.calls.create(
        to=to_number,
        from_=TWILIO_PHONE_NUMBER,
        url=twiml_url
    )