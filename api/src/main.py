from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import router as auth_router
from routes.map import router as map_router
from routes.assignRole import router as assign_role_router

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


@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI Firestore Auth!"}
