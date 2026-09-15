"""AI Agent Service for natural language processing"""
import re
from typing import Dict, List, Optional

class AIAgent:
    """Simple AI agent for extracting information from natural language"""
    
    CATEGORIES = [
        "riz", "maïs", "blé", "cacao", "café", "banane",
        "plantain", "tomate", "oignon", "carotte", "légumes",
        "fruit", "viande", "poisson", "lait", "œufs",
    ]
    
    UNITS = [
        "kg", "kilogramme", "tonne", "t", "sac",
        "litre", "l", "crate", "boîte", "panier",
        "pièce", "pc", "dozen", "douzaine",
    ]
    
    @staticmethod
    def extract_quantity(text: str) -> Optional[int]:
        """Extract quantity from text"""
        # Look for patterns like "100 kg", "5 tonnes", etc
        pattern = r'(\d+(?:[.,]\d+)?)\s*(?:kg|tonne|t|litre|l|sac|crate|pièce|pc)'
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            qty_str = match.group(1).replace(',', '.')
            return int(float(qty_str))
        return None
    
    @staticmethod
    def extract_price(text: str) -> Optional[int]:
        """Extract price from text"""
        # Look for patterns like "100 xof", "50000 francs", etc
        pattern = r'(\d+(?:[.,]\d+)?)\s*(?:xof|francs?|fcfa|frs?)'
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            price_str = match.group(1).replace(',', '.')
            return int(float(price_str) * 100)  # Convert to cents
        return None
    
    @staticmethod
    def extract_category(text: str) -> Optional[str]:
        """Extract product category from text"""
        text_lower = text.lower()
        for category in AIAgent.CATEGORIES:
            if category in text_lower:
                return category
        return None
    
    @staticmethod
    def extract_unit(text: str) -> Optional[str]:
        """Extract unit from text"""
        text_lower = text.lower()
        for unit in AIAgent.UNITS:
            if unit in text_lower:
                # Normalize unit
                if unit in ['kg', 'kilogramme']:
                    return 'kg'
                elif unit in ['t', 'tonne']:
                    return 'tonne'
                elif unit in ['l', 'litre']:
                    return 'litre'
                elif unit in ['sac']:
                    return 'sac'
                elif unit in ['pièce', 'pc']:
                    return 'pièce'
                else:
                    return unit
        return 'kg'  # Default unit
    
    @staticmethod
    def extract_location(text: str) -> Optional[str]:
        """Extract location from text"""
        # Common cities in Côte d'Ivoire
        cities = [
            "abidjan", "yamoussoukro", "bouaké", "daloa", "korhogo",
            "san-pédro", "gagnoa", "man", "dimbokro", "oumé",
        ]
        
        text_lower = text.lower()
        for city in cities:
            if city in text_lower:
                return city.capitalize()
        return None
    
    @staticmethod
    def parse_offer_description(text: str) -> Dict:
        """Parse an offer description and extract structured data"""
        return {
            "quantity": AIAgent.extract_quantity(text),
            "unit": AIAgent.extract_unit(text),
            "price": AIAgent.extract_price(text),
            "category": AIAgent.extract_category(text),
            "location": AIAgent.extract_location(text),
        }
    
    @staticmethod
    def parse_request_description(text: str) -> Dict:
        """Parse a request description and extract structured data"""
        return {
            "quantity": AIAgent.extract_quantity(text),
            "unit": AIAgent.extract_unit(text),
            "budget": AIAgent.extract_price(text),
            "category": AIAgent.extract_category(text),
            "location": AIAgent.extract_location(text),
        }
    
    @staticmethod
    def generate_recommendation(description: str) -> str:
        """Generate AI recommendation based on description"""
        extracted = AIAgent.parse_offer_description(description)
        
        recommendations = []
        
        if not extracted["category"]:
            recommendations.append("Précisez le type de produit")
        
        if not extracted["quantity"]:
            recommendations.append("Indiquez la quantité disponible")
        
        if not extracted["price"]:
            recommendations.append("Spécifiez le prix")
        
        if not extracted["location"]:
            recommendations.append("Précisez votre localisation")
        
        if recommendations:
            return f"Pour améliorer votre offre: {', '.join(recommendations)}"
        else:
            return "Votre offre est bien structurée! Elle devrait attirer les acheteurs."
