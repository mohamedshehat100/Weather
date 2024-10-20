
// search input 
var searchInput = document.getElementById('search');

// Today Data 

var todayName = document.getElementById('today_date_day_name');
var todayNumber = document.getElementById('today_date_day_number');
var todayMonth = document.getElementById('today_date_month');
var todayLocation = document.getElementById('today_location');
var todayTemp = document.getElementById('today_temp');
var todayImg = document.getElementById('today_condition_img');
var todayText = document.getElementById('today_condition_text');
var humidity = document.getElementById('humidity');
var wind = document.getElementById('wind');
var windDirection = document.getElementById('wind_direction');

// Next Today

var nextTodayName = document.getElementsByClassName('next_day_name');
var nextImg = document.getElementsByClassName('next_condition_img');
var nextMaxTemp = document.getElementsByClassName('next_max_temp');
var nextMinTemp = document.getElementsByClassName('next_min_temp');
var nextText = document.getElementsByClassName('next_condition_text');

// get weather Data

async function getData(cityName="Alexandria"){
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3ea36a4f9ae7469ba19171729232110&q=${cityName}&days=3`);
    let weatherData= await weatherResponse.json();
    
    if(!weatherData.error) {
        displayTodayData(weatherData);
        displayNextData(weatherData);
  
}
}

getData();

// get weather Data Today
function displayTodayData(data){

     let todayDate = new Date();
     todayName.innerHTML = todayDate.toLocaleDateString('en-US', {weekday:'long'}); // name day
     todayNumber.innerHTML = todayDate.getDate(); // number day
     todayMonth.innerHTML = todayDate.toLocaleDateString('en-US', {month:'long'}) // name month

     todayLocation.innerHTML = data.location.name;
     todayTemp.innerHTML = data.current.temp_c;
     todayImg.setAttribute('src',data.current.condition.icon)
     todayText.innerHTML = data.current.condition.text;
     humidity.innerHTML = data.current.humidity+"%";
     wind.innerHTML = data.current.wind_kph+"km/h";
     windDirection.innerHTML = data.current.wind_dir;

}

// get weather Data Next Today
function displayNextData(data) {

    let forecastData = data.forecast.forecastday;

    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(forecastData[i+1].date);
        nextTodayName[i].innerHTML = nextDate.toLocaleDateString('en-US', {weekday:'long'});
        nextImg[i].setAttribute('src', forecastData[i+1].day.condition.icon);
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c;
        nextText[i].innerHTML = forecastData[i+1].day.condition.text;
    }
    
}


searchInput.addEventListener('input', function(){
    getData(searchInput.value)
})



























































