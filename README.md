# Pikareitit
*NOTE:* [*English description at the end of this file*](##English)

Pikareitit on sovellus pääkaupunkiseudun julkisen liikenteen reittiaikatalujen reaaliaikaiseen seurantaan. Sovelluksessa on mahdollista luoda vapaasti muokattavia reittiaikataluja HSL:n pysäkkien välillä. Tarkoituksena on nopeuttaa julkisten liikennevälineiden käyttöä ennalta tutuilla reiteillä, kuten työmatkoilla.

**Pääominaisuudet**
* aikataulujen ketjutus

Seuraavan etapin aikataulut lasketaan edellisen etapin nopeimman siirtymän mukaan. Sovellus näyttää lyhyimmätkin vaihtoajat linjojen välillä, jolloin käyttäjän on mahdollista juosta seuraavaan liikennevälineeseen. *Esimerkiksi Pasilan asemalla lähijunien aikataulu mahdollistaa junien vaihtamisen juoksemalla laiturilta toiselle.*
* reitin halkaisu

Sovellukessa on mahdollista luoda reittejä, jotka jakautuvat kahteen määränpäähän, esimerkiksi perättäisiin juna-asemiin. Ominaisuus on hyödyllinen jos määränpää on kahden pysäkin välissä ja käyttäjä haluaa näyttää.
* reittien tallentaminen ja muokkaaminen

reittejä on mahdollista luoda ja tallentaa paikallisesti omalle laitteelle. 

## Asennus ja käyttö

Sovellusta voi testata paikallisesti Expo:n avulla, tai:

* lataamalla sovelluksen Google Play:sta [*ei vielä julkaistu*]()
* käyttämällä selainversiota [*ei vielä julkaistu*]()


## Käytetyt Frameworkit ja kirjastot
* kieli: Typescript
* framework: React Native
* aikataulujen hakeminen: Apolla ja GraphQL
* reittien paikallinen tallennus: PouchDB

## Ylläpitäjä
Veikko Jääskeläinen


## License
[MIT](https://choosealicense.com/licenses/mit/)


## English
Pikareitit is an mobile app for creating and viewing custom local (Helsinki region) transit schedules.
