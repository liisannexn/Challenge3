// mijn eigen api token toegevoegd
mapboxgl.accessToken = 'pk.eyJ1IjoibGlpc2FubmV4biIsImEiOiJja21sdHEwbWcxZXA2MnBxa3B6dnlmZW1yIn0.-qRDEZ9CxsE5S4_x2q9r1w';

// variabele met gegevens over mijn map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/liisannexn/ckmlxung61lsm17lyexp8p929',
	// style: 'mapbox://styles/liisannexn/ckmz0q1vw2c9i17p1oi515bu6',
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
    // getAPIdataTwee(ev.result.center[0], ev.result.center[1]);
		});
	});


// Functie waarmee ik informatie vanuit de api van OPEN WEATHERMAP op de website kan zetten.
	function getAPIdata(lon, lat) {
    // De api die ik wil + de ingevoerde lon en lat aka coordinates (die de gebruiker zelf invoerd).
		var aanvraag = 'https://api.openweathermap.org/data/2.5/weather?appid=98abf897ca9d44ac264037787f4a13ea&lang=nl&lon=' +lon+ '&lat=' +lat;
    // +'&units=imperial'

    // aanvraag om mij informatie te geven vanuit de api
    // en doe dan iets met het antwoord van de aanvraag
		fetch(aanvraag).then(function(antwoord) {
        // interpeteer het alsof het een javascript object notatie is
			return antwoord.json();
		})
	// en dan gaan we iets doen met het antwoord
		.then(function(antwoord) {

			// Toon het aantal graden (het weer) op mijn website
			var weerBox = document.getElementById('graden');
			weerBox.innerHTML = (antwoord.main.temp - 273.15).toFixed(1) + ' &#730;C <br>';
      // weerBox.innerHTML = (antwoord.main.temp).toFixed(1) + ' &#730;C <br>';

	    // Toon de weersbeschrijving op mijn website
	    var beschrijvingweerBox = document.getElementById('beschrijvingweer');
	    beschrijvingweerBox.innerHTML = antwoord.weather[0].description;

  	   // Toon de plaatsnaam op mijn website
			var naamlocatieBox = document.getElementById('naamPlek');
			naamlocatieBox.innerHTML = antwoord.name;

      var windSpeedBox = document.getElementById('handig');
      windSpeedBox  = antwoord.clouds.all;
        // windSpeedBox  = antwoord.wind.speed;

            if (windSpeedBox < 50){
              // windSpeedBox  = 'je kan hier landen' + 'de windsnelheid is'+ antwoord.wind.speed;
              // console.log ('de windsnelheid is goed')
              document.getElementById("handig").innerHTML = 'Het is ' + windSpeedBox + '%' + ' bewolkt.' + ' Het is mogelijk om hier te landen.';
            } else if (windspeedBox => 51){
              document.getElementById("handig").innerHTML = 'Het is ' + windSpeedBox + '%' + ' bewolkt.' + ' Het is NIET aan te raden om op deze plek te landen.';
            }
		});
	}





// popup
	// hier komt nog een functie met het tonen of je hier wel kan landen. Onder 7 graden niet landen. boven 30 graden niet landen.
