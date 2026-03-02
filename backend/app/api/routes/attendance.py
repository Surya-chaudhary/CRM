from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date, datetime
from app.db.database import get_db
from app.services import attendance_service
from app.schemas.attendance import AttendanceResponse, AttendanceCreate, AttendanceUpdate, AttendanceStats

router = APIRouter(prefix="/attendance", tags=["attendance"])

@router.get("/", response_model=List[AttendanceResponse])
def read_attendance(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db)
):
    """Get all attendance records"""
    attendance = attendance_service.get_all_attendance(db, skip=skip, limit=limit)
    return attendance

@router.get("/date/{attendance_date}", response_model=List[AttendanceResponse])
def read_attendance_by_date(
    attendance_date: date,
    db: Session = Depends(get_db)
):
    """Get attendance by date"""
    attendance = attendance_service.get_attendance_by_date(db, attendance_date)
    return attendance

@router.get("/date/{attendance_date}/stats", response_model=AttendanceStats)
def read_attendance_stats(
    attendance_date: date,
    db: Session = Depends(get_db)
):
    """Get attendance statistics for a specific date"""
    return attendance_service.get_attendance_stats(db, attendance_date)

@router.get("/employee/{employee_id}", response_model=List[AttendanceResponse])
def read_employee_attendance(
    employee_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(30, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Get attendance for specific employee"""
    attendance = attendance_service.get_employee_attendance(db, employee_id, skip, limit)
    return attendance

@router.post("/", response_model=AttendanceResponse, status_code=201)
def create_attendance(attendance: AttendanceCreate, db: Session = Depends(get_db)):
    """Create attendance record"""
    return attendance_service.create_attendance(db, attendance)

@router.put("/{attendance_id}", response_model=AttendanceResponse)
def update_attendance(
    attendance_id: int,
    attendance_update: AttendanceUpdate,
    db: Session = Depends(get_db)
):
    """Update attendance record"""
    return attendance_service.update_attendance(db, attendance_id, attendance_update)

@router.delete("/{attendance_id}")
def delete_attendance(attendance_id: int, db: Session = Depends(get_db)):
    """Delete attendance record"""
    return attendance_service.delete_attendance(db, attendance_id)