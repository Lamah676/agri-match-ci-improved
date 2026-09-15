# 🤝 Guide de Contribution

## Avant de commencer

1. Fork le repository
2. Clone votre fork: `git clone https://github.com/YOUR_USERNAME/agri-match-ci-improved.git`
3. Créez une branche: `git checkout -b feature/ma-feature`

## Conventions de Commit

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage
- `refactor`: Refactorisation
- `perf`: Performance
- `test`: Tests
- `chore`: Tâches de maintenance

### Exemples
```
feat(matching): améliorer l'algorithme de scoring
fix(auth): corriger la validation JWT
docs(api): ajouter documentation endpoints
```

## Code Style

### Python (Backend)
```bash
# Formatter
black app/

# Linter
flake8 app/

# Type checking
mypy app/
```

### TypeScript/React (Frontend)
```bash
# Formatter
npm run format

# Linter
npm run lint

# Type check
npm run type-check
```

## Tests

### Backend
```bash
cd backend
pip install -r requirements.txt
pytest -v
```

### Frontend
```bash
cd frontend
npm install
npm run test
```

## Pull Request

1. Pousser vos changements: `git push origin feature/ma-feature`
2. Ouvrir une PR sur GitHub
3. Décrire vos changements clairement
4. Attendre la review

### Checklist PR
- [ ] Commit messages clairs et conventionnels
- [ ] Tests ajoutés/modifiés
- [ ] Documentation mise à jour
- [ ] Pas de breaking changes (ou expliqué)
- [ ] Code formaté et linté

## Développement Local

### Setup complet
```bash
make install
make up
make seed
```

### Commandes utiles
```bash
make test        # Tests backend
make test-watch  # Mode watch
make coverage    # Rapport de couverture
make migrate     # Appliquer migrations
make logs        # Afficher les logs
```

## Architecture

Voir [ARCHITECTURE.md](./ARCHITECTURE.md) pour:
- Design system
- Structure des fichiers
- Patterns et conventions
- Performance

## Questions?

Ouvrez une issue: https://github.com/Lamah676/agri-match-ci-improved/issues

---

Merci de contribuer! 🙏
