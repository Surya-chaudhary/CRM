from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import List, Optional

class Settings(BaseSettings):
    # Database - Read from environment variables
    DATABASE_URL: str
    
    # Frontend - Read from environment variables
    FRONTEND_URL: str
    
    # Environment - Read from environment variables with default
    ENVIRONMENT: str = "development"
    
    # Optional settings with defaults
    BACKEND_PORT: int = 8000
    DEBUG: bool = False
    
    @property
    def CORS_ORIGINS(self) -> List[str]:
        # Always include the frontend URL from env
        origins = [self.FRONTEND_URL]
        
        # Add localhost for development
        if self.ENVIRONMENT == "development":
            origins.extend([
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://localhost:3000",
            ])
        
        return origins
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False
        extra = "ignore"

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()