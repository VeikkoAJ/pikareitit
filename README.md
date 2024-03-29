

<img src="https://github.com/VeikkoAJ/pikareitit/blob/develop/assets/adaptive-icon.png" width="200">

# Pikareitit 1.5.2
*Pikareitit is an mobile app for creating and viewing custom Helsinki region transit schedules. [Test it on your browser](https://appetize.io/app/86jbrzyyg4gd4dfz9qxgd639r8).*

Sovellus pääkaupunkiseudun julkisen liikenteen reittiaikatalujen reaaliaikaiseen seurantaan. Sovelluksella on mahdollista luoda kustomoituja reittiaikatauluja HSL:n pysäkkien välillä. Aikataulut ketjuttuvat automaattisesti, jolloin on mahdollista nähdä jo seuraavan pysäkin aikataulut, siitä ajanhetkestä, kun matka edellisessä ajoneuvossa päättyy. Sovelluksen tarkoituksena on nopeuttaa julkisten käyttöä ennalta tutuilla reiteillä, kuten työmatkoilla. Sovellusta ei kannata käyttää kertaluontoisilla reiteillä, koska aikataulujen asettamiseen menisi liian kauan.



## Pääominaisuudet

|||
|---|---|
| <img src="https://github.com/VeikkoAJ/pikareitit/blob/master/examplePics/chainedDepartures.jpg" height="500"> | **Aikataulujen ketjutus** <br><br> Seuraavan etapin aikataulut lasketaan edellisen etapin nopeimman siirtymän mukaan. Sovellus näyttää lyhyimmätkin vaihtoajat linjojen välillä, jolloin käyttäjän tietää mahdollisuudesta ehtiä juosten seuraavaan liikennevälineeseen. *Esimerkiksi Pasilan asemalla lähijunien pysähtymisaikataulu mahdollistaa junien vaihtamisen juoksemalla laiturilta toiselle.* |
| **Aikataulujen reaaliaikainen seuranta** <br><br> Aikataulut haetaan suoraan HSL:n Reititys API:sta jolloin ne päivittyvät ruuhkan ja sään mukaisesti. Aikataulujen hakuaikaa pystyy muuttamaan lennosta joko tulevaisuuten tai menneisyyteen. Aikatauluja on myös mahdollista seurata keskeltä reittiä, matkan edetessä. Yläreunassa näkyvästä kellosta on mahdollista säätää lähtöaikaa. Painamalla aikataulua pitkään, päivittyy se reitin lähtöpisteeksi. | <img src="https://github.com/VeikkoAJ/pikareitit/blob/master/examplePics/mainPicture.jpg" height="500"> |
|<img src="https://github.com/VeikkoAJ/pikareitit/blob/master/examplePics/parallel%20routes.jpg" height="250"> | **Reitin halkaisu** <br><br> Sovelluksessa on mahdollista luoda reittejä, jotka jakautuvat kahteen määränpäähän, esimerkiksi perkkäisiin juna-asemiin. Reitin halkaisu on hyödyllistä kun määränpää sijaitsee kahden aseman välissä, joista molemmista menee busseja määränpäähän. |
|  **Reittien tallentaminen ja muokkaaminen** <br><br> Reittejä on mahdollista luoda itse, sekä tallentaa niitä omalle laitteelle. Julkisen liikenteen pysäkkejä ja asemia voi hakea osoiteen tai nimen mukaan. Pysäkkien tiedot tulevat Reititys API:Sta ja osoitetiedot taas Geokoodaus API:sta. Jokaiselle etapille on myös mahdollista säätää sallitut kulkuvälineet. | <img src="https://github.com/VeikkoAJ/pikareitit/blob/master/examplePics/route%20creation.jpg" height="500">  |


  
  
## Usage

The app can be run locally with [Expo Client](https://docs.expo.io/) or by:

* ~~Downloading the App from  [Google Play]()~~ *(Full release not public yet)*
* Running it on your web browser on [Appetize.io](https://appetize.io/app/86jbrzyyg4gd4dfz9qxgd639r8)
* Downloading and installing the apk-file directly from [Expo](https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40mr_brainlet/pikareitit-7ec9def2c8d749e09115d740b7b0b5a9-signed.apk)


## Built with

* [React Native](https://reactnative.dev/)
* [React Navigation](https://reactnavigation.org/)
* [Apollo client](https://www.apollographql.com/docs/react/) - [GraphQL](https://graphql.org/) - live transit schedules from [HSL Routing API](https://digitransit.fi/en/developers/)
* [PouchDB](https://pouchdb.com/) local database for storing user created routes


## Upcoming Features and known bugs

**features**
* Individual time shifts for each timetable, to allow more customation
* Support for 3 or more parallel timetables (currently only 2 supported)
* ~~searching routes by stop name instead of street name~~, *added*
* Settings tab
* Dark theme
* Support for unusual transport modes, such as funiculars and cable cars
* Support for traversing parts of a route with bicycles

**bugs**
* ~~List of saved routes not updating after deleting a route~~
* RouteLeg shows Origin, when walking is the first transit mode
* Very high resolution image files on instructions page, raising the apk size


## Author

Veikko Jääskeläinen


## License

- Transit data is from HSL Routing API, licensed under cc by 4.0
- Address data is from HSL Geocoding API, licensed under cc by 4.0

MIT
