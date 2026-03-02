from sqlalchemy.orm import Session
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeUpdate
from fastapi import HTTPException

def get_employee(db: Session, employee_id: int):
    return db.query(Employee).filter(Employee.id == employee_id).first()

def get_employees(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Employee).offset(skip).limit(limit).all()

def create_employee(db: Session, employee: EmployeeCreate):
    # Check if email exists
    db_employee = db.query(Employee).filter(Employee.email == employee.email).first()
    if db_employee:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Check if phone exists
    db_employee = db.query(Employee).filter(Employee.phone == employee.phone).first()
    if db_employee:
        raise HTTPException(status_code=400, detail="Phone number already registered")
    
    db_employee = Employee(**employee.model_dump())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

def update_employee(db: Session, employee_id: int, employee_update: EmployeeUpdate):
    db_employee = get_employee(db, employee_id)
    if not db_employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Check email uniqueness if changed
    if employee_update.email and employee_update.email != db_employee.email:
        existing = db.query(Employee).filter(Employee.email == employee_update.email).first()
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")
    
    # Check phone uniqueness if changed
    if employee_update.phone and employee_update.phone != db_employee.phone:
        existing = db.query(Employee).filter(Employee.phone == employee_update.phone).first()
        if existing:
            raise HTTPException(status_code=400, detail="Phone number already registered")
    
    update_data = employee_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_employee, field, value)
    
    db.commit()
    db.refresh(db_employee)
    return db_employee

def delete_employee(db: Session, employee_id: int):
    db_employee = get_employee(db, employee_id)
    if not db_employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    db.delete(db_employee)
    db.commit()
    return {"message": "Employee deleted successfully"}