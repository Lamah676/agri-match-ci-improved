# 📋 Checklist Installation & Déploiement

## ✅ Installation Locale

### Prérequis
- [ ] Git installé
- [ ] Docker & Docker Compose installés
- [ ] Ports 3000, 5432, 8000 disponibles
- [ ] Au moins 2GB RAM libre

### Démarrage
```bash
# 1. Cloner
git clone https://github.com/Lamah676/agri-match-ci-improved.git
cd agri-match-ci-improved

# 2. Lancer
make up

# 3. Seed
make seed

# 4. Vérifier
open http://localhost:3000
```

- [ ] Frontend chargé (http://localhost:3000)
- [ ] API accessible (http://localhost:8000/health)
- [ ] Docs API disponible (http://localhost:8000/docs)
- [ ] DB connectée (make db-shell)
- [ ] Données de démo chargées

### Test Login
- [ ] Admin login: admin@agri-match.ci / admin123
- [ ] Producer login: kouassi@ferme.ci / demo1234
- [ ] Buyer login: marche@abidjan.ci / demo1234

---

## ✅ Déploiement Production

### Frontend (Vercel)
- [ ] Repository pushé sur GitHub
- [ ] Compte Vercel créé (https://vercel.com)
- [ ] Repository lié à Vercel
- [ ] Root directory: `frontend`
- [ ] Environment variable: `NEXT_PUBLIC_API_URL`
- [ ] Domain configuré (ou utiliser vercel.app)
- [ ] Auto-deployments activés
- [ ] Build réussi
- [ ] Frontend accessible via HTTPS

### Backend (Railway/Render/VPS)

#### Option 1: Railway
- [ ] Compte Railway créé
- [ ] Base PostgreSQL créée
- [ ] Environment variables configurées
- [ ] Build et deployment réussi
- [ ] Health check: `curl https://api.votre-domaine.ci/health`

#### Option 2: Render
- [ ] Compte Render créé
- [ ] Web Service créé
- [ ] PostgreSQL créé
- [ ] Environment variables configurées
- [ ] Build réussi
- [ ] Déploiement automatique activé

#### Option 3: VPS
- [ ] VPS loué (DigitalOcean, Scaleway, etc)
- [ ] SSH accès configuré
- [ ] Docker installé
- [ ] .env.production créé avec secrets
- [ ] PostgreSQL running
- [ ] Backend deployed
- [ ] Caddy/Nginx reverse proxy configuré
- [ ] SSL certificats activés

### Configuration Globale
- [ ] Domain registrar configuré
- [ ] DNS records pointant vers services
- [ ] SSL certificats valides (HTTPS)
- [ ] CORS configuré correctement
- [ ] Environment variables sécurisés
- [ ] Backups configurés
- [ ] Monitoring activé
- [ ] Logs centralisés

### Tests Production
- [ ] Frontend chargé en HTTPS
- [ ] API accessible en HTTPS
- [ ] Login fonctionne
- [ ] Offres affichées
- [ ] Matching fonctionne
- [ ] Images uploadées sauvegardées
- [ ] Emails envoyés (SMTP)
- [ ] Database backups fonctionnels

---

## 🔒 Sécurité

- [ ] JWT_SECRET_KEY changé (32+ caractères)
- [ ] Database password sécurisé
- [ ] Pas de credentials en code
- [ ] .env.production en .gitignore
- [ ] Rate limiting activé
- [ ] CORS restrictif
- [ ] HTTPS partout
- [ ] HSTS headers activés
- [ ] CSP headers configurés
- [ ] SQL injection prevention (ORM utilisé)
- [ ] XSS prevention
- [ ] CSRF protection

---

## 📊 Monitoring

- [ ] Health checks configurés
- [ ] Alertes définies (uptime, errors)
- [ ] Logs centralisés (Sentry, Datadog, etc)
- [ ] Performance monitoring
- [ ] Database backups testés
- [ ] Disaster recovery plan
- [ ] Incident response plan

---

## 📚 Documentation

- [ ] README.md à jour
- [ ] ARCHITECTURE.md complet
- [ ] DEPLOY.md détaillé
- [ ] API.md documentée
- [ ] CONTRIBUTING.md pour contribuants
- [ ] Changelog maintenu
- [ ] Environment variables documentés

---

## 🚀 Post-Deployment

- [ ] Monitoring configuré et testé
- [ ] Alertes actives
- [ ] Runbook créé
- [ ] Équipe notifiée (status page)
- [ ] Feedbacks utilisateurs collectés
- [ ] Analytics configuré
- [ ] Performance optimisée (basé sur métriques)
- [ ] Security audit complété

---

## 📝 Améliorations Continues

- [ ] Bug fixes priorizés
- [ ] Performance optimization
- [ ] Feature requests collectés
- [ ] User feedback intégré
- [ ] Roadmap mis à jour
- [ ] Release notes publiés
- [ ] Community feedback
- [ ] Partner integrations

---

**Déploiement complété! 🎉**

En cas de problème: Consultez [DEPLOY.md](./DEPLOY.md) ou ouvrez une issue.
