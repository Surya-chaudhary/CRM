from sqlalchemy.orm import Session
from sqlalchemy import and_
from app.models.attendance import Attendance
from app.models.employee import Employee
from app.schemas.attendance import AttendanceCreate, AttendanceUpdate, AttendanceStats
from fastapi import HTTPException
from datetime import date

def get_all_attendance(db: Session, skip: int = 0, limit: int = 100):
    attendance = db.query(Attendance).offset(skip).limit(limit).all()
    # Add employee names
    for att in attendance:
        att.employee_name = att.employee.name if att.employee else None
    return attendance

def get_attendance_by_date(db: Session, attendance_date: date):
    attendance = db.query(Attendance).filter(Attendance.date == attendance_date).all()
    for att in attendance:
        att.employee_name = att.employee.name if att.employee else None
    return attendance

def get_attendance_stats(db: Session, attendance_date: date):
    attendance = db.query(Attendance).filter(Attendance.date == attendance_date).all()
    total_employees = db.query(Employee).count()
    
    present = sum(1 for att in attendance if att.status == "Present")
    absent = sum(1 for att in attendance if att.status == "Absent")
    leave = sum(1 for att in attendance if att.status == "Leave")
    
    return AttendanceStats(
        total=total_employees,
        present=present,
        absent=absent,
        leave=leave,
        date=attendance_date
    )

def get_employee_attendance(db: Session, employee_id: int, skip: int = 0, limit: int = 100):
    attendance = db.query(Attendance).filter(
        Attendance.employee_id == employee_id
    ).offset(skip).limit(limit).all()
    
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    for att in attendance:
        att.employee_name = employee.name
    return attendance

def create_attendance(db: Session, attendance: AttendanceCreate):
    # Check if employee exists
    employee = db.query(Employee).filter(Employee.id == attendance.employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Check if attendance already exists for this date
    existing = db.query(Attendance).filter(
        and_(
            Attendance.employee_id == attendance.employee_id,
            Attendance.date == attendance.date
        )
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Attendance already recorded for this date")
    
    db_attendance = Attendance(**attendance.model_dump())
    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)
    db_attendance.employee_name = employee.name
    return db_attendance

def update_attendance(db: Session, attendance_id: int, attendance_update: AttendanceUpdate):
    db_attendance = db.query(Attendance).filter(Attendance.id == attendance_id).first()
    if not db_attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")
    
    update_data = attendance_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_attendance, field, value)
    
    db.commit()
    db.refresh(db_attendance)
    db_attendance.employee_name = db_attendance.employee.name if db_attendance.employee else None
    return db_attendance

def delete_attendance(db: Session, attendance_id: int):
    db_attendance = db.query(Attendance).filter(Attendance.id == attendance_id).first()
    if not db_attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")
    
    db.delete(db_attendance)
    db.commit()
    return {"message": "Attendance deleted successfully"}