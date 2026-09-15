"""Offers router"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import Offer, OfferStatus
from app.schemas import OfferCreate, OfferRead, OfferUpdate
from typing import List

router = APIRouter(prefix="/offers", tags=["offers"])

@router.get("/", response_model=List[OfferRead])
async def list_offers(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    status: str = Query("active"),
    category: str = Query(None),
    db: Session = Depends(get_db)
):
    """List all offers with optional filtering"""
    query = db.query(Offer).filter(Offer.status == status)
    
    if category:
        query = query.filter(Offer.category == category)
    
    return query.offset(skip).limit(limit).all()

@router.get("/{offer_id}", response_model=OfferRead)
async def get_offer(
    offer_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific offer"""
    offer = db.query(Offer).filter(Offer.id == offer_id).first()
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    return offer

@router.post("/", response_model=OfferRead)
async def create_offer(
    offer: OfferCreate,
    user_id: int = 1,  # TODO: Get from current user
    db: Session = Depends(get_db)
):
    """Create a new offer"""
    db_offer = Offer(
        **offer.dict(),
        user_id=user_id,
        status=OfferStatus.ACTIVE
    )
    db.add(db_offer)
    db.commit()
    db.refresh(db_offer)
    return db_offer

@router.put("/{offer_id}", response_model=OfferRead)
async def update_offer(
    offer_id: int,
    offer_update: OfferUpdate,
    db: Session = Depends(get_db)
):
    """Update an offer"""
    db_offer = db.query(Offer).filter(Offer.id == offer_id).first()
    if not db_offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    
    update_data = offer_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_offer, field, value)
    
    db.commit()
    db.refresh(db_offer)
    return db_offer

@router.delete("/{offer_id}")
async def delete_offer(
    offer_id: int,
    db: Session = Depends(get_db)
):
    """Delete an offer"""
    db_offer = db.query(Offer).filter(Offer.id == offer_id).first()
    if not db_offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    
    db.delete(db_offer)
    db.commit()
    return {"message": "Offer deleted successfully"}
