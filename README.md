# IT Learning Academy — Landing page de préinscription

Landing page statique (HTML/CSS/JS, sans framework, sans build) pour la préinscription aux formations IT Learning Academy. Le formulaire n'exige aucun document joint ; les données sont envoyées directement dans un Google Sheet.

Contenu basé sur le catalogue `CATALOGUE FORMATION_ItLearning.ai.pdf` et l'identité visuelle de [www.itlearning-campus.com](https://www.itlearning-campus.com) (couleurs, polices, logo).

## Structure

```
index.html          page principale
style.css            styles
script.js             logique du formulaire (fetch vers Apps Script)
assets/               logo, favicon
apps-script/Code.gs   script serveur Google Apps Script (à coller dans le Sheet)
```

## 1. Connecter le formulaire au Google Sheet

Un Google Sheet a déjà été créé avec les bonnes colonnes :
**IT Learning Academy - Préinscriptions**
https://docs.google.com/spreadsheets/d/1ZPPPxvZFrcBjnJNfVUZ1JclRnIGOWltqQ9paDCojYNU/edit

Étapes (2 minutes) :

1. Ouvre le Sheet ci-dessus.
2. Menu **Extensions > Apps Script**.
3. Supprime le code par défaut et colle le contenu de `apps-script/Code.gs`.
4. Clique **Déployer > Nouveau déploiement**.
5. Type : **Application Web**.
   - Exécuter en tant que : **Moi**
   - Qui a accès : **Tout le monde**
6. Clique **Déployer**, autorise les permissions demandées.
7. Copie l'**URL de l'application Web** générée (se termine par `/exec`).
8. Ouvre `script.js` et remplace :
   ```js
   const SCRIPT_URL = "REPLACE_WITH_APPS_SCRIPT_WEB_APP_URL";
   ```
   par l'URL copiée.

Chaque soumission du formulaire ajoutera une ligne : horodatage, prénom, nom, email, téléphone, ville/campus, profil, domaine de formation, format souhaité, message, source.

> Si tu modifies `Code.gs` plus tard, il faut redéployer (**Déployer > Gérer les déploiements > Modifier > Nouvelle version**).

## 2. Tester en local

Ouvre simplement `index.html` dans un navigateur, ou sers le dossier :

```bash
npx serve .
# ou
python -m http.server 8080
```

## 3. Publier sur GitHub Pages

```bash
git init
git add .
git commit -m "Landing page de préinscription IT Learning Academy"
git branch -M main
git remote add origin <URL_DU_REPO_GITHUB>
git push -u origin main
```

Puis dans les paramètres du repo GitHub : **Settings > Pages > Source: branch `main` / root** → le site sera disponible sur `https://<user>.github.io/<repo>/`.

## Notes

- Le logo et le favicon proviennent de itlearning-campus.com (usage pour cette landing page officielle uniquement).
- Aucune donnée sensible n'est stockée côté client ; tout transite directement vers le Google Sheet via Apps Script.
