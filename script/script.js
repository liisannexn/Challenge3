// mijn eigen api token
mapboxgl.accessToken = 'pk.eyJ1IjoibGlpc2FubmV4biIsImEiOiJja21sdHEwbWcxZXA2MnBxa3B6dnlmZW1yIn0.-qRDEZ9CxsE5S4_x2q9r1w';

// variabele met gegevens over de map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/liisannexn/ckmlxung61lsm17lyexp8p929',
	// style: 'mapbox://styles/liisannexn/ckmz0q1vw2c9i17p1oi515bu6',
  center: [4.215827, 52.012234],
  zoom: 13,
  pitch: 56,
  bearing: -18,
});
// het toevoegen van een bedieningspaneel
map.addControl(new mapboxgl.NavigationControl());

//geocoder in een losse var
var geocoder = new MapboxGeocoder({
	accessToken: mapboxgl.accessToken,
	mapboxgl: mapboxgl
})

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));


// // het toeveogen van een zoekbalk
// map.addControl( geocoder, 'top-left');

map.on('load', function () {
	// Listen for the `geocoder.input` event that is triggered when a user
	// makes a selection
	geocoder.on('result', function (ev) {
		console.log(ev.result.center);
		//document.getElementById('coordinaten').innerHTML = ev.result.center[0]+ '-' + ev.result.center[1];
		getAPIdata(ev.result.center[0], ev.result.center[1]);
		});
	});


	//functie om het weer in een stad te zien
	function getAPIdata(ingevoerdeLon, ingevoerdeLat) {
		// var city = document.getElementById('city').value;
		var request = 'https://api.openweathermap.org/data/2.5/weather?appid=98abf897ca9d44ac264037787f4a13ea&lang=nl&lon=' +ingevoerdeLon+ '&lat=' +ingevoerdeLat;
		// var request = 'https://api.openweathermap.org/data/2.5/weather?appid=98abf897ca9d44ac264037787f4a13ea&q=' + city;

		fetch(request).then(function(response) {

			return response.json();
		})

		.then(function(response) {
			//het aantal graden krijgen
			console.log(response.main.temp - 273.15);

			// hiermee kan je het weer tonen op de website
			var weatherBox = document.getElementById('graden');
			weatherBox.innerHTML = (response.main.temp - 273.15).toFixed(1) + ' &#730;C <br>';

	    //hiermee kan je de beschrijving van het weer tonen op mijn website
	    var weatherBox = document.getElementById('beschrijvingweer');
	    weatherBox.innerHTML = response.weather[0].description;

			//het tonen van de plaatsnaam op mijn website
			var weatherBox = document.getElementById('naamPlek');
			weatherBox.innerHTML = response.name;

		});
	}


	// hier komt nog een functie met het tonen of je hier wel kan landen. Onder 7 graden niet landen. boven 30 graden niet landen.




//
// random code voor losse zoekbalk
