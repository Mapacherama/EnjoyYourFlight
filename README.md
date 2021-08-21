# Enjoy Your Flight - Team 7

Marc, Jerôme, Tico, Kenneth, Arren en Noah

## Definition of Done

Hier specificeren we de voorwaarden van een kaart die naar done verplaatst mag worden.

|ID| Definitie |
|--|--|
| 0x00 | De gemaakte functionaliteit voldoet aan de opgestelde requirements die staan beschreven in de user story. |
| 0x01 | De code is gereviewed, er is minimaal door een ander teamlid naar de code gekeken en de programmeercode is van de benodigde feedback voorzien. |
| 0x02 | Er zijn voldoende unit tests waar de code aan voldoet (werkt de code?). |
| 0x03 | De bijbehorende systeem documentatie is bijgewerkt. |
| 0x04 | De code voldoet aan de coding standards. |
| 0x05 | Alle code is gepushed naar GitLab. |

<br>

### Coding Standards

| ID | Definitie |
|--|--|
| 0x00 | De code is in ES6 geschreven. |
| 0x01 | Callbacks zijn aparte functies; dus niet:<br> `asyncFunctie((data)->{console.log(data)});` <br>Maar:<br>`asyncFunctie(callback);`|
| 0x02 | De back-end is in Node.js geschreven, en eventueel Python voor access point functies. |
| 0x03 | De code is geschreven in de code conventies opgesteld door de Hogeschool van Amsterdam.¹ |
| 0x04 | Elke functie Jsdoc (Javadoc) erboven. Met `@author` tag erbij. |
| 0x05 | Alle code moet gepusht worden naar GitLab. |
| 0x06 | Functienamen en variabelen zijn **camelCase**. |
| 0x07 | Classes zijn **PascalCase** |
| 0x08 | Constanten zijn **MACRO_CASE**. |
| 0x09 | Iedereen maakt gebruik van een universele stylesheet. |
| 0x0A | CSS staat los van HTML; in een eigen bestand. |
| 0x0B | JS staat los van HTML; in een eigen bestand. |

1: [Code Conventions](https://dlo.mijnhva.nl/d2l/le/content/41278/viewContent/193906/View)