[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Audit marketing-ROI tegen CRM-realiteit in plaats van tegen platformclaims

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Marketing%20Decision%20Support-orange.svg)

**Een gratis browser- en Excel-gebaseerd marketing-auditraamwerk dat Google Ads-, GA4-, Search Console- en CRM-omzetgegevens verzoent om werkelijke acquisitieprestaties, verborgen attributie-inflatie en verspilde advertentiebestedingen bloot te leggen.**

**Geen registratie. Geen installatie. Gratis in uw browser.**

Probeer de browserversie gratis. Als u de Excel-versie nodig heeft, kunt u die kopen met een geld-terug-garantie van 30 dagen zonder vragen.
>
> 🌐 **Openen in browser** → [*HTML-livedemo*](https://hyvoid.github.io/Marketing-Audit-Decision-Console/)
>
> 📥 **Download Excel** → GitHub-release / [Website](https://www.theseusworkshop.com/) *(binnenkort beschikbaar)*

---

## Wat het u helpt bijhouden

- Gerapporteerde advertentieconversies versus door CRM bevestigde zakelijke resultaten.
- Werkelijke klantacquisitiekosten na het verwijderen van ongeldige en niet-gekwalificeerde leads.
- Door de campagne gegenereerde omzet op basis van financiële registraties in plaats van advertentieplatformclaims.
- Verborgen attributielekkage tussen marketingplatforms en operationele realiteit.
- Zoektermen die budget verbruiken zonder gekwalificeerde opportuniteiten te genereren.
- De vijf optimale optimalisatieacties, gerangschikt op terugwinbare waarde.

---

## Waarom ik dit heb gebouwd

Ik bouwde dit raamwerk oorspronkelijk nadat ik herhaaldelijk hetzelfde analytische falen had gezien in lokale dienstverlenende bedrijven, bureaus en kleine marketingteams: iedereen optimaliseerde marketingcampagnes met cijfers die technisch correct maar operationeel onjuist waren.

Een campagne kon binnen Google Ads succesvol lijken:

| Metric      | Platformrapport |
| ----------- | --------------- |
| Besteding       | $15.843         |
| Conversies | 480             |
| CPA         | $33             |

De bedrijfseigenaar zou concluderen:

> "Onze marketing werkt."

Echter, na verzoening van diezelfde campagnes met CRM-registraties en voltooide opdrachten, zag het werkelijke zakelijke resultaat er heel anders uit:

| Metric          | CRM-geauditeerde realiteit |
| --------------- | ------------------- |
| Gekwalificeerde leads | 95                  |
| Voltooide opdrachten  | 24                  |
| Echte CPA        | $166                |
| Echte ROAS       | 3,05×               |

Het probleem was niet onnauwkeurige software.

Het probleem was een analytisch falen: marketingplatforms optimaliseren voor geregistreerde gebeurtenissen, terwijl bedrijven overleven op voltooide transacties en geïnde omzet.

Dit project produceert een herhaalbaar redeneerraamwerk:

1. Begin met de bewezen marketingprestatie.
2. Traceer elke conversie in de operationele systemen.
3. Verwijder gediskwalificeerde, gedupliceerde en niet-commerciële gebeurtenissen.
4. Herbereken acquisitie-economie met de zakelijke realiteit.
5. Prioriteer interventies op financiële impact.

In plaats van nog een dashboard te bouwen, bouwde ik een herbruikbare auditmethodiek die een simpelere vraag beantwoordt:

> **„Welke marketingdollars hebben werkelijk omzet opgeleverd?"**

---

## Veelvoorkomende marketingproblemen die dit oplost

| Probleem                      | Zonder dit hulpmiddel                                          | Met dit hulpmiddel                                               |
| ---------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| Conversie-inflatie         | Advertentieplatforms rapporteren kunstmatig hoge prestaties | Door CRM bevestigde leads worden de grondwaarheid                  |
| Verborgen leadkwaliteitsproblemen | Teams optimaliseren op volume in plaats van waarde              | Gekwalificeerde leads en geboekte opdrachten worden optimalisatiedoelen  |
| Misleidende CPA-berekeningen  | CPA-berekeningen omvatten valse of dubbele conversies     | Echte CPA gebruikt gevalideerde zakelijke resultaten                    |
| Verspillende zoektermen        | Budgetlekkages blijven maanden onzichtbaar                   | Termen met hoge kosten en nul conversies worden automatisch geïdentificeerd |
| SEO/PPC-kanaalconflicten    | Organisch en betaald verkeer concurreren zonder zichtbaarheid        | Kanaaloverstijgende analyse op queryniveau wordt mogelijk          |
| Budgettoewijzingsfouten     | Bestedingsverschuivingen baseren op intuïtie                        | Budgetbeslissingen gebruiken geauditeerde ROAS en terugwinbare verspilling      |

---

## Voor wie dit is

Dit hulpmiddel is ontworpen voor:

- Lokale dienstverlenende bedrijven die Google Ads draaien.
- Kleine en middelgrote bureaus die marketingaudits uitvoeren.
- Marketingoperationele teams die attributiekwaliteit valideren.
- Bedrijfseigenaren die marketinguitgaven met werkelijke omzet proberen te verzoenen.
- Consultants die acquisitie-efficiëntiereviews uitvoeren.

Dit hulpmiddel is niet ontworpen voor:

- Enterprise marketingautomatiseringsplatforms.
- Multi-touch attributiemodelleringssystemen.
- Klantgegevensplatforms (CDP).
- Organisaties die realtime streaminganalyses vereisen.

**Geen spreadsheet-expertise vereist. Open de browserversie of het Excel-workbook en begin direct met auditen.**

---

## Over

Ik bouw lichtgewicht besluitondersteunende hulpmiddelen voor situaties waarin er te veel bewegende delen zijn om ze gelijktijdig in uw hoofd te houden.

De centrale vraag achter elk hulpmiddel is:

> **„Welke informatie moet op één plek bestaan om het volgende besluit met vertrouwen te nemen?"**

Dit marketing-ROI-auditconsole is één voorbeeld van die aanpak: een geproduceerd analytisch raamwerk ontworpen om marketingmetrics om te zetten in operationele beslissingen.

---

## Technische details

<details>
<summary>Voor technische reviewers, Excel-beoefenaars en medewerkers</summary>

---

### Workbook-architectuur

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

| Laag       | Doel                           |
| ----------- | --------------------------------- |
| Controle     | Parameters, drempels, uitvoering |
| Ruwe gegevens    | Ingestie van bronsystemen           |
| Berekening | Attributieverzoening        |
| Beslissing    | Aanbevelingen en rapportage     |
| Monitoring  | Audittrail en diagnostiek       |

---

### Drie valkuilen die zelfs ervaren marketingteams vangen

#### Valkuil #1 — Platformconversie-inflatie

**Genomen beslissing:**

Verhoog het budget omdat de CPA laag lijkt.

| Metric      | Platform | Geaudit |
| ----------- | -------- | ------- |
| Besteding       | $15.843  | $15.843 |
| Conversies | 480      | 95      |
| CPA         | $33      | $166    |

**Waarom dit redeneren faalt:**

Advertentieplatforms optimaliseren voor geregistreerde gebeurtenissen in plaats van zakelijke resultaten.

**Juiste aanpak:**

Bereken acquisitie-economie pas na CRM-verzoening.

**Juiste besluitresultaat:**

Verminder budgettoewijzing en herontwerp conversietracking.

<details>
<summary>Formulelogica</summary>

```excel
=IFERROR((Reported_Conversions-Real_Leads)
/Reported_Conversions,0)
```

```excel
=IFERROR(Total_Spend/Matched_Real_Leads,0)
```

</details>

---

#### Valkuil #2 — Optimaliseren van hoogvolume zoektermen met lage kwaliteit

**Genomen beslissing:**

Verhoog biedingen op zoektermen met hoog volume.

| Zoekterm          | Besteding | Leads | Beslissing |
| -------------------- | ----- | ----- | -------- |
| emergency plumber    | $220  | 12    | Behouden     |
| free plumbing advice | $310  | 0     | Uitsluiten  |

**Waarom dit redeneren faalt:**

Klikvolume meet aandacht, geen commerciële intentie.

**Juiste aanpak:**

Beoordeel zoektermen op productie van gekwalificeerde leads.

**Juiste besluitresultaat:**

Sluit niet-commerciële zoekpatronen uit.

<details>
<summary>Formulelogica</summary>

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

#### Valkuil #3 — Budgettoewijzing gebaseerd op gerapporteerde ROAS

**Genomen beslissing:**

Verplaats budget naar schijnbaar succesvolle campagnes.

| Campagne   | Gerapporteerde ROAS | Echte ROAS |
| ---------- | ------------- | --------- |
| Campaign A | 7,8×          | 1,4×      |
| Campaign B | 3,2×          | 4,5×      |

**Waarom dit redeneren faalt:**

Omzetattributie breekt wanneer operationele bevestiging ontbreekt.

**Juiste aanpak:**

Bereken ROAS uit financiële registraties.

**Juiste besluitresultaat:**

Herverdeel besteding naar campagnes met geverifieerde omzetproductie.

<details>
<summary>Formulelogica</summary>

```excel
=IFERROR(
 Real_Revenue
 /
 Total_Spend,
0)
```

</details>

---

### Voorbeeldscenario

Een residentieel HVAC-bedrijf geeft maandelijks $18.400 uit aan acht Google Ads-campagnes.

De eerste rapportage toont:

| Metric               | Waarde   |
| -------------------- | ------- |
| Advertentiebesteding             | $18.400 |
| Gerapporteerde conversies | 562     |
| Gerapporteerde CPA         | $32,74  |

Na import van CRM-gegevens:

| Metric          | Waarde   |
| --------------- | ------- |
| Gekwalificeerde leads | 118     |
| Geboekte opdrachten     | 31      |
| Omzet         | $57.200 |
| Echte CPA        | $155,93 |
| Echte ROAS       | 3,11×   |

Verdere analyse toont:

* 67% van de gerapporteerde conversies kwam nooit in CRM terecht.
* Drie campagnes genereerden 72% van de werkelijke omzet.
* Tweeëntwintig zoektermen verbruikten $3.480 met nul geboekte opdrachten.
* Eén zoekwoordengroep „free HVAC training" verbruikte alleen al $940.

Aanbevolen acties:

1. Pauzeer twee onderpresterende campagnes.
2. Voeg achttien negatieve zoekwoorden toe.
3. Herverdeel 35% van het budget naar geverifieerde campagnes.
4. Vervang front-end conversietracking door CRM-validatie.

Verwachte jaarlijkse besparingen:

```
Recovered Waste:
$3,480/month × 12
=
$41,760/year
```

---

### Formulereferentie

<details>
<summary>Audit-engine</summary>

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
<summary>Negatief-zoekwoordengine</summary>

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
<summary>Beslissingsengine</summary>

```excel
SORT(...)
CHOOSEROWS(...)
IFS(...)
XLOOKUP(...)
```

</details>

---

### Validatieregels

| Veld           | Regel             | Foutgedrag          |
| --------------- | ---------------- | ----------------------- |
| Auditperiode    | Moet 30/60/90 zijn | Invoer afwijzen            |
| Campagne-ID     | Mag niet leeg zijn  | Record uitsluiten          |
| Lead-ID         | Moet uniek zijn   | Duplicaat markeren          |
| Omzet         | Moet ≥0 zijn       | Validatiefout teruggeven |
| Geboekte opdracht      | Alleen 0 of 1      | Waarde afwijzen            |
| Kwaliteitsscore   | Geheel getal 1–10     | Anomalie markeren            |
| Attributiekloof | >50%             | Genereer waarschuwing          |
| Verspillingsdrempel | Configureerbaar     | Activeer aanbeveling  |

</details>

---

## Andere hulpmiddelen in deze serie

* **Google Ads-budgettoewijzingssimulator** — optimaliseer budgettoewijzing onder onzekerheid.
* **Marketingkanaal-attributieconsole** — vergelijk betaalde, organische, referral- en offline-acquisitiebronnen.
* **CRM-omzetlekkage-analyser** — identificeer omzetverlies tussen leadgeneratie en uitvoering.
* **Lokaal service-operatiedashboard** — verbind marketing, planning en buitendienst.

Meer hulpmiddelen zijn beschikbaar via GitHub-repositories en releasepakketten.

---

## Licentie

Dit project is gelicentieerd onder de **Apache License 2.0**.

Zie het LICENSE-bestand voor details.
