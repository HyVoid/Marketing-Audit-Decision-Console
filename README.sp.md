[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Audite el ROI de marketing contra la realidad del CRM en lugar de las afirmaciones de las plataformas

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Marketing%20Decision%20Support-orange.svg)

**Un marco de auditoría de marketing gratuito basado en navegador y Excel que concilia los datos de ingresos de Google Ads, GA4, Search Console y CRM para revelar el rendimiento real de adquisición, la inflación de atribución oculta y el gasto publicitario desperdiciado.**

**Sin registro. Sin instalación. Gratis en tu navegador.**

Prueba la versión de navegador gratis. Si necesitas la versión de Excel, puedes comprarla con una garantía de devolución de 30 días sin preguntas.
>
> 🌐 **Abrir en el navegador** → [*Demo HTML en vivo*](https://hyvoid.github.io/Marketing-Audit-Decision-Console/)
>
> 📥 **Descargar Excel** → Versión de GitHub / [Sitio web](https://www.theseusworkshop.com/) *(próximamente)*

---

## Lo que te ayuda a seguir

- Las conversiones publicitarias informadas frente a los resultados comerciales confirmados por el CRM.
- El coste real de adquisición de clientes después de eliminar los prospectos no válidos y no cualificados.
- Los ingresos generados por campaña basados en los registros financieros en lugar de las afirmaciones de las plataformas publicitarias.
- Las fugas de atribución ocultas entre las plataformas de marketing y la realidad operativa.
- Los términos de búsqueda que consumen presupuesto sin generar oportunidades cualificadas.
- Las cinco acciones de optimización de mayor impacto, clasificadas por valor recuperable.

---

# Por qué construí esto

Construí este marco originalmente después de encontrar repetidamente el mismo fracaso analítico en negocios de servicios locales, agencias y pequeños equipos de marketing: todos optimizaban las campañas de marketing usando números técnicamente correctos pero operativamente falsos.

Una campaña podría parecer exitosa dentro de Google Ads:

| Métrica      | Informe de la plataforma |
| ----------- | --------------- |
| Gasto       | $15.843         |
| Conversiones | 480             |
| CPA         | $33             |

El propietario del negocio concluiría:

> "Nuestro marketing está funcionando."

Sin embargo, tras conciliar esas mismas campañas con los registros del CRM y los trabajos completados, el resultado comercial real era muy diferente:

| Métrica          | Realidad auditada por CRM |
| --------------- | ------------------- |
| Prospectos cualificados | 95                  |
| Trabajos completados  | 24                  |
| CPA real        | $166                |
| ROAS real       | 3,05×               |

El problema no era un software inexacto.

El problema era un fracaso analítico: las plataformas de marketing optimizan para los eventos registrados, mientras que los negocios sobreviven con las transacciones completadas y los ingresos cobrados.

Este proyecto productiviza un marco de razonamiento repetible:

1. Empiece con el rendimiento de marketing afirmado.
2. Rastree cada conversión en los sistemas operativos.
3. Elimine los eventos descalificados, duplicados y no comerciales.
4. Recalcule la economía de adquisición usando la realidad del negocio.
5. Priorice las intervenciones por impacto financiero.

En lugar de construir otro panel de control, construí una metodología de auditoría reutilizable que responde a una pregunta más simple:

> **«¿Qué dólares de marketing produjeron realmente ingresos?»**

---

## Problemas comunes de marketing que resuelve

| Problema                      | Sin esta herramienta                                          | Con esta herramienta                                               |
| ---------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| Inflación de conversiones         | Las plataformas publicitarias informan un rendimiento artificialmente alto | Los prospectos confirmados por CRM se convierten en la verdad fundamental                  |
| Problemas ocultos de calidad de prospectos | Los equipos optimizan hacia el volumen en lugar del valor              | Los prospectos cualificados y los trabajos reservados se convierten en objetivos de optimización  |
| Cálculos de CPA engañosos  | Los cálculos de CPA incluyen conversiones falsas o duplicadas     | El CPA real utiliza resultados comerciales validados                    |
| Términos de búsqueda derrochadores        | Las fugas de presupuesto permanecen invisibles durante meses                   | Los términos de coste elevado y conversión cero se identifican automáticamente |
| Conflictos de canales SEO/PPC    | El tráfico orgánico y de pago compiten sin visibilidad        | El análisis transcanal a nivel de consulta se hace posible          |
| Errores de asignación de presupuesto     | Los cambios de gasto se basan en la intuición                        | Las decisiones de presupuesto usan el ROAS auditado y el desperdicio recuperable      |

---

## Para quién es esto

Esta herramienta está diseñada para:

- Negocios de servicios locales que ejecutan Google Ads.
- Agencias pequeñas y medianas que realizan auditorías de marketing.
- Equipos de operaciones de marketing que validan la calidad de la atribución.
- Propietarios de negocios que intentan conciliar el gasto de marketing con los ingresos reales.
- Consultores que realizan revisiones de eficiencia de adquisición.

Esta herramienta no está diseñada para:

- Plataformas de automatización de marketing empresarial.
- Sistemas de modelado de atribución multitáctil.
- Plataformas de datos de clientes (CDP).
- Organizaciones que requieren análisis en streaming en tiempo real.

**No se requiere experiencia en hojas de cálculo. Abra la versión de navegador o el libro de Excel y comience a auditar de inmediato.**

---

## Acerca de

Construyo herramientas ligeras de apoyo a la decisión para situaciones donde hay demasiadas piezas móviles para retenerlas en su cabeza simultáneamente.

La pregunta central detrás de cada herramienta es:

> **«¿Qué información debe existir en un solo lugar para tomar la próxima decisión con confianza?»**

Esta consola de auditoría de ROI de marketing es un ejemplo de ese enfoque: un marco analítico productivizado diseñado para convertir las métricas de marketing en decisiones operativas.

---

## Detalles técnicos

<details>
<summary>Para revisores técnicos, practicantes de Excel y colaboradores</summary>

---

### Arquitectura del libro de trabajo

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

| Capa       | Propósito                           |
| ----------- | --------------------------------- |
| Control     | Parámetros, umbrales, ejecución |
| Datos brutos    | Ingestión de sistemas fuente           |
| Cálculo | Conciliación de atribución        |
| Decisión    | Recomendaciones e informes     |
| Monitorización  | Pista de auditoría y diagnósticos       |

---

### Tres trampas que atrapan incluso a los equipos de marketing experimentados

#### Trampa #1 — La inflación de conversiones de la plataforma

**Decisión tomada:**

Aumentar el presupuesto porque el CPA parece bajo.

| Métrica      | Plataforma | Auditado |
| ----------- | -------- | ------- |
| Gasto       | $15.843  | $15.843 |
| Conversiones | 480      | 95      |
| CPA         | $33      | $166    |

**Por qué falla este razonamiento:**

Las plataformas publicitarias optimizan para los eventos registrados en lugar de los resultados comerciales.

**Enfoque correcto:**

Calcular la economía de adquisición solo después de la conciliación con el CRM.

**Resultado de decisión correcto:**

Reducir la asignación de presupuesto y rediseñar el seguimiento de conversiones.

<details>
<summary>Lógica de fórmula</summary>

```excel
=IFERROR((Reported_Conversions-Real_Leads)
/Reported_Conversions,0)
```

```excel
=IFERROR(Total_Spend/Matched_Real_Leads,0)
```

</details>

---

#### Trampa #2 — Optimizar palabras clave de alto volumen y baja calidad

**Decisión tomada:**

Aumentar las pujas en términos de búsqueda de alto volumen.

| Término de búsqueda          | Gasto | Prospectos | Decisión |
| -------------------- | ----- | ----- | -------- |
| emergency plumber    | $220  | 12    | Conservar     |
| free plumbing advice | $310  | 0     | Excluir  |

**Por qué falla este razonamiento:**

El volumen de clics mide la atención, no la intención comercial.

**Enfoque correcto:**

Evaluar los términos de búsqueda por la producción de prospectos cualificados.

**Resultado de decisión correcto:**

Excluir los patrones de búsqueda no comerciales.

<details>
<summary>Lógica de fórmula</summary>

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

#### Trampa #3 — Asignación de presupuesto basada en el ROAS informado

**Decisión tomada:**

Transferir presupuesto hacia campañas aparentemente exitosas.

| Campaña   | ROAS informado | ROAS real |
| ---------- | ------------- | --------- |
| Campaign A | 7,8×          | 1,4×      |
| Campaign B | 3,2×          | 4,5×      |

**Por qué falla este razonamiento:**

La atribución de ingresos se rompe cuando falta la confirmación operativa.

**Enfoque correcto:**

Calcular el ROAS a partir de los registros financieros.

**Resultado de decisión correcto:**

Reasignar el gasto hacia campañas con producción de ingresos verificada.

<details>
<summary>Lógica de fórmula</summary>

```excel
=IFERROR(
 Real_Revenue
 /
 Total_Spend,
0)
```

</details>

---

### Escenario de ejemplo

Una empresa residencial de HVAC gasta $18.400 mensuales en ocho campañas de Google Ads.

El informe inicial muestra:

| Métrica               | Valor   |
| -------------------- | ------- |
| Gasto publicitario             | $18.400 |
| Conversiones informadas | 562     |
| CPA informado         | $32,74  |

Después de importar los datos del CRM:

| Métrica          | Valor   |
| --------------- | ------- |
| Prospectos cualificados | 118     |
| Trabajos reservados     | 31      |
| Ingresos         | $57.200 |
| CPA real        | $155,93 |
| ROAS real       | 3,11×   |

Un análisis más profundo revela:

* El 67% de las conversiones informadas nunca entró en el CRM.
* Tres campañas generaron el 72% de los ingresos reales.
* Veintidós términos de búsqueda consumieron $3.480 con cero trabajos reservados.
* Un grupo de palabras clave de "free HVAC training" consumió $940 por sí solo.

Acciones recomendadas:

1. Pausar dos campañas de bajo rendimiento.
2. Añadir dieciocho palabras clave negativas.
3. Reasignar el 35% del presupuesto hacia campañas verificadas.
4. Reemplazar el seguimiento de conversiones front-end con validación del CRM.

Ahorros anuales esperados:

```
Recovered Waste:
$3,480/month × 12
=
$41,760/year
```

---

### Referencia de fórmulas

<details>
<summary>Motor de auditoría</summary>

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
<summary>Motor de palabras clave negativas</summary>

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
<summary>Motor de decisión</summary>

```excel
SORT(...)
CHOOSEROWS(...)
IFS(...)
XLOOKUP(...)
```

</details>

---

### Reglas de validación

| Campo           | Regla             | Comportamiento ante errores          |
| --------------- | ---------------- | ----------------------- |
| Período de auditoría    | Debe ser 30/60/90 | Rechazar la entrada            |
| ID de campaña     | No puede estar en blanco  | Excluir el registro          |
| ID de prospecto         | Debe ser único   | Marcar el duplicado          |
| Ingresos         | Debe ser ≥0       | Devolver error de validación |
| Trabajo reservado      | Solo 0 o 1      | Rechazar el valor            |
| Puntuación de calidad   | Entero 1–10     | Marcar la anomalía            |
| Brecha de atribución | >50%             | Generar alerta          |
| Umbral de desperdicio | Configurable     | Activar recomendación  |

</details>

---

## Otras herramientas de esta serie

* **Simulador de asignación de presupuesto de Google Ads** — optimice la asignación de presupuesto bajo incertidumbre.
* **Consola de atribución de canales de marketing** — compare las fuentes de adquisición de pago, orgánicas, de referencia y fuera de línea.
* **Analizador de fugas de ingresos del CRM** — identifique la pérdida de ingresos entre la generación de prospectos y la ejecución.
* **Panel de operaciones de servicios locales** — conecte el marketing, la programación y las operaciones de campo.

Hay más herramientas disponibles a través de los repositorios de GitHub y los paquetes de versiones.

---

## Licencia

Este proyecto está licenciado bajo la **Apache License 2.0**.

Consulte el archivo LICENSE para más detalles.
