$(document).ready(function () {

    var lat;
    var long;

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {

            lat = position.coords.latitude;
            long = position.coords.longitude;

            var api = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + long + '';

            $.getJSON(api, function (res) {

                var celsius = res.main.temp;
                var farenheit = (celsius * 1.8) + 32;

                var location = res.name;


                $('.weather-location').html(location);
                $('.temp').html(Math.floor(celsius));
                $('.weather-description').html(res.weather[0].description);
                $('.weatherType').attr('id', res.weather[0].main);
                $('.row2').on('click', function () {
                    if ($('.temp').html() == (Math.floor(celsius))) {
                        $('.temp').html(Math.floor(farenheit));
                        $('.temp-type').html('°F');

                    } else {
                        $('.temp').html(Math.floor(celsius));
                        $('.temp-type').html('°C');
                    }
                });


                //SETTING UP THE ICON 
                var icons = new Skycons({
                    "color": "white"
                });

                icons.set("Clear-day", Skycons.CLEAR_DAY);
                icons.set("Clear-night", Skycons.CLEAR_NIGHT);
                icons.set("Partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
                icons.set("Partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
                icons.set("Clouds", Skycons.CLOUDY);
                icons.set("Rain", Skycons.RAIN);
                icons.set("Sleet", Skycons.SLEET);
                icons.set("Snow", Skycons.SNOW);
                icons.set("Wind", Skycons.WIND);
                icons.set("Fog", Skycons.FOG);
                icons.play();

            });
        });
    }
});

const getLocation = ()=>{
    if(!navigator.geolocation){
        return;
    }

    return new Promise(resolve=>{
        navigator.geolocation.getCurrentPosition(loc=>{
            const lat = loc.coords.latitude;
            const long = loc.coords.longitude;
            
            resolve({lat, long});
        });
    });
};

const getWeatherData = (lat, long)=>{
    return new Promise(resolve=>{
        const req = new XMLHttpRequest;
        const url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;

        req.onreadystatechange = ()=>{
            if(req.readyState == 4 && req.status == 200){
                const data = JSON.parse(req.responseText);
                resolve(data);
            }
        };

        req.open("GET", url);
        req.send(null);
    });
}

window.onload = async ()=>{
    const loc = await getLocation();
    const data = await getWeatherData(loc.lat, loc.long);
    const weather = new Object;

    weather.temp = data.main.temp;
    weather.temp_max = data.main.temp_max;
    weather.temp_min = data.main.temp_min;
    weather.pressure = data.main.pressure;
    weather.humidity = data.main.humidity;
    weather.cloud = data.clouds.all;
    weather.city = data.name;
    weather.country = data.sys.country;
    weather.sunrise = data.sys.sunrise;
    weather.sunset = data.sys.sunset;
    weather.description = data.weather[0].description;
    weather.wind_speedd = data.wind.speed;
    weather.wind_deg = data.wind.deg;
    weather.lat = data.coord.lat;
    weather.long = data.coord.lon;
    
    
    console.log(data);
    console.log(weather);
};
