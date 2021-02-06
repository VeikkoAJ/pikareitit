

<img src="https://github.com/VeikkoAJ/pikareitit/blob/develop/assets/adaptive-icon.png" width="200">

# Pikareitit 1.5.0
*Pikareitit is an mobile app for creating and viewing custom local (Helsinki region) transit schedules.*

Sovellus pääkaupunkiseudun julkisen liikenteen reittiaikatalujen reaaliaikaiseen seurantaan. Sovelluksella on mahdollista luoda kustomoituja reittiaikatauluja HSL:n pysäkkien välillä. Aikataulut ketjuttuvat automaattisesti, jolloin on mahdollista nähdä jo seuraavan pysäkin aikataulut, ennen sinne pääsyä. Sovelluksen tarkoituksena on nopeuttaa julkisten käyttöä ennalta tutuilla reiteillä, kuten työmatkoilla. Sovellusta ei kannata käyttää ennalta tuntemattomilla reiteillä, koska aikataulujen asettamiseen menisi liian kauan.



## Pääominaisuudet

* **Aikataulujen ketjutus**
<img src="https://github.com/VeikkoAJ/pikareitit/blob/master/examplePics/route%20chaining.jpg" width="400">

Seuraavan etapin aikataulut lasketaan edellisen etapin nopeimman siirtymän mukaan. Sovellus näyttää lyhyimmätkin vaihtoajat linjojen välillä, jolloin käyttäjän on mahdollista juosta seuraavaan liikennevälineeseen. *Esimerkiksi Pasilan asemalla lähijunien aikataulu mahdollistaa junien vaihtamisen juoksemalla laiturilta toiselle.*

* **Aikataulujen live seuranta**
<img src="https://github.com/VeikkoAJ/pikareitit/blob/master/examplePics/realtimeRouting.jpg" width="400">

Aikataulun hakuaikaa pystyy muuttamaan lennosta joko tulevaisuuten tai menneisyyteen. Aikatauluja on myös mahdollista hakea matkan välistä, matkan edetessä. Yläreunassa näkyvästä kellosta on mahdollista säätää lähtöaikaa. Painamalla aikataulua pitkään, päivittyy se reitin lähtöpisteeksi.


* **Reitin halkaisu**

<img src="https://github.com/VeikkoAJ/pikareitit/blob/master/examplePics/parallel%20routes.jpg" width="400">

Sovellukessa on mahdollista luoda reittejä, jotka jakautuvat kahteen määränpäähän, esimerkiksi perkkäisiin juna-asemiin.


* **Reittien tallentaminen ja muokkaaminen**

<img src="https://github.com/VeikkoAJ/pikareitit/blob/master/examplePics/route%20creation.jpg" width="400"> 
                                                                                                       
Reittejä on mahdollista luoda itse, sekä tallentaa niitä omalle laitteelle. Pääkaupunkiseudun pysäkkejä ja asemia voi hakea osoiteen tai suoraan nimen mukaan. Jokaiselle etapille on mahdollista säätää sallitut kulkuvälineet. 



## Usage

The app can be run locally with [Expo Client](https://docs.expo.io/) or by:

* ~~Downloading the App from  [Google Play]()~~ *(Full release not public yet)*
* Running it on your web browser on [Appetize.io](https://appetize.io/app/86jbrzyyg4gd4dfz9qxgd639r8)
* Downloading and installing the apk-file directly from [Expo](https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40mr_brainlet/pikareitit-8289d041b29844979bdc678657465a22-signed.apk)


## Built with

* [React Native](https://reactnative.dev/)
* [React Navigation](https://reactnavigation.org/)
* [Apollo client](https://www.apollographql.com/docs/react/) - [GraphQL](https://graphql.org/) - live transit schedules from HSL Routing API
* [PouchDB](https://pouchdb.com/) local database for storing user created routes




## Upcoming Features and known bugs

**features**
* Individual time shifts for each timetable, to allow more customation
* Support for 3 or more parallel timetables (currently only 2 supported)
* ~~searching routes by stop name instead of street name~~
* Settings tab
* Dark theme
* Support for unusual transport modes, such as funiculars and cable cars
* Support for traversing parts of a route with bicycles

**bugs**
* List of saved routes not updating after deleting a route
* Too high resolution image files on instructions page, raising the apk size


## Author

Veikko Jääskeläinen




## License


- Transit data is from HSL Routing API, licensed under cc by 4.0
- Address data is from HSL Geocoding API, licensed under cc by 4.0

MIT
