

<img src="https://github.com/VeikkoAJ/pikareitit/blob/develop/assets/adaptive-icon.png" width="200">

# Pikareitit 1.5.0
*Pikareitit is an mobile app for creating and viewing custom local (Helsinki region) transit schedules.*

Sovellus pääkaupunkiseudun julkisen liikenteen reittiaikatalujen reaaliaikaiseen seurantaan. Sovelluksella on mahdollista luoda kustomoituja reittiaikatauluja HSL:n pysäkkien välillä. Aikataulut ketjuttuvat automaattisesti, jolloin on mahdollista nähdä jo seuraavan pysäkin aikataulut, ennen sinne pääsyä. Sovelluksen tarkoituksena on nopeuttaa julkisten käyttöä ennalta tutuilla reiteillä, kuten työmatkoilla. Sovellusta ei kannata käyttää ennalta tuntemattomilla reiteillä, koska aikataulujen asettamiseen menisi liian kauan.



## Pääominaisuudet

* **aikataulujen ketjutus**
<img src="https://github.com/VeikkoAJ/pikareitit/blob/master/examplePics/realtimeRouting.jpg" height="600">

Seuraavan etapin aikataulut lasketaan edellisen etapin nopeimman siirtymän mukaan. Sovellus näyttää lyhyimmätkin vaihtoajat linjojen välillä, jolloin käyttäjän on mahdollista juosta seuraavaan liikennevälineeseen. *Esimerkiksi Pasilan asemalla lähijunien aikataulu mahdollistaa junien vaihtamisen juoksemalla laiturilta toiselle.*


* **reitin halkaisu**

<img src="https://github.com/VeikkoAJ/pikareitit/blob/master/examplePics/parallel%20routes.jpg" height="600">

Sovellukessa on mahdollista luoda reittejä, jotka jakautuvat kahteen määränpäähän, esimerkiksi perkkäisiin juna-asemiin.


* **reittien tallentaminen ja muokkaaminen**

<img src="https://github.com/VeikkoAJ/pikareitit/blob/master/examplePics/route%20creation.jpg" height="600"> 
                                                                                                       
Reittejä on mahdollista luoda itse, sekä tallentaa niitä omalle laitteelle. 



## Usage

The app can be run locally with [Expo Client](https://docs.expo.io/) or by:

* Downloading the App from Google Play [*not yet released*]()



## Built with

* [React Native](https://reactnative.dev/)
* [React Navigation](https://reactnavigation.org/)
* [Apollo client](https://www.apollographql.com/docs/react/) - [GraphQL](https://graphql.org/) - live transit schedules from HSL Routing API
* [PouchDB](https://pouchdb.com/) local database for storing user created routes




## Upcoming Features and known bugs

**features**
* Individual time shifts for each timetable
* support for 3 or more parallel timetables
* ~~searching routes by stop name instead of street name~~
* settings tab and dark theme
**bugs**
* list of saved routes not updating after deleting a route
* use lower resolution image files on instructions page 


## Author

Veikko Jääskeläinen




## License


- Transit data is from HSL Routing API, licensed under cc by 4.0
- Address data is from HSL Geocoding API, licensed under cc by 4.0

MIT
