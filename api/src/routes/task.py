import logging

from fastapi import APIRouter, HTTPException, Query

from models.task import Task
from services.task_service import create_task, get_tasks_by_email, get_tasks_of_subordinates, update_task_status

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/createTask")
async def create_task_route(task: Task):
    try:
        task_id = create_task(task)
        return {"message": "Task created", "task_id": task_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/my")
async def get_my_tasks(email: str = Query(...)):
    try:
        tasks = get_tasks_by_email(email)
        return tasks
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/updateStatus")
async def update_task_status_route(task_id: str = Query(...), new_status: str = Query(...)):
    try:
        updated = update_task_status(task_id, new_status)
        if not updated:
            raise HTTPException(status_code=404, detail="Task not found")
        return {"message": "Status updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/team")
async def get_team_tasks(user_email: str = Query(...)):
    try:
        tasks = get_tasks_of_subordinates(user_email)
        return tasks
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
