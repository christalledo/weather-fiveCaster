var cityName = $('#cityInput')
var searchBtn = $('.btn')



searchBtn.on('click', function (event) {
    event.preventDefault();

    fetch("https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=8b98f6dd3341e541368c9b49320963bf")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        // for loop to get 6 days forecast  
        .then(function (data) {
            var count = 1;
            console.log(data);
            for (i = 0; i < 6; i++) {
                var cityIcon = data.weather.icon
                var cityTemp = data.main.temp
                var cityWind = data.wind.speed
                var cityHumidity = data.main.humidity


                $('.dayIcon' + count).text(cityIcon)


                $('#temp' + count).text(cityTemp)


                $('#wind' + count).text(cityWind)


                $('#humidity' + count).text(cityHumidity)

                count++;
            }

        });
});



