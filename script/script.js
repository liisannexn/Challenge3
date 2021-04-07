// mijn eigen api token toegevoegd
mapboxgl.accessToken = 'pk.eyJ1IjoibGlpc2FubmV4biIsImEiOiJja21sdHEwbWcxZXA2MnBxa3B6dnlmZW1yIn0.-qRDEZ9CxsE5S4_x2q9r1w';

// variabele met gegevens over mijn map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/liisannexn/ckmlxung61lsm17lyexp8p929',
  center: [4.215827, 52.012234],
  zoom: 13,
  pitch: 56,
  bearing: -18,
});

// het toevoegen van een bedieningspaneel aan de map
map.addControl(new mapboxgl.NavigationControl());

//het toevoegen van een zoekbalk door deze in een losse varte zetten
var geocoder = new MapboxGeocoder({
	accessToken: mapboxgl.accessToken,
	mapboxgl: mapboxgl
})

// zet de geocoder op een plaats naar keuze op de pagina.
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));


// code waarmee ik de api's aan elkaar wil koppelen
// wanneer je een plaats intypt worden alle gegevens van die plaats
// op de website weergegeven
map.on('load', function () {

	geocoder.on('result', function (ev) {
		// console.log(ev.result.center);
		getAPIdata(ev.result.center[0], ev.result.center[1]);
    getAPIdataTwee(ev.result.center[0], ev.result.center[1]);
		});
	});


// Functie waarmee ik informatie vanuit de api van OPEN WEATHERMAP op de website kan zetten.
	function getAPIdata(lon, lat) {
    // De api die ik wil + de ingevoerde lon en lat aka coordinates (die de gebruiker zelf invoerd).
		var aanvraag = 'https://api.openweathermap.org/data/2.5/weather?appid=98abf897ca9d44ac264037787f4a13ea&lang=nl&lon=' +lon+ '&lat=' +lat;

    // aanvraag om mij informatie te geven vanuit de api
    // en doe dan iets met het antwoord van de aanvraag
		fetch(aanvraag).then(function(antwoord) {
        // interpeteer het alsof het een javascript object notatie is
			return antwoord.json();
		})
	// en dan gaan we iets doen met het antwoord
		.then(function(antwoord) {

      // Toon de plaatsnaam op mijn website
     var naamlocatieBox = document.getElementById('naamPlek');
     naamlocatieBox.innerHTML = antwoord.name;

			// Toon het aantal graden (het weer) op mijn website
			var weerBox = document.getElementById('graden');
			weerBox.innerHTML = (antwoord.main.temp - 273.15).toFixed(1) + ' &#730;C <br>';

      //kleuren bij elke temperatuur. tot 8 graden blauw
      // vanaf 8.1 tot 14 graden oranje en vanaf 14.1 graden rood
      if (antwoord.main.temp - 273.15.toFixed(1) < 8){
        //blauw = het is koud
         document.getElementById('graden').style.color = '#0065DE';
      }
      else if (antwoord.main.temp - 273.15.toFixed(1) >= 8.1 && antwoord.main.temp - 273.15.toFixed(1) <= 14){
        //oranje = het is niet te koud en niet te warm
         document.getElementById('graden').style.color = '#F4750F';
      }
      else if (antwoord.main.temp - 273.15.toFixed(1) >= 14.1){
        //rood = het is warm
         document.getElementById('graden').style.color = '#E82A05';
      }
		});
	}


  //Functie waarmee ik informatie vanuit de api van WEERLIVE op de website kan zetten.
  	function getAPIdataTwee(lon, lat) {
      var aanvraag= 'https://weerlive.nl/api/json-data-10min.php?key=562fb057ad&locatie='+lat+','+lon;
      // aanvraag om mij informatie te geven vanuit de api
      // en doe dan iets met het antwoord van de aanvraag
  		fetch(aanvraag).then(function(antwoord) {
          // interpeteer het alsof het een javascript object notatie is
  			return antwoord.json();
  		})
  	// en dan gaan we iets doen met het antwoord
  		.then(function(antwoord) {

        // Toon de weersbeschrijving op mijn website
        var beschrijvingweerBox = document.getElementById('beschrijvingweer');
        beschrijvingweerBox.innerHTML = antwoord.liveweer[0].samenv;

        // variabele waarmee ik de wind in km/h weer kan geven op de website
        var windSpeedBox = document.getElementById('handig');
        windSpeedBox  = antwoord.liveweer[0].windkmh;

          //weergeven of je hier kan landen
        if (windSpeedBox < 26){
          document.getElementById("handig").innerHTML = 'De windkracht is ' + windSpeedBox + ' km/h.' + ' Het is mogelijk om hier te landen.';
        } else if (windspeedBox => 27){
          document.getElementById("handig").innerHTML = 'De windkracht is ' + windSpeedBox + ' km/h.' + ' De wind is te hard. Het is NIET aan te raden om op deze plek te landen.';
        }
      });
    }
//popup
