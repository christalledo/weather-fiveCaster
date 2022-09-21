var cityName = $('#cityInput')
var searchBtn = $('.btn')



searchBtn.on('click', function (event) {
    event.preventDefault();
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName.val() + "&units=metric&appid=8b98f6dd3341e541368c9b49320963bf")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        // for loop to get 6 days forecast  
        .then(function (data) {
            var count = 1;
            console.log(data);
            for (i = 0; i < 40; i += 8) {
                var cityIcon = data.list[i].weather[0].icon
                var cityTemp = data.list[i].main.temp
                var cityWind = data.list[i].wind.speed
                var cityHumidity = data.list[i].main.humidity
                var date = moment(data.list[i].dt * 1000).format("dddd, MMMM Do YYYY")



                console.log(date)

                $('.dayIcon' + count).attr("src", "http://openweathermap.org/img/wn/" + cityIcon + "@2x.png")


                $('#temp' + count).text(cityTemp)


                $('#wind' + count).text(cityWind)


                $('#humidity' + count).text(cityHumidity)

                $('#day' + count).text(date)

                count++;

                // var set = setItem.localStorage('')
            }

        });
});



