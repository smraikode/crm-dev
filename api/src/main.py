from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth import router as auth_router
from routes.leads import router as leads_router
from routes.leave_management import router as leave_router
from routes.location_router import router as location_router
from routes.org_tree import router as org_router
from routes.properties import router as properties_router
from routes.role_management import router as role_router
from routes.task import router as task_router

app = FastAPI(title="CRM DEV API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth")
app.include_router(location_router, prefix="/api")
app.include_router(role_router, prefix="/api")
app.include_router(leads_router, prefix="/api")
app.include_router(task_router, prefix="/api/tasks")
app.include_router(org_router, prefix="/api")
app.include_router(properties_router, prefix="/api")
app.include_router(leave_router, prefix="/api")


@app.get("/")
def read_root():
    return {"message": "Welcome from CRM DEV Backend!"}


if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
