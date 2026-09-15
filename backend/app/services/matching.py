"""Advanced matching engine"""
import math
from sqlalchemy.orm import Session
from app.db.models import Offer, Request
from typing import List, Dict

class MatchingEngine:
    """Intelligent matching algorithm"""
    
    @staticmethod
    def calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """Calculate distance between two coordinates (Haversine formula)"""
        if not all([lat1, lon1, lat2, lon2]):
            return float('inf')
        
        R = 6371  # Earth radius in km
        
        lat1_rad = math.radians(float(lat1))
        lat2_rad = math.radians(float(lat2))
        delta_lat = math.radians(float(lat2) - float(lat1))
        delta_lon = math.radians(float(lon2) - float(lon1))
        
        a = math.sin(delta_lat / 2) ** 2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lon / 2) ** 2
        c = 2 * math.asin(math.sqrt(a))
        
        return R * c
    
    @staticmethod
    def calculate_price_match(offer_price: int, request_budget: int) -> float:
        """Calculate price matching score (0-100)"""
        if request_budget == 0:
            return 0
        
        ratio = offer_price / request_budget
        
        if 0.8 <= ratio <= 1.2:
            # Good price match
            return 100 - (abs(ratio - 1.0) * 100)
        elif 0.5 <= ratio < 0.8:
            # Offer is cheaper
            return 70 + (0.3 * (1 - (0.8 - ratio) / 0.3))
        elif 1.2 < ratio <= 1.5:
            # Offer is more expensive but acceptable
            return 70 + (0.3 * (1 - (ratio - 1.2) / 0.3))
        else:
            return max(0, 100 - abs(ratio - 1.0) * 50)
    
    @staticmethod
    def calculate_quantity_match(offer_qty: int, request_qty: int) -> float:
        """Calculate quantity matching score (0-100)"""
        if request_qty == 0:
            return 0
        
        ratio = offer_qty / request_qty
        
        if ratio == 1.0:
            return 100
        elif 0.8 <= ratio <= 1.5:
            # Good quantity match
            return 100 - (abs(ratio - 1.0) * 50)
        elif ratio >= 0.5 and ratio < 0.8:
            # Offer has less quantity
            return 60 + (40 * (ratio / 0.8))
        elif ratio > 1.5 and ratio <= 2.0:
            # Offer has more quantity
            return 70 + (30 * (1 - (ratio - 1.5) / 0.5))
        else:
            return max(0, 50 - abs(ratio - 1.0) * 10)
    
    @staticmethod
    def calculate_category_match(offer_category: str, request_category: str) -> float:
        """Calculate category matching score (0-100)"""
        if offer_category.lower() == request_category.lower():
            return 100
        return 0  # Different categories = no match
    
    @staticmethod
    def calculate_location_match(distance_km: float) -> float:
        """Calculate location matching score (0-100)"""
        if distance_km == float('inf'):
            return 50  # No location data, neutral score
        
        if distance_km <= 10:
            return 100
        elif distance_km <= 50:
            return 100 - ((distance_km - 10) / 40 * 40)
        elif distance_km <= 200:
            return 60 - ((distance_km - 50) / 150 * 40)
        else:
            return max(20, 20 - (distance_km - 200) / 100 * 5)
    
    @staticmethod
    def calculate_overall_score(
        price_score: float,
        quantity_score: float,
        category_score: float,
        location_score: float,
        weights: Dict[str, float] = None
    ) -> float:
        """Calculate overall matching score with weights"""
        if weights is None:
            weights = {
                "price": 0.3,
                "quantity": 0.25,
                "category": 0.35,
                "location": 0.1,
            }
        
        total_weight = sum(weights.values())
        overall = (
            (price_score * weights["price"]) +
            (quantity_score * weights["quantity"]) +
            (category_score * weights["category"]) +
            (location_score * weights["location"])
        ) / total_weight
        
        return min(100, max(0, overall))
    
    @staticmethod
    def match_offer_to_request(
        offer: Offer,
        request: Request,
        weights: Dict[str, float] = None
    ) -> Dict:
        """Calculate matching between an offer and a request"""
        # Calculate distance
        distance = MatchingEngine.calculate_distance(
            offer.latitude,
            offer.longitude,
            request.latitude,
            request.longitude
        )
        
        # Calculate individual scores
        price_score = MatchingEngine.calculate_price_match(offer.price, request.budget)
        quantity_score = MatchingEngine.calculate_quantity_match(offer.quantity, request.quantity)
        category_score = MatchingEngine.calculate_category_match(offer.category, request.category)
        location_score = MatchingEngine.calculate_location_match(distance)
        
        # Calculate overall score
        overall_score = MatchingEngine.calculate_overall_score(
            price_score,
            quantity_score,
            category_score,
            location_score,
            weights
        )
        
        return {
            "offer_id": offer.id,
            "request_id": request.id,
            "overall_score": round(overall_score, 2),
            "price_score": round(price_score, 2),
            "quantity_score": round(quantity_score, 2),
            "category_score": round(category_score, 2),
            "location_score": round(location_score, 2),
            "distance_km": round(distance, 2) if distance != float('inf') else None,
            "explanation": MatchingEngine.generate_explanation(
                price_score,
                quantity_score,
                category_score,
                location_score,
                overall_score,
                distance
            )
        }
    
    @staticmethod
    def generate_explanation(
        price_score: float,
        quantity_score: float,
        category_score: float,
        location_score: float,
        overall_score: float,
        distance: float
    ) -> str:
        """Generate human-readable explanation for the match"""
        explanations = []
        
        if category_score == 0:
            return "Les catégories ne correspondent pas."
        
        if price_score >= 90:
            explanations.append("Prix très compétitif")
        elif price_score >= 70:
            explanations.append("Prix acceptable")
        else:
            explanations.append("Prix moins avantageux")
        
        if quantity_score >= 90:
            explanations.append("Quantité exacte")
        elif quantity_score >= 70:
            explanations.append("Quantité appropriée")
        else:
            explanations.append("Quantité différente")
        
        if distance != float('inf'):
            if distance <= 10:
                explanations.append(f"Très proche ({distance:.1f} km)")
            elif distance <= 50:
                explanations.append(f"À proximité ({distance:.1f} km)")
            else:
                explanations.append(f"Distance modérée ({distance:.1f} km)")
        
        return " • ".join(explanations)
    
    @staticmethod
    def find_best_matches(
        db: Session,
        offer_id: int = None,
        request_id: int = None,
        limit: int = 10,
        min_score: float = 50.0
    ) -> List[Dict]:
        """Find best matches for an offer or request"""
        matches = []
        
        if offer_id:
            offer = db.query(Offer).filter(Offer.id == offer_id).first()
            if offer:
                requests = db.query(Request).filter(Request.status == "active").all()
                for req in requests:
                    match = MatchingEngine.match_offer_to_request(offer, req)
                    if match["overall_score"] >= min_score:
                        matches.append(match)
        
        elif request_id:
            request = db.query(Request).filter(Request.id == request_id).first()
            if request:
                offers = db.query(Offer).filter(Offer.status == "active").all()
                for offer in offers:
                    match = MatchingEngine.match_offer_to_request(offer, request)
                    if match["overall_score"] >= min_score:
                        matches.append(match)
        
        # Sort by overall_score descending
        matches.sort(key=lambda x: x["overall_score"], reverse=True)
        
        return matches[:limit]
