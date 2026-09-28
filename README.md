# IT Learning Academy — Landing pages de préinscription

Deux landing pages statiques (HTML/CSS/JS, sans framework, sans build) :
- `index.html` — préinscription particuliers
- `entreprises.html` — demande de devis entreprises (B2B)

Aucun formulaire n'exige de document joint ; les données sont envoyées directement dans un Google Sheet dédié par page.

Contenu basé sur le catalogue `CATALOGUE FORMATION_ItLearning.ai.pdf` et l'identité visuelle de [www.itlearning-campus.com](https://www.itlearning-campus.com) (couleurs, polices, logo).

## Structure

```
index.html                        préinscription particuliers
entreprises.html                  demande de devis entreprises
style.css                         styles partagés
script.js                         logique du formulaire particuliers
entreprises.js                    logique du formulaire entreprises
assets/                           logo, favicon
apps-script/Code.gs                script serveur — Sheet Préinscriptions
apps-script/Code-Entreprises.gs    script serveur — Sheet Demandes Entreprises
```

## 1. Connecter les formulaires aux Google Sheets

Deux Google Sheets ont déjà été créés :

**A. Préinscriptions particuliers**
https://docs.google.com/spreadsheets/d/1ZPPPxvZFrcBjnJNfVUZ1JclRnIGOWltqQ9paDCojYNU/edit
→ coller `apps-script/Code.gs`, déployer, mettre l'URL `/exec` dans `script.js` (`SCRIPT_URL`)

**B. Demandes entreprises**
https://docs.google.com/spreadsheets/d/10fuGeT_4Rn2QzfecfMniQi-i-399hwAX4eINcctpLeE/edit
→ coller `apps-script/Code-Entreprises.gs`, déployer, mettre l'URL `/exec` dans `entreprises.js` (`SCRIPT_URL`)

Étapes (2 minutes, à répéter pour chaque Sheet) :

1. Ouvre le Sheet concerné.
2. Menu **Extensions > Apps Script**.
3. Supprime le code par défaut et colle le contenu du fichier `.gs` correspondant.
4. Clique **Déployer > Nouveau déploiement**.
5. Type : **Application Web**.
   - Exécuter en tant que : **Moi**
   - Qui a accès : **Tout le monde**
6. Clique **Déployer**, autorise les permissions demandées.
7. Copie l'**URL de l'application Web** générée (se termine par `/exec`).
8. Colle-la dans la constante `SCRIPT_URL` du fichier JS correspondant.

Chaque soumission ajoutera une ligne (horodatage + champs du formulaire + source).

> Si tu modifies un `.gs` plus tard, il faut redéployer (**Déployer > Gérer les déploiements > Modifier > Nouvelle version**).

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
