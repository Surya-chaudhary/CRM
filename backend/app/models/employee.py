from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from app.db.database import Base
from datetime import datetime

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(20), unique=True, nullable=False, index=True)  # Added phone field
    position = Column(String(100), nullable=False)
    department = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    status = Column(String(20), default="Active")
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    attendances = relationship("Attendance", back_populates="employee", cascade="all, delete-orphan")