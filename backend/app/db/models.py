"""User models"""
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Enum as SQLEnum
from sqlalchemy.sql import func
from enum import Enum
from app.db.session import Base
from datetime import datetime

class UserRole(str, Enum):
    ADMIN = "admin"
    PRODUCER = "producer"
    BUYER = "buyer"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    full_name = Column(String)
    hashed_password = Column(String)
    phone = Column(String, nullable=True)
    location = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)
    bio = Column(String, nullable=True)
    role = Column(SQLEnum(UserRole), default=UserRole.BUYER, index=True)
    is_active = Column(Boolean, default=True, index=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class OfferStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    SOLD = "sold"
    ARCHIVED = "archived"

class Offer(Base):
    __tablename__ = "offers"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    title = Column(String, index=True)
    description = Column(String)
    category = Column(String, index=True)
    quantity = Column(Integer)
    unit = Column(String)  # kg, ton, etc
    price = Column(Integer)  # in XOF cents
    location = Column(String, index=True)
    latitude = Column(String, nullable=True)
    longitude = Column(String, nullable=True)
    images = Column(String, nullable=True)  # JSON array
    status = Column(SQLEnum(OfferStatus), default=OfferStatus.ACTIVE, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class RequestStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    FULFILLED = "fulfilled"
    ARCHIVED = "archived"

class Request(Base):
    __tablename__ = "requests"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    title = Column(String, index=True)
    description = Column(String)
    category = Column(String, index=True)
    quantity = Column(Integer)
    unit = Column(String)
    budget = Column(Integer)  # in XOF cents
    location = Column(String, index=True)
    latitude = Column(String, nullable=True)
    longitude = Column(String, nullable=True)
    status = Column(SQLEnum(RequestStatus), default=RequestStatus.ACTIVE, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
