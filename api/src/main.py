from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from routes.attendance_router import router as attendance_router
from routes.auth_router import router as auth_router
from routes.lead_router import router as leads_router
from routes.leave_router import router as leave_router
from routes.office_router import router as office_router
from routes.org_router import router as org_router
from routes.property_router import router as properties_router
from routes.role_router import router as role_router
from routes.search_router import router as search_router
from routes.task_router import router as task_router
from routes.msg_router import router as msg_router
from utils.auth_utils import require_roles

app = FastAPI(title="CRM DEV API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api")
app.include_router(
    attendance_router,
    prefix="/api",
    dependencies=[Depends(require_roles("admin", "manager", "lead", "employee"))],
)
app.include_router(
    role_router,
    prefix="/api",
    dependencies=[Depends(require_roles("admin", "manager", "lead"))],
)
app.include_router(
    leads_router,
    prefix="/api",
    dependencies=[Depends(require_roles("admin", "manager", "lead", "employee"))],
)
app.include_router(
    task_router,
    prefix="/api",
    dependencies=[Depends(require_roles("admin", "manager", "lead", "employee"))],
)
app.include_router(
    org_router,
    prefix="/api",
    dependencies=[Depends(require_roles("admin", "manager", "lead", "employee"))],
)
app.include_router(
    properties_router,
    prefix="/api",
    dependencies=[Depends(require_roles("admin", "manager", "lead", "employee"))],
)
app.include_router(
    leave_router,
    prefix="/api",
    dependencies=[Depends(require_roles("admin", "manager", "lead", "employee"))],
)
app.include_router(
    office_router,
    prefix="/api",
    dependencies=[Depends(require_roles("admin", "manager"))],
)
app.include_router(
    search_router,
    prefix="/api",
    dependencies=[Depends(require_roles("admin", "manager", "lead", "employee"))],
)
app.include_router(
    msg_router,
    prefix="/api",
    dependencies=[Depends(require_roles("admin", "manager", "lead", "employee"))],
)


@app.get("/")
def read_root():
    return {"message": "Welcome from CRM DEV Backend!"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
