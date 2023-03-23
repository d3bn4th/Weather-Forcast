let currentWeather = {
    weather_apiKey: "b5af752f9ec804ace97776aa558f0ef3",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.weather_apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    // Manipulates the DOM to display weather data
    displayWeather: function(data) {
        console.log(data);
        const {name} = data;
        const {temp} = data.main;
        const {temp_min, temp_max} = data.main;
        const {humidity} = data.main;
        const {speed} = data.wind;
        const {visibility} = data;
        const {description,icon} = data.weather[0];

        // Manipulating the HTML
        // element.innerHTML = `<p>${data}</p>`;
        document.querySelector(".city").innerHTML = name.toUpperCase(2);
        document.querySelector(".temp").innerHTML = Math.round(temp) + " °C";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".humidity").innerHTML = `<span style="color:#1e2390; font-size:1.2em">Humidity : </span> ${humidity}%`;
        document.querySelector(".wind").innerHTML = `<span style="color:#1e2390; font-size:1.2em">Wind : </span> ${speed} Km/hr`;
        document.querySelector(".visibility").innerHTML = `<span style="color:#1e2390; font-size:1.2em">Visibility : </span> ${visibility/1000} Km`;
        document.querySelector(".temp_min").innerHTML= `<span style="color:#1e2390; font-size:1.2em">Min Temp. : </span> ${temp_min} °C`;
        document.querySelector(".temp_max").innerHTML= `<span style="color:#1e2390; font-size:1.2em">Max Temp. : </span> ${temp_min} °C`;
    },
    
    // 5 Day Forcast
    // API used : https://developer.accuweather.com/apis;
    forcast_apiKey: "vTAl4hwQXr17n1jDgP4rzEFGfjDR7mz1",
    fetchForcast: function(city) {
        var location_key;
        const loc_key_url = "https://dataservice.accuweather.com/locations/v1/cities/search?apikey=vTAl4hwQXr17n1jDgP4rzEFGfjDR7mz1&q=" + city;
        fetch(loc_key_url).then((res) => res.json()).then( (data) => 
        fetch("https://dataservice.accuweather.com/forecasts/v1/daily/5day/"+data[0].Key +"?apikey=vTAl4hwQXr17n1jDgP4rzEFGfjDR7mz1&metric=true")
        .then((res) => res.json()).then((data) => this.displayForcast(data)));
    },    

    displayForcast : function(data) {
        const {DailyForecasts} = data;
        console.log(DailyForecasts);
        // 1 DATE
        const allftop = document.querySelectorAll(".date");
        let i = 0;
        for (const element of allftop) {
            const d = DailyForecasts[i].Date;
            const date = new Date(d);
            const f = new Intl.DateTimeFormat("en-us", {
                dateStyle: "full"
            });
            element.innerHTML = f.format(date);
            i++;
        }
        // 2 MIN_TEMP / MAX_TEMP
        const allftemp = document.querySelectorAll(".ftemp");
        i = 0;
        for (const element of allftemp) {
            const {Date} = DailyForecasts[i];
            const temp_max = DailyForecasts[i].Temperature.Maximum.Value; 
            const temp_min = DailyForecasts[i].Temperature.Minimum.Value; 
            element.innerHTML = Math.round(temp_min)+" °C"+" / "+Math.round(temp_max)+" °C";
            i++;
        }

        // 3 - DAY ICON
        const allfdayicon = document.querySelectorAll(".fday-icon");
        i=0;
        for(const element of allfdayicon) {
            const {Icon} = DailyForecasts[i].Day;
            if(Icon < 10){
                element.src = "https://developer.accuweather.com/sites/default/files/0"+Icon+"-s.png";
            }
            else {
                element.src = "https://developer.accuweather.com/sites/default/files/"+Icon+"-s.png";
            }
            i++;
        }

        // 4 - NIGHT ICON
        const allfnighticon = document.querySelectorAll(".fnight-icon");
        i=0;
        for(const element of allfnighticon) {
            const {Icon} = DailyForecasts[i].Night;
            if(Icon < 10){
                // element.src = "https://developer.accuweather.com/sites/default/files/0"+Icon+"-s.png";
                element.src = `https://developer.accuweather.com/sites/default/files/0 ${Icon}-s.png`;
            }
            else {
                // element.src = "https://developer.accuweather.com/sites/default/files/"+Icon+"-s.png";
                element.src = `https://developer.accuweather.com/sites/default/files/${Icon}-s.png`;
            }
            i++;
        }
        
        // 5 - DAY DESCRIPTION
        const alldaydescription = document.querySelectorAll(".fday-description");
        i = 0;
        for(const element of alldaydescription) {
            const{IconPhrase} = DailyForecasts[i].Day;
            element.innerHTML = `<p style="font-size:1.3em">${IconPhrase}</p>`;
            i++;
        }
        // 6 - NIGHT DESCRIPTION
        const allnightdescription = document.querySelectorAll(".fnight-description");
        i = 0;
        for(const element of allnightdescription) {
            const{IconPhrase} = DailyForecasts[i].Night;
            element.innerHTML = `<p style="font-size:1.3em">${IconPhrase}</p>`;
            i++;
        }
    },

    // fetches city name fromm search bar and calls fetchWeather
    search: function() {
        let city = document.querySelector(".search-input").value;
        this.fetchWeather(city);
        this.fetchForcast(city);
        console.log(city);
    }
}

document.querySelector(".search-input").addEventListener("keyup", function(event) {
    if(event.key == "Enter"){
        currentWeather.search();
    } 
})
document.querySelector(".search-button").addEventListener("click", function() {
    currentWeather.search();
})


// Your Location Weather
// Gets user location, used fetchAPI with lat and lon and calls displayWeather

function getUserLocationWeather() {
    weather_apiKey: "b5af752f9ec804ace97776aa558f0ef3"
    function success(data) {
        const url =  "https://api.openweathermap.org/data/2.5/weather?lat="
        +data.coords.latitude+
        "&lon="
        +data.coords.longitude+
        "&units=metric&appid=b5af752f9ec804ace97776aa558f0ef3";

        fetch(url).then((res) => res.json()).then(data => currentWeather.displayWeather(data));
    }

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success,console.error);
    }
    else{
        currentWeather.fetchWeather("Delhi");
    }
}

document.querySelector(".location-button").addEventListener("click", function() {
    getUserLocationWeather();
})


// Initial screen 
currentWeather.fetchWeather("Delhi");
currentWeather.fetchForcast("Delhi");

