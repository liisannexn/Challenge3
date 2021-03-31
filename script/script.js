//functie om het weer in een stad te krijgen
function getAPIdata() {
	var city = document.getElementById('city').value;
	var request = 'https://api.openweathermap.org/data/2.5/weather?appid=98abf897ca9d44ac264037787f4a13ea&q=' + city;

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

	});
}
document.getElementById('cityButton').onclick = function(){
	getAPIdata();
};

// het tonen van de stad die ingevuld wordt

// hier komt nog een functie met het tonen of je hier wel kan landen. Onder 7 graden niet landen. boven 30 graden niet landen.

// api token
mapboxgl.accessToken = 'pk.eyJ1IjoibGlpc2FubmV4biIsImEiOiJja21sdHEwbWcxZXA2MnBxa3B6dnlmZW1yIn0.-qRDEZ9CxsE5S4_x2q9r1w';

// variabele met gegevens over de map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/liisannexn/ckmlxung61lsm17lyexp8p929',
  center: [4.215827, 52.012234],
  zoom: 13,
  pitch: 56,
  bearing: -18,
});
// het toevoegen van een bedieningspaneel
map.addControl(new mapboxgl.NavigationControl());
