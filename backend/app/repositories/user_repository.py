from sqlalchemy.orm import Session
from app.models.user import User

class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, user_data: dict):
        db_user = User(
            full_name=user_data['full_name'],
            phone=user_data['phone'],
            email=user_data['email'],
            hashed_password=user_data['hashed_password'],
            birth_date=user_data['birth_date']
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user