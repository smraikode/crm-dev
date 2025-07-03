from datetime import datetime
from typing import Union

from pydantic import BaseModel
from models.lead import Lead
from env import ALGORITHM, SECRET_KEY
from firebase_config import *
from firebase_admin import firestore
from models.user import User
from utils.security import hash_password, verify_password
from models.task import Task
from datetime import datetime
import jwt
from datetime import datetime


db = firestore.client()


def create_user(user: User):
    user_ref = db.collection("users").document(user.email)
    user_ref.set(
        {
            "name": user.name,
            "lastName": user.lastName,
            "email": user.email,
            "phone": user.phone,
            "role": "employee",
            "password": hash_password(user.password),
        }
    )




def get_user_by_email(email: str):
    user_ref = db.collection("users").document(email)
    user = user_ref.get()
    if user.exists:
        return user.to_dict()
    return None


def verify_user(email: str, password: str):
    user_data = get_user_by_email(email)
    if user_data and verify_password(password, user_data["password"]):
        return user_data
    return None





def add_location(email: str, longitude: float, latitude: float, status: str):
    try:
        print(f"?? Adding to Firestore -> Email: {email}, Lat: {latitude}, Long: {longitude}, Status: {status}")
        user_location_ref = db.collection("user_location")

        result = user_location_ref.add({
            "email": email,
            "longitude": longitude,
            "latitude": latitude,
            "status": status,
            "updated_at": firestore.SERVER_TIMESTAMP,
        })

        print(f"? Firestore write successful. Document ID: {result[1].id}")
        return True

    except Exception as e:
        print("? Firestore Error:", e)
        return False


def assign_role_to_user(email: str, role: str, subordinates: list = None):
    user_ref = db.collection("users").document(email)
    user_doc = user_ref.get()

    if not user_doc.exists:
        return False

    update_data = {"role": role}

    if subordinates is not None:
        current_data = user_doc.to_dict()
        existing_subs = current_data.get("subordinates", [])

        # Fetch all user docs for resolving name/role if needed
        all_users_docs = db.collection("users").stream()
        user_lookup = {u.id: u.to_dict() for u in all_users_docs}

        # Format subordinate entries
        formatted_subs = []
        for sub in subordinates:
            if " - " in sub:
                formatted_subs.append(sub)
            else:
                user_data = user_lookup.get(sub)
                if user_data:
                    formatted_subs.append(
                        f"{user_data.get('name', sub)} ({user_data.get('role', 'employee')}) - {sub}"
                    )
                else:
                    formatted_subs.append(sub)

        merged_subs = list(set(existing_subs + formatted_subs))
        update_data["subordinates"] = merged_subs

    user_ref.update(update_data)
    return True


def verify_jwt_token(token: str):
    try:
        cleaned_token = token.strip()
        if cleaned_token.startswith("Bearer "):
            cleaned_token = cleaned_token.split(" ", 1)[1]
        decoded_token = jwt.decode(cleaned_token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_token
    except Exception as e:
        print(f"JWT verification failed: {e}")
        return None


def remove_subordinate_from_user(user_email: str, subordinate_email: str) -> bool:
    user_ref = db.collection("users").document(user_email)
    user_doc = user_ref.get()

    if not user_doc.exists:
        return False

    user_data = user_doc.to_dict()
    current_subs = user_data.get("subordinates", [])

    # Match using email only
    updated_subs = [
        s for s in current_subs if not s.strip().endswith(f"- {subordinate_email}")
    ]

    if len(updated_subs) == len(current_subs):
        return False  # no matching subordinate found

    user_ref.update({"subordinates": updated_subs})
    return True


# def create_lead(lead: Lead):
#     leads_ref = db.collection("leads")
#     lead_data = lead.dict()
#     # Set default status if not already set
#     lead_data.setdefault("status", "New")
#     lead_data["createdAt"] = datetime.utcnow().isoformat()
#     leads_ref.add(lead_data)

def create_lead(lead: Union[Lead, dict]):
    leads_ref = db.collection("leads")
    lead_data = lead.dict() if isinstance(lead, BaseModel) else lead
    lead_data.setdefault("status", "New")
    lead_data["createdAt"] = datetime.utcnow().isoformat()
    leads_ref.add(lead_data)

def check_duplicate_lead(email: str = "", phone: str = "") -> bool:
    leads_ref = db.collection("leads")
    query = leads_ref

    if email:
        query = query.where("email", "==", email)
    if phone:
        query = query.where("phone", "==", phone)

    docs = query.stream()
    for _ in docs:
        return True  # Found at least one duplicate
    return False

def get_all_leads() -> list:
    leads_ref = db.collection("leads")
    docs = leads_ref.stream()
    leads = []

    for doc in docs:
        lead = doc.to_dict()
        lead["id"] = doc.id  # Include Firestore document ID
        lead.setdefault("status", "New")  # Optional default if status missing
        leads.append(lead)

    return leads


def create_task(task: Task) -> str:
    tasks_ref = db.collection("tasks")
    task_data = {
        "title": task.title,
        "description": task.description,
        "assigned_to": task.assigned_to,
        "lead_email": task.lead_email,
        "priority": task.priority,
        "due_date": task.due_date.isoformat(),  # Add this line
        "status": "Pending",
        "created_at": datetime.utcnow().isoformat()
    }
    task_doc = tasks_ref.document()
    task_doc.set(task_data)
    return task_doc.id

def get_tasks_by_email(email: str) -> list:
    tasks_ref = db.collection("tasks")
    query = tasks_ref.where("assigned_to", "==", email)
    docs = query.stream()

    tasks = []
    for doc in docs:
        task = doc.to_dict()
        task["id"] = doc.id

        if "due_date" in task:
            task["dueDate"] = task.pop("due_date").split("T")[0]  # only date

        # Fetch lead info using email field
        lead_email = task.get("lead_email")
        if lead_email:
            lead_query = db.collection("leads").where("email", "==", lead_email).limit(1).stream()
            for lead_doc in lead_query:
                lead_data = lead_doc.to_dict()
                task["leadName"] = lead_data.get("firstName", "-")
                task["leadEmail"] = lead_data.get("email", "-")
                task["leadPhone"] = lead_data.get("phone", "-")
                task["leadProject"] = lead_data.get("project", "-")

        tasks.append(task)

    return tasks

def update_task_status(task_id: str, new_status: str) -> bool:
    task_ref = db.collection("tasks").document(task_id)
    if not task_ref.get().exists:
        return False
    task_ref.update({"status": new_status})
    return True

def get_tasks_of_subordinates(manager_email: str) -> list:
    manager_doc = db.collection("users").document(manager_email).get()
    if not manager_doc.exists:
        return []

    subordinates = manager_doc.to_dict().get("subordinates", [])
    subordinate_emails = [entry.split(" - ")[-1].strip() for entry in subordinates if " - " in entry]

    all_tasks = []
    for email in subordinate_emails:
        tasks = get_tasks_by_email(email)
        all_tasks.extend(tasks)

    return all_tasks


def build_org_tree(email: str) -> dict:
    user_ref = db.collection("users").document(email)
    user_doc = user_ref.get()
    if not user_doc.exists:
        return {}

    user_data = user_doc.to_dict()
    subordinates_raw = user_data.get("subordinates", [])
    subordinate_emails = [entry.split(" - ")[-1].strip() for entry in subordinates_raw if " - " in entry]

    # Build child trees recursively
    children = [build_org_tree(sub_email) for sub_email in subordinate_emails]

    return {
        "name": user_data.get("name", ""),
        "role": user_data.get("role", ""),
        "email": email,
        "children": children
    }

from models.property import Property

def create_property(property: Property):
    prop_ref = db.collection("properties")
    property_data = property.dict()
    property_data["createdAt"] = datetime.utcnow().isoformat()
    prop_ref.add(property_data)

def get_all_properties():
    prop_ref = db.collection("properties")
    docs = prop_ref.stream()
    return [dict(doc.to_dict(), id=doc.id) for doc in docs]

def update_property(property_id: str, property: Property) -> bool:
    prop_ref = db.collection("properties").document(property_id)
    if not prop_ref.get().exists:
        return False
    prop_ref.update(property.dict())
    return True

def delete_property(property_id: str) -> bool:
    prop_ref = db.collection("properties").document(property_id)
    if not prop_ref.get().exists:
        return False
    prop_ref.delete()
    return True
    


    from firebase_admin import firestore

# def get_all_user_locations_details():
#     db = firestore.client()
#     docs = db.collection("user_location").stream()
#     result = []
#     for doc in docs:
#         data = doc.to_dict()
#         # data["id"] = doc.id  # Exclude if you don't want the Firestore doc ID
#         result.append(data)
#     return result

def get_all_user_locations_details():
    db = firestore.client()
    docs = db.collection("user_location").stream()
    result = []

    for doc in docs:
        data = doc.to_dict()
        
        # Convert Firestore timestamp to Python datetime object for proper sorting
        if "updated_at" in data and hasattr(data["updated_at"], "isoformat"):
            data["updated_at"] = data["updated_at"].isoformat()
        
        result.append(data)

    # Sort result by 'updated_at' in descending order (latest first)
    result.sort(key=lambda x: x.get("updated_at", ""), reverse=True)

    return result

