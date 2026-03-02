from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional

class AttendanceBase(BaseModel):
    employee_id: int
    date: date
    check_in: Optional[str] = None
    check_out: Optional[str] = None
    status: str = "Present"

    class Config:
        json_schema_extra = {
            "example": {
                "employee_id": 1,
                "date": "2024-03-03",
                "check_in": "09:00",
                "check_out": "18:00",
                "status": "Present"
            }
        }

class AttendanceCreate(AttendanceBase):
    pass

class AttendanceUpdate(BaseModel):
    check_in: Optional[str] = None
    check_out: Optional[str] = None
    status: Optional[str] = None

class AttendanceResponse(AttendanceBase):
    id: int
    employee_name: Optional[str] = None
    
    class Config:
        from_attributes = True

class AttendanceStats(BaseModel):
    total: int
    present: int
    absent: int
    leave: int
    date: date