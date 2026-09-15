"""Pydantic schemas"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    PRODUCER = "producer"
    BUYER = "buyer"

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: str

class UserCreate(UserBase):
    password: str
    role: UserRole = UserRole.BUYER

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None

class UserRead(UserBase):
    id: int
    role: UserRole
    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Offer Schemas
class OfferBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    description: str = Field(..., min_length=10)
    category: str
    quantity: int = Field(..., gt=0)
    unit: str
    price: int = Field(..., ge=0)
    location: str
    latitude: Optional[str] = None
    longitude: Optional[str] = None

class OfferCreate(OfferBase):
    pass

class OfferUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    quantity: Optional[int] = None
    price: Optional[int] = None
    location: Optional[str] = None

class OfferRead(OfferBase):
    id: int
    user_id: int
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Request Schemas
class RequestBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    description: str = Field(..., min_length=10)
    category: str
    quantity: int = Field(..., gt=0)
    unit: str
    budget: int = Field(..., ge=0)
    location: str
    latitude: Optional[str] = None
    longitude: Optional[str] = None

class RequestCreate(RequestBase):
    pass

class RequestRead(RequestBase):
    id: int
    user_id: int
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Auth Schemas
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserRead
