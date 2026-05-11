from sqlalchemy import Column, Integer, String, Date
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100))
    phone = Column(String(20))
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(255))
    birth_date = Column(Date)