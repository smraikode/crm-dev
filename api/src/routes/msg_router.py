from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.msg_service import send_sms, send_whatsapp

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
