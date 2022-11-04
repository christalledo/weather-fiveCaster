var cityName = $('#cityInput')
var searchBtn = $('.btn')
var previousSearch = $('.storage')
var form = $('.form')
var storage = JSON.parse(localStorage.getItem('city')) || []
var firstTime = true;

for (var i = 0; i < storage.length; i++) {
    var newLi = $('<li>')

    newLi.text(storage[i])

    previousSearch.append(newLi)
}


form.on('submit', function (event) {
    event.preventDefault();
    getWeather(cityName.val());

});


function currentDay(name) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=metric&appid=8b98f6dd3341e541368c9b49320963bf")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })

        .then(function (data) {
            console.log(data)
            var cityIcon = data.weather[0].icon
            var cityTemp = data.main.temp
            var cityWind = data.wind.speed
            var cityHumidity = data.main.humidity
            var date = moment(data.dt * 1000).format("dddd, MMMM Do YYYY")



            console.log(date)

            $('#cityName1').text(name ? name : cityName.val())

            $('.dayIcon').attr("src", "http://openweathermap.org/img/wn/" + cityIcon + "@2x.png")


            $('#temp').text("Temperature: " + cityTemp)


            $('#wind').text("Wind: " + cityWind)


            $('#humidity').text("Humidity: " + cityHumidity)

            $('#day').text("Date: " + date)
        })
}


function getWeather(name) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + name + "&units=metric&appid=8b98f6dd3341e541368c9b49320963bf")
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


                $('#temp' + count).text("Temperature: " + cityTemp)


                $('#wind' + count).text("Wind: " + cityWind)


                $('#humidity' + count).text("Humidity: " + cityHumidity)

                $('#day' + count).text("Date: " + date)

                count++;


            }


            storage.push(cityName.val())
            if (!firstTime) {
                localStorage.setItem('city', JSON.stringify(storage))

                var newLi = $('<li>')

                newLi.text(cityName.val())

                previousSearch.append(newLi)
            }

            firstTime = false;
            currentDay(name);

        });
}

getWeather("Los Angeles")