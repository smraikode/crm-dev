from fastapi import APIRouter, HTTPException, Request, Response, Query
from pydantic import BaseModel
from services.msg_service import send_sms, send_whatsapp, make_call
from twilio.twiml.voice_response import VoiceResponse

router = APIRouter(prefix="/msg-service", tags=["msg-service"])

class MessageRequest(BaseModel):
    to: str
    message: str

@router.post("/send-sms")
def send_sms_route(req: MessageRequest):
    try:
        result = send_sms(req.to, req.message)
        return {"sid": result.sid, "status": result.status}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/send-whatsapp")
def send_whatsapp_route(req: MessageRequest):
    try:
        result = send_whatsapp(req.to, req.message)
        return {"sid": result.sid, "status": result.status}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/call-client")
async def call_client(to_number: str = Query(..., description="E.164 client phone number, e.g. +91XXXXXXXXXX")):
    try:
        twiml_url = "https://abbe3b71779d.ngrok-free.app/api/msg-service/voice-handler"
        call = make_call(to_number, twiml_url)
        return {"call_sid": call.sid, "status": call.status}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/voice-handler")
async def voice_handler(request: Request):
    resp = VoiceResponse()
    resp.say("Hello, this is your CRM calling. Please wait for the agent.", voice="alice")
    return Response(content=str(resp), media_type="application/xml")
