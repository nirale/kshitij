console.log('Loading from public dir');

const search = document.querySelector('input');
const weatherForm = document.querySelector('form');
const cityName = document.querySelector('.cityName');
const discriptionText = document.querySelector('.discriptionText');
const temperature = document.querySelector('.temperature');
const windSpeed = document.querySelector('.windSpeed');
const humidity = document.querySelector('.humidity');
const pressure = document.querySelector('.pressure');
const weatherImg = document.querySelector('img');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let location = search.value;
    cityName.innerHTML = 'Loading ....';
    fetch(`http://localhost:3000/weather?address=${location}`)
        .then((response) => {
            response.json()
                .then(
                    (data) => {

                        if (data.error) {
                            console.log('Error :' + data.error);
                            cityName.innerHTML = data.error;
                            weatherImg.src = '/img/useFull-Icon/iconsUsedInSite/unknown.png'
                            discriptionText.textContent = '- -';
                            temperature.innerHTML = '- -';
                            windSpeed.innerHTML = 'Wind    : ' + '- -';
                            humidity.innerHTML = 'Humidity : ' + '- -';
                            pressure.innerHTML = 'Pressure : ' + '- -';
                        } else {
                            console.log(data.forecast.temperature);
                            console.log(data.forecast);
                            cityName.innerHTML = data.location;
                            weatherImg.src = `/img/useFull-Icon/iconsUsedInSite/${data.forecast.icon}.png`;
                            discriptionText.textContent = data.forecast.description;
                            // temperature.textContent = Math.floor(data.forecast.temperature);
                            temperature.innerHTML = Math.floor(data.forecast.temperature) + '&#176C';
                            windSpeed.innerHTML = 'Wind    : ' + data.forecast.windSpeed + ' km/hr';
                            humidity.innerHTML = 'Humidity : ' + data.forecast.humidity + ' %';
                            pressure.innerHTML = 'Pressure : ' + data.forecast.pressure + ' mb';

                        }
                        location = '';

                    }
                )
        }, (err) => {
            console.log('Error ' + err);
        });
})