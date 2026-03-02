from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class EmployeeBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10, max_length=20, pattern="^[0-9+\-\s()]+$")  # Added phone
    position: str = Field(..., min_length=2, max_length=100)
    department: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    status: str = Field("Active", pattern="^(Active|On Leave|Inactive)$")

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=100)
    phone: Optional[str] = Field(None, min_length=10, max_length=20, pattern="^[0-9+\-\s()]+$")
    position: Optional[str] = Field(None, min_length=2, max_length=100)
    department: Optional[str] = Field(None, min_length=2, max_length=100)
    email: Optional[EmailStr] = None
    status: Optional[str] = Field(None, pattern="^(Active|On Leave|Inactive)$")

class EmployeeResponse(EmployeeBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True