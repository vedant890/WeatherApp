document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '7cbd913fdbcda6cde1295dd000a6aa9d';
    const searchButton = document.querySelector('.button');
    const searchInput = document.querySelector('input');
    const tempElement = document.querySelector('.temp');
    const cityElement = document.querySelector('.cityname');
    const humidityElement = document.querySelector('.humidity');
    const windElement = document.querySelector('.wind');

    searchButton.addEventListener('click', () => {
        const city = searchInput.value;
        if (city) {
            fetchWeather(city);
        }
    });

    async function fetchWeather(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            if (data.cod === 200) {
                updateWeather(data);
            } else {
                alert('City not found');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    function updateWeather(data) {
        const { name, main, wind } = data;
        tempElement.innerHTML =`${Math.round(main.temp)}°C`;
        cityElement.textContent = name;
        humidityElement.textContent = main.humidity;
        windElement.textContent = `${wind.speed} km/hr`;
    }
});
