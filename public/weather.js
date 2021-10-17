// Calling main function.
geolocationNavigator();

function geolocationNavigator() {
	navigator.geolocation.getCurrentPosition(success, error);
}

async function success(position) {
	// Taking the latitude and the longitude and weather api to find the city
	const API = '02be5f281915c6c2149b097d7a796d39';
	const longitude = position.coords.longitude;
	const latitude = position.coords.latitude;
	//  Now we will use the Geographical coordinates to find the weather condition.
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API}`;
	// Using fetch api command to fetch the data.
	const weather_response_json = await fetch(url);
	const weather_report = await weather_response_json.json();
	// Taking out the temprature from the given response. Note : The unit used by weather API is Kelvin.
	let { degree, farhenite, city, country } = conversion(weather_report);
	// Now grabing the temp element and the location element of the HTML
	let temperature = document.getElementsByClassName('temp')[0];
	let location = document.getElementsByClassName('location')[0];
	const formatted_temp = `${Math.round(degree)} &deg;C | ${Math.round(farhenite)} &deg;F`;
	temperature.innerHTML = formatted_temp;
	const formatted_location = `${city}, ${country}`;
	location.innerHTML = formatted_location;

	// After completing this temprature thing we would upload the image based on the weather condition.
	weatherCondition(weather_report);
}
function error() {
	console.log('Unable to locate your system.')
}

function conversion(locale) {
	// As the current temperature is in Kelvin. We need to convert it into Celcius and Farhenite.
	// To convert Kelvin into Celcius We need to substract 273.15.
	const degree = locale.main.temp - 273.15;
	const farhenite = (degree * (9 / 5)) + 32;
	const city = locale.name;
	const country = locale.sys.country;
	return { degree, farhenite, city, country };
}

function weatherCondition(locale) {
	// first we will fetch the condition.
	const condition_code = locale.weather[0].icon
	const condition = locale.weather[0].main
	console.log(condition_code);
	const url = `https://openweathermap.org/img/wn/${condition_code}@2x.png`;
	// Grabbing the weathercon element of the document.
	document.getElementsByClassName('weather-img')[0].src = url;
	document.getElementsByClassName('condition')[0].innerHTML = condition;

}

function display() {
	let current_time = new Date();
	const weekday = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
	const yearmonth = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
	let day = current_time.getDay();
	let month = current_time.getMonth();
	let date = current_time.getDate();
	let time = current_time.getHours() + ':' + current_time.getMinutes();
	const date_format = weekday[day] + '|' + yearmonth[month] + ' ' + date + '|' + time;
	// Doing the exact same thing using template literal.
	const formatted_date = `${weekday[day]} | ${yearmonth[month]} ${date} | ${time}`;
	// Fetching the element.
	const element = document.getElementsByClassName('date')[0];
	element.innerHTML = formatted_date;
}
// running this function the moment the document get's loaded.
display();