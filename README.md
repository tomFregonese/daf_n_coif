# Daf & Coiff

Site vitrine statique pour **Daf&Coiff**, coiffure à domicile (Dafné) — secteur Peypin (13) et alentours.

Site one-page, HTML/CSS/JS pur (aucune dépendance, aucun build) : Accueil · Dafné · Prestations & tarifs · Galerie · Zone d'intervention · Contact.

## Structure

```
index.html              page principale
mentions-legales.html   page mentions légales (placeholders à compléter)
css/style.css           tout le style (palette + typo reprises du flyer)
js/main.js              nav mobile, header au scroll, animations, galerie (lightbox)
img/
  hero/                 photo de héros (jpg + webp)
  gallery/               6 photos portfolio (jpg + webp, version pleine + miniature)
  about/                 visuel de la section "Dafné"
  logo/                  monogramme DC (svg) + favicons générés
assets/                 fichiers sources fournis par le client (flyer, exports Instagram) — non utilisés directement par le site, conservés comme référence
```

## Aperçu en local

Aucun outil requis, juste un serveur statique pour éviter les soucis de CORS avec les polices/images :

```bash
cd daf_n_coif
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Offres commerciales envisagées

Deux formules possibles à proposer au client, selon son besoin d'autonomie sur le contenu.

|                                 | **Formule 1 — Site statique** | **Formule 2 — Pack WordPress géré** |
|---------------------------------|---|---|
| Création (one-shot)             | ~400–500 € | 500 € |
| Abonnement récurrent            | Aucun | 20 €/mois **ou** 200 €/an, au choix du client |
| Hébergement                     | Suggéré : GitHub Pages (gratuit) | Inclus (Dokploy sur notre VPS Hetzner) |
| Nom de domaine                  | À la charge du client — avec l'hébergement GitHub Pages suggéré ci-dessus, c'est le seul coût réel : ~15 €/an. Achat en direct chez un registrar (OVH, Gandi...), le client en reste propriétaire | Inclus dans l'abonnement — enregistré au nom du client malgré tout (cf. note) |
| Certificat HTTPS                | Inclus (GitHub Pages) | Inclus |
| Mises à jour de sécurité        | — | Incluses (core / plugins / thème WordPress) |
| Sauvegardes                     | — | Incluses |
| Modifier prix / textes / photos | Passe par le code (HTML/CSS) : un prestataire au choix du client, ou nous — facturé ~50 €/modification indicatif, sans abonnement | Autonome : le client édite lui-même depuis l'admin WordPress, à tout moment, sans nous solliciter, sans surcoût |
| Avantages client                | Coût de départ faible, aucun abonnement, mais dépendant d'un développeur pour le moindre changement | Autonomie totale, aucune compétence technique requise, coût récurrent mais prévisible |

Points à clarifier avec le client avant de contractualiser la Formule 2 :
- Même si on paie et gère le nom de domaine dans l'abonnement, il doit être enregistré au nom du client (compte registrar à son nom, nous en gestionnaires) — pour qu'il reste propriétaire de son identité en ligne s'il change un jour de prestataire.
- Ce qui se passe en cas d'arrêt de paiement (site/domaine suspendus) doit être annoncé clairement dans l'offre.
- Le tarif de l'abonnement doit couvrir le coût d'infra réel (~15–100 €/an selon mutualisation ou VPS dédié, cf. section Déploiement) et le temps de maintenance, pas juste l'hébergement brut.

## Déploiement

Le site est 100 % statique : n'importe quel hébergeur qui sert des fichiers fonctionne.

**Sur Hetzner (nginx/Apache déjà en place)** : copier tout le contenu du dossier (sauf `assets/`, `README.md`, `.idea/`) à la racine du vhost. Aucune config particulière requise — pas de backend, pas de variables d'environnement.

**Sur GitHub Pages (gratuit)** :
1. Pousser ce repo sur GitHub.
2. Dans *Settings → Pages*, choisir la branche `main` et le dossier `/ (root)`.
3. Le site est servi sur `https://<utilisateur>.github.io/<repo>/`.

Pour un nom de domaine propre (`daf-et-coiff.fr` par ex.) sur GitHub Pages, ajouter un fichier `CNAME` à la racine contenant le domaine, et pointer un enregistrement DNS `CNAME`/`ALIAS` vers `<utilisateur>.github.io`.

**Sur Dokploy (auto-hébergé, alternative envisageable plus tard)** : le site étant 100 % statique, un déploiement sur Dokploy resterait simple le jour venu — build type **Static** si la version installée le propose, sinon un `Dockerfile` minimal (`nginx:alpine` + copie des fichiers) suffit. Pas mis en place pour l'instant : le site tourne actuellement en production sur GitHub Pages, à l'adresse `dafandcoiff.dytoagency.com`.

## Avant mise en ligne publique

- **Mentions légales** (`mentions-legales.html`) : compléter les champs `[À COMPLÉTER]` (SIRET, statut juridique, adresse, e-mail) avec Dafné.
- Vérifier le numéro de téléphone (`tel:+33645380512`) si le numéro change.
- Les tarifs affichés reprennent ceux du flyer fourni — à resynchroniser si elle les met à jour.

### Checklist SEO — bascule vers le domaine définitif

Le site est actuellement volontairement **bloqué pour les moteurs de recherche**
(adresse provisoire `dafandcoiff.dytoagency.com`, pas encore le domaine final).
Une fois le nom de domaine définitif choisi et le DNS en place :

1. Remplacer le placeholder `https://www.dafandcoiff.fr` par la vraie URL, partout où il apparaît :
   `index.html` (`canonical`, `og:*`, `twitter:*`, JSON-LD), `sitemap.xml`, `robots.txt` (ligne `Sitemap:` en commentaire).
2. Dans `index.html`, retirer la balise `<meta name="robots" content="noindex, nofollow">`
   (et tout le bloc de commentaire SEO juste au-dessus, devenu inutile).
3. Dans `robots.txt`, remplacer `Disallow: /` par `Allow: /` et décommenter la ligne `Sitemap:`.
4. Déployer, puis dans **Google Search Console** : valider la propriété du domaine, soumettre `sitemap.xml`, demander l'indexation de la page d'accueil.
5. Créer la fiche **Google Business Profile** (catégorie « Coiffeur à domicile », zone de service = Peypin et alentours, pas d'adresse publique) — c'est le levier le plus important pour ce type d'activité, à faire dès que possible après la mise en ligne.
6. Vérifier le rendu du partage sur réseaux sociaux (aperçu Instagram/WhatsApp) une fois l'`og:image` sur la vraie URL.

## Contenu / prestations

Modifier les prix ou prestations directement dans `index.html`, section `#prestations` (une carte `.service-card` par prestation). La galerie (`#galerie`) et ses légendes sont dans la section `#galerie` ; pour ajouter une photo, déposer le fichier dans `img/gallery/` (idéalement en jpg + webp, plein format ~1400px et miniature ~680px) et dupliquer un bloc `.gallery-item`.
