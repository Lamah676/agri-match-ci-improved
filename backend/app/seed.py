"""Seed demo data"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db.models import Base, User, UserRole, Offer, OfferStatus, Request, RequestStatus
from app.services.auth import get_password_hash
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://agri_match:agri_match@localhost:5432/agri_match_ci"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

def seed_database():
    """Seed database with demo data"""
    print("🌱 Seeding database...")
    
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Check if data already exists
    if db.query(User).first():
        print("Database already seeded!")
        return
    
    # Create users
    admin = User(
        email="admin@agri-match.ci",
        username="admin",
        full_name="Administrator",
        hashed_password=get_password_hash("admin123"),
        role=UserRole.ADMIN,
        is_verified=True,
    )
    
    producer1 = User(
        email="kouassi@ferme.ci",
        username="kouassi",
        full_name="Kouassi Producteur",
        hashed_password=get_password_hash("demo1234"),
        role=UserRole.PRODUCER,
        location="Abidjan",
        is_verified=True,
    )
    
    producer2 = User(
        email="aminata@champs.ci",
        username="aminata",
        full_name="Aminata Productrice",
        hashed_password=get_password_hash("demo1234"),
        role=UserRole.PRODUCER,
        location="Yamoussoukro",
        is_verified=True,
    )
    
    buyer1 = User(
        email="marche@abidjan.ci",
        username="marche_abidjan",
        full_name="Marché Abidjan",
        hashed_password=get_password_hash("demo1234"),
        role=UserRole.BUYER,
        location="Abidjan",
        is_verified=True,
    )
    
    buyer2 = User(
        email="restaurant@yamoussoukro.ci",
        username="restaurant_yam",
        full_name="Restaurant Yamoussoukro",
        hashed_password=get_password_hash("demo1234"),
        role=UserRole.BUYER,
        location="Yamoussoukro",
        is_verified=True,
    )
    
    db.add_all([admin, producer1, producer2, buyer1, buyer2])
    db.commit()
    
    # Create offers
    offer1 = Offer(
        user_id=producer1.id,
        title="Riz blanc de qualité supérieure",
        description="Riz blanc frais, récolte 2024, qualité premium",
        category="riz",
        quantity=500,
        unit="kg",
        price=150000,  # 1500 XOF per kg
        location="Abidjan",
        latitude="5.5471",
        longitude="-4.0179",
        status=OfferStatus.ACTIVE,
    )
    
    offer2 = Offer(
        user_id=producer2.id,
        title="Maïs jaune frais",
        description="Maïs jaune fermier, très savoureux",
        category="maïs",
        quantity=1000,
        unit="kg",
        price=100000,  # 1000 XOF per kg
        location="Yamoussoukro",
        latitude="6.8277",
        longitude="-5.2893",
        status=OfferStatus.ACTIVE,
    )
    
    db.add_all([offer1, offer2])
    db.commit()
    
    # Create requests
    request1 = OfferRequest(
        user_id=buyer1.id,
        title="Besoin de 300 kg de riz blanc",
        description="Cherche riz blanc de bonne qualité pour le marché",
        category="riz",
        quantity=300,
        unit="kg",
        budget=150000,  # 1500 XOF per kg
        location="Abidjan",
        latitude="5.5471",
        longitude="-4.0179",
        status=RequestStatus.ACTIVE,
    )
    
    request2 = OfferRequest(
        user_id=buyer2.id,
        title="Demande de maïs pour restaurant",
        description="Besoin régulier de maïs frais pour restaurant",
        category="maïs",
        quantity=100,
        unit="kg",
        budget=120000,  # 1200 XOF per kg
        location="Yamoussoukro",
        latitude="6.8277",
        longitude="-5.2893",
        status=RequestStatus.ACTIVE,
    )
    
    db.add_all([request1, request2])
    db.commit()
    
    print("✅ Database seeded successfully!")
    print(f"  - {db.query(User).count()} users created")
    print(f"  - {db.query(Offer).count()} offers created")
    print(f"  - {db.query(OfferRequest).count()} requests created")
    
    db.close()

if __name__ == "__main__":
    seed_database()
