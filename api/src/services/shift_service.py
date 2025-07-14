from models.shift_model import Shift
import logging
from utils.db_client import get_db

logger = logging.getLogger(__name__)

db = get_db()

def get_next_shift_id():
    shifts_ref = db.collection("shifts")
    all_docs = shifts_ref.stream()
    ids = [int(doc.id) for doc in all_docs if doc.id.isdigit()]
    return max(ids) + 1 if ids else 1

def add_shift(name: str, start_time: str, end_time: str) -> Shift:
    next_id = get_next_shift_id()
    shift_data = {
        "id": next_id,
        "name": name,
        "start_time": start_time,
        "end_time": end_time,
    }
    db.collection("shifts").document(str(next_id)).set(shift_data)
    return Shift(**shift_data)

def get_all_shifts():
    shifts = []
    docs = db.collection("shifts").order_by("id").stream()
    for doc in docs:
        shift = doc.to_dict()
        shifts.append(shift)
    return shifts
