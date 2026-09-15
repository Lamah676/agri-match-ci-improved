# 🚀 Guide de Déploiement Complet — Agri-Match CI Amélioré

## Table des matières
1. [Architecture](#architecture)
2. [Déploiement Local](#déploiement-local)
3. [Déploiement Production](#déploiement-production)
4. [Configuration](#configuration)
5. [Monitoring](#monitoring)

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Utilisateurs                         │
└────────────────────────┬────────────────────────────────┘
                         │
        ┌────────────────┴────────────────┐
        ▼                                 ▼
┌──────────────────┐           ┌──────────────────┐
│ Frontend (Next)  │           │  Admin Dashboard │
│ Vercel/Netlify   │           │                  │
└────────┬─────────┘           └────────┬─────────┘
         │ HTTPS                        │ HTTPS
         └────────────┬──────────────────┘
                      ▼
           ┌─────────────────────┐
           │  API Gateway/Caddy  │
           │  Reverse Proxy      │
           └──────────┬──────────┘
                      │
        ┌─────────────┴──────────────┐
        ▼                            ▼
┌──────────────────┐        ┌──────────────────┐
│  FastAPI Backend │        │   Cache Redis    │
│  (Railway/Render)│        │   (Optionnel)    │
└────────┬─────────┘        └──────────────────┘
         │
         ▼
┌──────────────────┐
│  PostgreSQL DB   │
│  (Managed)       │
└──────────────────┘
```

---

## Déploiement Local

### Prérequis
- Docker & Docker Compose
- Git
- Node.js 18+ (optionnel si Docker)
- Python 3.12+ (optionnel si Docker)

### Démarrage rapide

```bash
# 1. Cloner le repository
git clone https://github.com/Lamah676/agri-match-ci-improved.git
cd agri-match-ci-improved

# 2. Lancer les services
make up

# 3. Charger les données de démo
make seed

# 4. Accéder à l'application
# Frontend: http://localhost:3000
# API: http://localhost:8000
# Docs: http://localhost:8000/docs
```

### Comptes de test
| Email | Mot de passe | Rôle |
|-------|--------------|------|
| admin@agri-match.ci | admin123 | Admin |
| kouassi@ferme.ci | demo1234 | Producteur |
| aminata@champs.ci | demo1234 | Producteur |
| marche@abidjan.ci | demo1234 | Acheteur |
| restaurant@yamoussoukro.ci | demo1234 | Acheteur |

### Commandes utiles

```bash
# Afficher les logs
make logs

# Stopper les services
make down

# Reset complet
make fresh

# Tests
make test

# Accès base de données
make db-shell
```

---

## Déploiement Production

### 1️⃣ Base de données PostgreSQL

#### Option A: Managed Service (Recommandé)

**Supabase** (Plus facile pour débuter)
```
1. Aller sur https://supabase.com
2. Créer un nouveau projet
3. Copier la connection string: postgresql://user:pass@host:5432/db
4. Sauvegarder dans .env.production
```

**Ou Railway**
```
1. https://railway.app
2. Créer une base PostgreSQL
3. Copier la connection string
```

#### Option B: VPS avec Docker
```bash
# Sur votre VPS (Ubuntu 22.04)
ssh user@votre-vps.com

# Installer Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Cloner et configurer
git clone https://github.com/Lamah676/agri-match-ci-improved.git
cd agri-match-ci-improved

# Créer .env.production
cp deploy/.env.production.example .env
# Éditer avec vos secrets
```

### 2️⃣ Backend FastAPI

#### Déploiement sur Railway

```bash
# 1. Installer Railway CLI
curl -fsSL https://railway.app/install.sh | sh

# 2. Se connecter
railway login

# 3. Créer un projet
railway init

# 4. Ajouter les variables d'environnement
railway variables set DATABASE_URL="postgresql://..."
railway variables set JWT_SECRET_KEY="your-secret-key-here"
railway variables set FRONTEND_ORIGIN="https://your-domain.vercel.app"

# 5. Déployer
git push origin main  # Railway détecte les push automatiquement
```

#### Déploiement sur Render

```
1. https://render.com
2. New → Web Service
3. Connect GitHub repository
4. Configuration:
   - Root Directory: backend
   - Build Command: pip install -r requirements.txt
   - Start Command: uvicorn app.main:app --host 0.0.0.0
5. Ajouter les environment variables
6. Deploy
```

#### Déploiement sur VPS avec Caddy

```bash
# Installer Caddy
sudo apt install -y caddy

# Créer Caddyfile
sudo nano /etc/caddy/Caddyfile
```

```caddyfile
api.votre-domaine.ci {
    reverse_proxy localhost:8000 {
        header_upstream Host {host}
        header_upstream X-Real-IP {remote_host}
        header_upstream X-Forwarded-For {remote_host}
        header_upstream X-Forwarded-Proto {scheme}
    }
}
```

```bash
# Démarrer Caddy
sudo systemctl restart caddy

# Vérifier status
sudo systemctl status caddy

# Logs
sudo journalctl -u caddy -f
```

### 3️⃣ Frontend Next.js

#### Déploiement sur Vercel (Recommandé)

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Se connecter
vercel login

# 3. Déployer
cd frontend
vercel

# 4. Configuration:
# - Framework: Next.js
# - Root Directory: frontend
# - Env Variables: NEXT_PUBLIC_API_URL=https://api.votre-domaine.ci
```

Ou via GitHub:
```
1. https://vercel.com
2. Import Project
3. Sélectionner GitHub repository
4. Root Directory: frontend
5. Environment Variables:
   - NEXT_PUBLIC_API_URL=https://api.votre-domaine.ci
6. Deploy
```

#### Déploiement sur Netlify

```bash
# 1. Installer Netlify CLI
npm install -g netlify-cli

# 2. Se connecter
netlify login

# 3. Déployer
cd frontend
netlify deploy --prod --build

# Configuration:
# - Build command: npm run build
# - Publish directory: .next (ou out pour export)
# - Env: NEXT_PUBLIC_API_URL
```

### 4️⃣ Configuration d'environnement

```bash
# .env.production
ENVIRONMENT=production
DATABASE_URL=postgresql://user:pass@host:5432/agri_match_ci

# JWT
JWT_SECRET_KEY=your-very-long-secret-key-here-change-this
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# Frontend
FRONTEND_ORIGIN=https://agri-match.vercel.app
FRONTEND_BASE_URL=https://agri-match.vercel.app

# CORS
CORS_ORIGINS=https://agri-match.vercel.app,https://admin.votre-domaine.ci

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@agri-match.ci

# Upload
UPLOAD_DIR=/uploads
STORAGE_BACKEND=s3  # ou local

# S3 (si utilisé)
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_S3_BUCKET=agri-match-uploads
AWS_S3_REGION=eu-west-1

# AI
AI_PROVIDER=anthropic
AI_API_KEY=your-anthropic-key

# Paiements
PAYMENT_PROVIDER_MODE=live  # ou simulation
PAYMENT_WEBHOOK_SECRET=your-long-secret
ORANGE_MONEY_API_KEY=your-orange-key
MTN_MONEY_API_KEY=your-mtn-key
WAVE_API_KEY=your-wave-key

# Logging
LOG_LEVEL=INFO
SENTRY_DSN=your-sentry-dsn  # optionnel
```

### 5️⃣ Générer secrets sécurisés

```bash
# JWT Secret Key (Linux/Mac)
openssl rand -hex 32

# Ou avec Python
python3 -c "import secrets; print(secrets.token_hex(32))"

# Webhook Secret
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

---

## HTTPS & Certificats SSL

### Avec Caddy (Automatique)
```
Caddy gère automatiquement les certificats Let's Encrypt!
```

### Avec Nginx + Certbot
```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx

# Générer certificat
sudo certbot certonly --nginx -d api.votre-domaine.ci

# Auto-renouvellement
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

---

## Monitoring & Logs

### Health Check
```bash
curl https://api.votre-domaine.ci/health
```

### Logs avec Caddy
```bash
sudo journalctl -u caddy -f
```

### Monitoring avec Sentry (Optionnel)
```python
# Dans app/main.py
import sentry_sdk

sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN"),
    traces_sample_rate=0.1
)
```

### Database Backups
```bash
# PostgreSQL backup
pg_dump postgresql://user:pass@host:5432/db > backup.sql

# Restore
psql postgresql://user:pass@host:5432/db < backup.sql
```

---

## Checklist Production ✅

- [ ] JWT_SECRET_KEY changé et sécurisé
- [ ] DATABASE_URL pointant vers prod
- [ ] ENVIRONMENT=production
- [ ] HTTPS activé sur API et Frontend
- [ ] CORS_ORIGINS configuré correctement
- [ ] Migrations appliquées: `alembic upgrade head`
- [ ] Seed de démo supprimé en production
- [ ] Backups automatiques configurés
- [ ] Monitoring/Alertes activés
- [ ] Rate limiting activé
- [ ] SMTP configuré pour emails réels
- [ ] S3/uploads sécurisés
- [ ] Logs centralisés
- [ ] Health checks configurés
- [ ] CDN pour static assets

---

## Troubleshooting

### Erreur: "Connection refused" sur la DB
```bash
# Vérifier DATABASE_URL
echo $DATABASE_URL

# Tester connexion
psql $DATABASE_URL -c "SELECT 1;"
```

### Erreur: CORS blocked
```bash
# Vérifier FRONTEND_ORIGIN
echo $FRONTEND_ORIGIN

# Doit correspondre exactement à l'URL du frontend
```

### Migrations échouées
```bash
# Reset migrations (DEV ONLY!)
alembic downgrade base
alembic upgrade head
```

### Frontend ne peut pas accéder API
```bash
# Vérifier NEXT_PUBLIC_API_URL
echo $NEXT_PUBLIC_API_URL

# Tester manuellement
curl $NEXT_PUBLIC_API_URL/health
```

---

## Support & Resources

- 📚 [FastAPI Docs](https://fastapi.tiangolo.com)
- 📚 [Next.js Docs](https://nextjs.org/docs)
- 📚 [Vercel Deploy](https://vercel.com/docs)
- 📚 [Railway Deploy](https://docs.railway.app)
- 📚 [PostgreSQL Docs](https://www.postgresql.org/docs)

---

**Déploiement réussi! 🎉**
