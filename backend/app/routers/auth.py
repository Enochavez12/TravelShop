from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.repositories.user_repository import UserRepository
from app.services.auth_service import AuthService
from pydantic import BaseModel, EmailStr
from datetime import date

router = APIRouter(prefix="/auth", tags=["Autenticación"])

class UserRegister(BaseModel):
    full_name: str
    phone: str
    email: EmailStr
    password: str
    birth_date: date

@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):
    repo = UserRepository(db)
    service = AuthService(repo)
    try:
        return service.register_user(user.dict())
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))