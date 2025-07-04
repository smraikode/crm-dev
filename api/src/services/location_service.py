import logging
from datetime import datetime, timezone, timedelta

from firebase_admin import firestore

logger = logging.getLogger(__name__)

db = firestore.client()


def add_location(email: str, longitude: float, latitude: float, status: str) -> bool:
    try:
        doc = {
            "email": email,
            "longitude": longitude,
            "latitude": latitude,
            "status": status,
            "updated_at": datetime.now(timezone.utc),
        }
        db.collection("user_location").add(doc)
        return True
    except Exception as e:
        logger.error(f"Error adding location for {email}: {e}")
        return False


def get_all_user_locations_details():
    docs = db.collection("user_location").stream()
    return [doc.to_dict() for doc in docs]


def get_user_timeline(email: str, target_date: datetime.date):
    query = db.collection("user_location").where("email", "==", email)
    docs = query.stream()
    timeline = []

    for doc in docs:
        data = doc.to_dict()
        ts = data.get("updated_at")
        if ts and ts.date() == target_date:
            timeline.append({
                "status": data.get("status"),
                "timestamp": ts.isoformat(),
            })
    return timeline


def get_attendance_history(email: str, date: str = None):
    query = db.collection("user_location").where("email", "==", email)

    if date:
        date_obj = datetime.strptime(date, "%Y-%m-%d")
        start = datetime(date_obj.year, date_obj.month, date_obj.day, tzinfo=timezone.utc)
        end = start + timedelta(days=1)
        query = query.where("updated_at", ">=", start).where("updated_at", "<", end)

    query = query.order_by("updated_at", direction=firestore.Query.DESCENDING)

    records = []
    for doc in query.stream():
        data = doc.to_dict()
        records.append({
            "timestamp": data.get("updated_at").isoformat() if data.get("updated_at") else None,
            "status": data.get("status"),
            "longitude": data.get("longitude"),
            "latitude": data.get("latitude"),
        })
    return records
