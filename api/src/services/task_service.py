import logging
from datetime import datetime
from typing import List

from models.task import Task
from utils.db_client import get_db

logger = logging.getLogger(__name__)

db = get_db()


def create_task(task: Task) -> str:
    task_data = {
        "title": task.title,
        "description": task.description,
        "assigned_to": task.assigned_to,
        "lead_email": task.lead_email,
        "priority": task.priority,
        "due_date": task.due_date.isoformat(),
        "status": "Pending",
        "created_at": datetime.now().isoformat(),
    }
    doc_ref = db.collection("tasks").document()
    doc_ref.set(task_data)
    return doc_ref.id


def get_tasks_by_email(email: str) -> List[dict]:
    query = db.collection("tasks").where("assigned_to", "==", email).stream()
    result = []

    for task_doc in query:
        task = task_doc.to_dict()
        task["id"] = task_doc.id
        if "due_date" in task:
            task["dueDate"] = task.pop("due_date").split("T")[0]

        lead_email = task.get("lead_email")
        if lead_email:
            lead_doc = next(db.collection("leads").where("email", "==", lead_email).limit(1).stream(), None)
            if lead_doc:
                lead_data = lead_doc.to_dict()
                task.update({
                    "leadName": lead_data.get("firstName", "-"),
                    "leadEmail": lead_data.get("email", "-"),
                    "leadPhone": lead_data.get("phone", "-"),
                    "leadProject": lead_data.get("project", "-")
                })

        result.append(task)
    return result


def update_task_status(task_id: str, new_status: str) -> bool:
    task_ref = db.collection("tasks").document(task_id)
    if not task_ref.get().exists:
        return False
    task_ref.update({"status": new_status})
    return True


def get_tasks_of_subordinates(manager_email: str) -> List[dict]:
    manager_doc = db.collection("users").document(manager_email).get()
    if not manager_doc.exists:
        return []

    subordinates = manager_doc.to_dict().get("subordinates", [])
    emails = [s.split(" - ")[-1].strip() for s in subordinates if " - " in s]

    return [task for email in emails for task in get_tasks_by_email(email)]
