import logging
from typing import Optional

import jwt
from fastapi import HTTPException

from env import SECRET_KEY, ALGORITHM

logger = logging.getLogger(__name__)


def decode_token(token: str) -> dict:
    try:
        token = token.strip().split("Bearer ")[-1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("email") or payload.get("sub")
        role = payload.get("role")
        if not email:
            raise HTTPException(status_code=400, detail="Token missing email")
        return {"email": email, "role": role}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


def verify_jwt_token(token: str) -> Optional[dict]:
    try:
        token = token.strip().split("Bearer ")[-1]
        decoded = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded
    except Exception as e:
        logging.error(f"JWT verification failed: {e}")
        return None
