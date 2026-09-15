"""Matching router"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import Offer, Request as OfferRequest
from app.services.matching import MatchingEngine
from typing import List

router = APIRouter(prefix="/matching", tags=["matching"])

@router.get("/matches")
async def get_matches(
    offer_id: int = Query(None),
    request_id: int = Query(None),
    limit: int = Query(10, ge=1, le=100),
    min_score: float = Query(50.0, ge=0, le=100),
    db: Session = Depends(get_db)
):
    """Get best matching results for an offer or request"""
    if not offer_id and not request_id:
        raise HTTPException(
            status_code=400,
            detail="Either offer_id or request_id must be provided"
        )
    
    matches = MatchingEngine.find_best_matches(
        db=db,
        offer_id=offer_id,
        request_id=request_id,
        limit=limit,
        min_score=min_score
    )
    
    return {
        "total": len(matches),
        "matches": matches
    }

@router.get("/score/{offer_id}/{request_id}")
async def get_matching_score(
    offer_id: int,
    request_id: int,
    db: Session = Depends(get_db)
):
    """Get matching score between an offer and a request"""
    offer = db.query(Offer).filter(Offer.id == offer_id).first()
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    
    request = db.query(OfferRequest).filter(OfferRequest.id == request_id).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    
    match = MatchingEngine.match_offer_to_request(offer, request)
    return match
