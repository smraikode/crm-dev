from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import router as auth_router
from routes.map import router as map_router
from routes.assignRole import router as assign_role_router
from routes.leads import router as leads_router
from routes.task import router as task_router
from routes.org_tree import router as org_router
from routes.properties import router as properties_router
from routes.applyleave import router as apply_leave_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth")
app.include_router(map_router, prefix="/api")
app.include_router(assign_role_router, prefix="/api")
app.include_router(leads_router, prefix="/api")
app.include_router(task_router, prefix="/api/tasks")
app.include_router(org_router, prefix="/api")
app.include_router(properties_router, prefix="/api")
app.include_router(apply_leave_router, prefix="/api")



@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI Firestore Auth!"}
