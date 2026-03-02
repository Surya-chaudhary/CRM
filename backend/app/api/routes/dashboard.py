from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
from app.db.database import get_db
from app.models.employee import Employee
from app.models.attendance import Attendance

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    """Get dashboard statistics"""
    today = datetime.utcnow().date()
    
    # Employee stats
    total_employees = db.query(Employee).count()
    
    # Today's attendance
    today_attendance = db.query(Attendance).filter(Attendance.date == today).all()
    present_today = sum(1 for att in today_attendance if att.status == "Present")
    on_leave_today = sum(1 for att in today_attendance if att.status == "Leave")
    absent_today = total_employees - present_today - on_leave_today
    
    # Department distribution
    departments = db.query(
        Employee.department, 
        func.count(Employee.id).label('count')
    ).group_by(Employee.department).all()
    
    dept_distribution = [{"name": dept, "count": count} for dept, count in departments]
    
    # Recent activity
    recent_employees = db.query(Employee).order_by(Employee.created_at.desc()).limit(5).all()
    recent_attendance = db.query(Attendance).order_by(Attendance.date.desc()).limit(5).all()
    
    recent_activity = []
    
    # Add employee activities
    for emp in recent_employees:
        recent_activity.append({
            "time": emp.created_at.strftime("%H:%M %p"),
            "desc": f"New employee added: {emp.name}"
        })
    
    # Add attendance activities
    for att in recent_attendance:
        employee = db.query(Employee).filter(Employee.id == att.employee_id).first()
        if employee:
            recent_activity.append({
                "time": att.date.strftime("%b %d"),
                "desc": f"{employee.name} marked {att.status}"
            })
    
    # Sort by time (most recent first)
    recent_activity.sort(key=lambda x: x["time"], reverse=True)
    
    return {
        "total_employees": total_employees,
        "present_today": present_today,
        "on_leave_today": on_leave_today,
        "absent_today": absent_today,
        "departments": dept_distribution,
        "recent_activity": recent_activity[:10]
    }