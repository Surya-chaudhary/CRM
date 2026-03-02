from sqlalchemy import Column, Integer, String, Date, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.db.database import Base
from datetime import date

class Attendance(Base):
    __tablename__ = "attendances"
    
    __table_args__ = (
        UniqueConstraint('employee_id', 'date', name='unique_attendance_per_day'),
    )

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
    date = Column(Date, default=date.today, nullable=False)
    check_in = Column(String(10), nullable=True)
    check_out = Column(String(10), nullable=True)
    status = Column(String(20), default="Present")
    
    # Relationships - fixed
    employee = relationship("Employee", back_populates="attendances")