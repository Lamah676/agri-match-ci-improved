# 📚 Documentation API Agri-Match CI

## Base URL
```
https://api.votre-domaine.ci
```

## Authentification

Tous les endpoints protégés requièrent un JWT token:

```http
Authorization: Bearer <token>
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

Réponse:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "producer",
    "is_active": true,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

---

## Endpoints

### 🏠 Health

#### Check API Status
```http
GET /health
```

Réponse:
```json
{
  "status": "ok",
  "service": "agri-match-ci",
  "version": "1.0.0"
}
```

---

### 🛒 Offres

#### Lister les offres
```http
GET /offers?skip=0&limit=100&status=active&category=riz
```

Query Parameters:
- `skip`: Nombre d'éléments à ignorer (pagination)
- `limit`: Nombre d'éléments à retourner (max 1000)
- `status`: Filtre par statut (active, inactive, sold, archived)
- `category`: Filtre par catégorie

Réponse:
```json
[
  {
    "id": 1,
    "user_id": 1,
    "title": "Riz blanc de qualité",
    "description": "Riz frais, récolte 2024",
    "category": "riz",
    "quantity": 500,
    "unit": "kg",
    "price": 150000,
    "location": "Abidjan",
    "latitude": "5.5471",
    "longitude": "-4.0179",
    "status": "active",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

#### Créer une offre
```http
POST /offers
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Riz blanc de qualité",
  "description": "Riz frais, récolte 2024",
  "category": "riz",
  "quantity": 500,
  "unit": "kg",
  "price": 150000,
  "location": "Abidjan",
  "latitude": "5.5471",
  "longitude": "-4.0179"
}
```

#### Obtenir une offre spécifique
```http
GET /offers/{offer_id}
```

#### Mettre à jour une offre
```http
PUT /offers/{offer_id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 600,
  "price": 160000
}
```

#### Supprimer une offre
```http
DELETE /offers/{offer_id}
Authorization: Bearer <token>
```

---

### 📋 Demandes

#### Lister les demandes
```http
GET /requests?skip=0&limit=100&status=active
```

#### Créer une demande
```http
POST /requests
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Besoin de riz blanc",
  "description": "Pour le marché",
  "category": "riz",
  "quantity": 300,
  "unit": "kg",
  "budget": 150000,
  "location": "Abidjan",
  "latitude": "5.5471",
  "longitude": "-4.0179"
}
```

---

### 🎯 Matching

#### Obtenir les meilleurs matches pour une offre
```http
GET /matching/matches?offer_id=1&limit=10&min_score=50
```

Réponse:
```json
{
  "total": 2,
  "matches": [
    {
      "offer_id": 1,
      "request_id": 5,
      "overall_score": 95.5,
      "price_score": 100,
      "quantity_score": 90,
      "category_score": 100,
      "location_score": 85.5,
      "distance_km": 15.2,
      "explanation": "Prix très compétitif • Quantité appropriée • À proximité (15.2 km)"
    }
  ]
}
```

#### Obtenir les meilleurs matches pour une demande
```http
GET /matching/matches?request_id=5&limit=10
```

#### Obtenir le score de matching entre offre et demande
```http
GET /matching/score/{offer_id}/{request_id}
```

---

### 👤 Utilisateurs

#### Obtenir le profil de l'utilisateur courant
```http
GET /users/profile
Authorization: Bearer <token>
```

#### Mettre à jour le profil
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "full_name": "Kouassi Producteur",
  "phone": "+225 07 12 34 56",
  "location": "Abidjan",
  "bio": "Producteur de riz depuis 10 ans"
}
```

#### Obtenir le profil d'un utilisateur
```http
GET /users/{user_id}
```

---

## Codes d'erreur

| Code | Signification |
|------|---------------|
| 200 | Succès |
| 201 | Créé |
| 400 | Mauvaise requête |
| 401 | Non authentifié |
| 403 | Non autorisé |
| 404 | Non trouvé |
| 422 | Entité invalide |
| 500 | Erreur serveur |

---

## Pagination

Les endpoints listant des données supportent la pagination:

```http
GET /offers?skip=0&limit=20
```

- `skip`: Offset (par défaut 0)
- `limit`: Nombre d'éléments (par défaut 100, max 1000)

---

## Filtres

### Par statut
```http
GET /offers?status=active
```

Statuts disponibles:
- `active`: Actif
- `inactive`: Inactif
- `sold`: Vendu
- `archived`: Archivé

### Par catégorie
```http
GET /offers?category=riz
```

Catégories disponibles:
- riz, maïs, blé, cacao, café
- banane, plantain, tomate, oignon, carotte
- légumes, fruit, viande, poisson, lait, œufs

---

## Rate Limiting

Les requêtes sont limitées à:
- 100 requêtes par minute par IP
- 1000 requêtes par heure par utilisateur

---

## Webhooks

### Événements
- `offer.created`: Nouvelle offre créée
- `offer.updated`: Offre modifiée
- `request.created`: Nouvelle demande créée
- `match.found`: Match trouvé
- `user.registered`: Nouvel utilisateur

### Configuration
```bash
POST /webhooks/subscribe
Authorization: Bearer <token>

{
  "url": "https://votre-app.com/webhook",
  "events": ["offer.created", "match.found"]
}
```

---

## Testing

### Avec cURL
```bash
# Health check
curl https://api.votre-domaine.ci/health

# Lister les offres
curl https://api.votre-domaine.ci/offers

# Login
curl -X POST https://api.votre-domaine.ci/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Avec authentification
curl -H "Authorization: Bearer TOKEN" \
  https://api.votre-domaine.ci/users/profile
```

### Avec Postman
1. Importer: `https://api.votre-domaine.ci/openapi.json`
2. Créer environment avec `base_url` et `token`
3. Utiliser les variables: `{{base_url}}/offers`

---

**API Version: 1.0.0** | [Swagger UI](https://api.votre-domaine.ci/docs) | [ReDoc](https://api.votre-domaine.ci/redoc)
