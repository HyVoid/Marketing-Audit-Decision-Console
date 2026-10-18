[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Auditez le ROI marketing contre la réalité CRM au lieu des affirmations des plateformes

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Marketing%20Decision%20Support-orange.svg)

**Un cadre d'audit marketing gratuit, basé sur navigateur et Excel, qui réconcilie les données de revenus Google Ads, GA4, Search Console et CRM pour révéler la performance d'acquisition réelle, l'inflation d'attribution cachée et les dépenses publicitaires gaspillées.**

**Sans inscription. Sans installation. Gratuit dans votre navigateur.**

Essayez la version navigateur gratuitement. Si vous avez besoin de la version Excel, vous pouvez l'acheter avec une garantie de remboursement de 30 jours sans poser de questions.
>
> 🌐 **Ouvrir dans le navigateur** → [*Démo HTML en direct*](https://hyvoid.github.io/Marketing-Audit-Decision-Console/)
>
> 📥 **Télécharger Excel** → Version GitHub / [Site web](https://www.theseusworkshop.com/) *(bientôt disponible)*

---

## Ce qu'il vous aide à suivre

- Les conversions publicitaires rapportées face aux résultats commerciaux confirmés par le CRM.
- Le coût d'acquisition client réel après suppression des prospects invalides et non qualifiés.
- Les revenus générés par campagne sur la base des registres financiers plutôt que des affirmations des plateformes publicitaires.
- Les fuites d'attribution cachées entre les plateformes marketing et la réalité opérationnelle.
- Les termes de recherche consommant du budget sans générer d'opportunités qualifiées.
- Les cinq actions d'optimisation à plus fort impact, classées par valeur récupérable.

---

# Pourquoi j'ai conçu ceci

J'ai conçu ce cadre à l'origine après avoir rencontré à plusieurs reprises le même échec analytique dans les entreprises de services locales, les agences et les petites équipes marketing : tout le monde optimisait les campagnes marketing avec des chiffres techniquement corrects mais opérationnellement faux.

Une campagne pouvait sembler réussie dans Google Ads :

| Indicateur      | Rapport de plateforme |
| ----------- | --------------- |
| Dépenses       | $15 843         |
| Conversions | 480             |
| CPA         | $33             |

Le chef d'entreprise en concluait :

> « Notre marketing fonctionne. »

Cependant, après réconciliation de ces mêmes campagnes avec les registres CRM et les travaux terminés, le résultat commercial réel était très différent :

| Indicateur          | Réalité auditée par CRM |
| --------------- | ------------------- |
| Prospects qualifiés | 95                  |
| Travaux terminés  | 24                  |
| CPA réel        | $166                |
| ROAS réel       | 3,05×               |

Le problème n'était pas un logiciel imprécis.

Le problème était un échec analytique : les plateformes marketing optimisent pour les événements enregistrés, tandis que les entreprises survivent grâce aux transactions terminées et aux revenus encaissés.

Ce projet industrialise un cadre de raisonnement reproductible :

1. Partez de la performance marketing affirmée.
2. Tracez chaque conversion dans les systèmes opérationnels.
3. Supprimez les événements disqualifiés, dupliqués et non commerciaux.
4. Recalculez l'économie d'acquisition en utilisant la réalité de l'entreprise.
5. Priorisez les interventions par impact financier.

Au lieu de construire un tableau de bord de plus, j'ai construit une méthodologie d'audit réutilisable qui répond à une question plus simple :

> **« Quels dollars marketing ont réellement produit des revenus ? »**

---

## Problèmes marketing courants résolus par cet outil

| Problème                      | Sans cet outil                                          | Avec cet outil                                               |
| ---------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| Inflation des conversions         | Les plateformes publicitaires rapportent une performance artificiellement élevée | Les prospects confirmés par CRM deviennent la vérité terrain                  |
| Problèmes de qualité des prospects cachés | Les équipes optimisent vers le volume au lieu de la valeur              | Les prospects qualifiés et les travaux réservés deviennent des cibles d'optimisation  |
| Calculs de CPA trompeurs  | Les calculs de CPA incluent des conversions fausses ou dupliquées     | Le CPA réel utilise des résultats commerciaux validés                    |
| Termes de recherche coûteux        | Les fuites de budget restent invisibles pendant des mois                   | Les termes à coût élevé sans conversion sont identifiés automatiquement |
| Conflits de canaux SEO/PPC    | Le trafic organique et payant rivalisent sans visibilité        | L'analyse cross-canal au niveau des requêtes devient possible          |
| Erreurs d'allocation budgétaire     | Les changements de dépense reposent sur l'intuition                        | Les décisions budgétaires utilisent le ROAS audité et le gaspillage récupérable      |

---

## Pour qui c'est conçu

Cet outil est conçu pour :

- Les entreprises de services locales qui diffusent des annonces Google Ads.
- Les petites et moyennes agences réalisant des audits marketing.
- Les équipes des opérations marketing validant la qualité d'attribution.
- Les chefs d'entreprise tentant de réconcilier les dépenses marketing avec les revenus réels.
- Les consultants menant des revues d'efficacité d'acquisition.

Cet outil n'est pas conçu pour :

- Les plateformes d'automatisation marketing d'entreprise.
- Les systèmes de modélisation d'attribution multi-touch.
- Les plateformes de données client (CDP).
- Les organisations nécessitant des analyses en flux continu en temps réel.

**Aucune expertise en tableur n'est requise. Ouvrez la version navigateur ou le classeur Excel et commencez à auditer immédiatement.**

---

## À propos

Je conçois des outils légers d'aide à la décision pour des situations où il y a trop de pièces mobiles pour les retenir simultanément dans votre tête.

La question centrale derrière chaque outil est :

> **« Quelles informations doivent coexister en un seul endroit pour prendre la prochaine décision avec confiance ? »**

Cette console d'audit du ROI marketing est un exemple de cette approche : un cadre analytique industrialisé conçu pour convertir les métriques marketing en décisions opérationnelles.

---

## Détails techniques

<details>
<summary>Pour les réviseurs techniques, les praticiens d'Excel et les collaborateurs</summary>

---

### Architecture du classeur

```
[Control Layer]
│
├── 01_Control_Panel
└── 02_Settings
          │
          ▼
[Raw Data Layer]
│
├── Raw_GAds_SearchTerms
├── Raw_GAds_Campaigns
├── Raw_GAds_Keywords
├── Raw_GA4
├── Raw_GSC_Queries
├── Raw_GSC_Pages
└── Raw_Leads
          │
          ▼
[Calculation Engine]
│
├── Audit_Engine
└── Negative_Keyword_Ideas
          │
          ▼
[Decision Layer]
│
├── Top_5_Fixes
└── Latest_Report
          │
          ▼
[Monitoring]
└── Logs
```

| Couche       | Objectif                           |
| ----------- | --------------------------------- |
| Contrôle     | Paramètres, seuils, exécution |
| Données brutes    | Ingestion des systèmes sources           |
| Calcul | Rapprochement des attributions        |
| Décision    | Recommandations et reporting     |
| Surveillance  | Piste d'audit et diagnostics       |

---

### Trois pièges qui surprennent même les équipes marketing expérimentées

#### Piège #1 — L'inflation des conversions par la plateforme

**Décision prise :**

Augmenter le budget parce que le CPA semble bas.

| Indicateur      | Plateforme | Audité |
| ----------- | -------- | ------- |
| Dépenses       | $15 843  | $15 843 |
| Conversions | 480      | 95      |
| CPA         | $33      | $166    |

**Pourquoi ce raisonnement échoue :**

Les plateformes publicitaires optimisent pour les événements enregistrés plutôt que pour les résultats commerciaux.

**Approche correcte :**

Calculer l'économie d'acquisition seulement après rapprochement CRM.

**Résultat de décision correct :**

Réduire l'allocation budgétaire et reconcevoir le suivi des conversions.

<details>
<summary>Logique de formule</summary>

```excel
=IFERROR((Reported_Conversions-Real_Leads)
/Reported_Conversions,0)
```

```excel
=IFERROR(Total_Spend/Matched_Real_Leads,0)
```

</details>

---

#### Piège #2 — Optimiser des mots-clés à haut volume et faible qualité

**Décision prise :**

Augmenter les enchères sur les termes de recherche à haut volume.

| Terme de recherche          | Dépenses | Prospects | Décision |
| -------------------- | ----- | ----- | -------- |
| emergency plumber    | $220  | 12    | Conserver     |
| free plumbing advice | $310  | 0     | Exclure  |

**Pourquoi ce raisonnement échoue :**

Le volume de clics mesure l'attention, pas l'intention commerciale.

**Approche correcte :**

Évaluer les termes de recherche par la production de prospects qualifiés.

**Résultat de décision correct :**

Exclure les schémas de recherche non commerciaux.

<details>
<summary>Logique de formule</summary>

```excel
=IF(
 AND(
   Spend>(Max_CPA*1.5),
   Leads=0
 ),
 "CRITICAL WASTE",
 "KEEP"
)
```

</details>

---

#### Piège #3 — Allocation budgétaire basée sur le ROAS rapporté

**Décision prise :**

Transférer le budget vers des campagnes apparemment réussies.

| Campagne   | ROAS rapporté | ROAS réel |
| ---------- | ------------- | --------- |
| Campaign A | 7,8×          | 1,4×      |
| Campaign B | 3,2×          | 4,5×      |

**Pourquoi ce raisonnement échoue :**

L'attribution des revenus s'effondre lorsque la confirmation opérationnelle est absente.

**Approche correcte :**

Calculer le ROAS à partir des registres financiers.

**Résultat de décision correct :**

Réallouer les dépenses vers les campagnes à production de revenus vérifiée.

<details>
<summary>Logique de formule</summary>

```excel
=IFERROR(
 Real_Revenue
 /
 Total_Spend,
0)
```

</details>

---

### Scénario d'exemple

Une entreprise résidentielle CVC dépense 18 400 $ par mois sur huit campagnes Google Ads.

Le reporting initial montre :

| Indicateur               | Valeur   |
| -------------------- | ------- |
| Dépenses publicitaires             | $18 400 |
| Conversions rapportées | 562     |
| CPA rapporté         | $32,74  |

Après import des données CRM :

| Indicateur          | Valeur   |
| --------------- | ------- |
| Prospects qualifiés | 118     |
| Travaux réservés     | 31      |
| Revenus         | $57 200 |
| CPA réel        | $155,93 |
| ROAS réel       | 3,11×   |

L'analyse plus poussée révèle :

* 67 % des conversions rapportées ne sont jamais entrées dans le CRM.
* Trois campagnes ont généré 72 % des revenus réels.
* Vingt-deux termes de recherche ont consommé 3 480 $ sans aucun travail réservé.
* Un groupe de mots-clés « free HVAC training » a consommé à lui seul 940 $.

Actions recommandées :

1. Mettre en pause deux campagnes sous-performantes.
2. Ajouter dix-huit mots-clés négatifs.
3. Réallouer 35 % du budget vers les campagnes vérifiées.
4. Remplacer le suivi des conversions en amont par la validation CRM.

Économies annuelles attendues :

```
Recovered Waste:
$3,480/month × 12
=
$41,760/year
```

---

### Référence de formules

<details>
<summary>Moteur d'audit</summary>

```excel
Campaign List
=UNIQUE(...)

Real Leads
=COUNTIFS(...)

Real Revenue
=SUMIFS(...)

Real CPA
=Spend/RealLeads

Real ROAS
=Revenue/Spend

Attribution Gap
=(Reported-Actual)/Reported
```

</details>

<details>
<summary>Moteur de mots-clés négatifs</summary>

```excel
FILTER(...)
MAP(...)
LET(...)
LAMBDA(...)
HSTACK(...)
VSTACK(...)
```

</details>

<details>
<summary>Moteur de décision</summary>

```excel
SORT(...)
CHOOSEROWS(...)
IFS(...)
XLOOKUP(...)
```

</details>

---

### Règles de validation

| Champ           | Règle             | Comportement en cas d'erreur          |
| --------------- | ---------------- | ----------------------- |
| Période d'audit    | Doit être 30/60/90 | Rejeter la saisie            |
| ID de campagne     | Ne peut être vide  | Exclure l'enregistrement          |
| ID de prospect         | Doit être unique   | Signaler le doublon          |
| Revenus         | Doit être ≥0       | Renvoyer une erreur de validation |
| Travail réservé      | Seulement 0 ou 1      | Rejeter la valeur            |
| Score de qualité   | Entier 1–10     | Signaler l'anomalie            |
| Écart d'attribution | >50 %             | Générer une alerte          |
| Seuil de gaspillage | Configurable     | Déclencher une recommandation  |

</details>

---

## Autres outils de cette série

* **Simulateur d'allocation budgétaire Google Ads** — optimiser l'allocation budgétaire sous incertitude.
* **Console d'attribution des canaux marketing** — comparer les sources d'acquisition payantes, organiques, par référence et hors ligne.
* **Analyseur de fuite de revenus CRM** — identifier la perte de revenus entre la génération de prospects et l'exécution.
* **Tableau de bord des opérations de service local** — connecter marketing, planification et opérations terrain.

D'autres outils sont disponibles via les dépôts GitHub et les packages de version.

---

## Licence

Ce projet est sous licence **Apache License 2.0**.

Voir le fichier LICENSE pour les détails.
