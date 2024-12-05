const input = document.querySelector("input");
const btn = document.getElementById('btn');
const icon = document.querySelector(".icon");
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.tempreature'); // typo fixed
const description = document.querySelector('.description'); // added missing dot

const apiKey = 'f52a863b513ee6009399a521231ea949';

btn.addEventListener('click', () => {
    const city = input.value;
    getWeather(city);
});

const getWeather = async (city) => {
    try {
        // Added `units=metric` to the API request to get the temperature in Celsius
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

        // Check if the response is successful (status code 200)
        if (!response.ok) {
            throw new Error("City not found or API error");
        }

        const data = await response.json();
        console.log(data);

        // Update weather icon
        const iconCode = data.weather[0].icon;
        icon.innerHTML = `<img src='http://openweathermap.org/img/wn/${iconCode}.png' alt='Weather icon'/>`;

        // Update city and country
        const weatherCity = data.name;
        const weatherCountry = data.sys.country;
        weather.innerHTML = `${weatherCity} , ${weatherCountry}`;

        // Update temperature and ensure it's formatted with 2 decimal places
        const weatherTemp = data.main.temp;
        const temp = weatherTemp.toFixed(2);  // Ensure 2 decimal places
        temperature.innerHTML = `${temp} °C`;

        // Update weather description
        const weatherDesc = data.weather[0].description;
        description.innerHTML = weatherDesc;
        
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weather.innerHTML = "Error retrieving weather data.";
        icon.innerHTML = "";
        temperature.innerHTML = "";
    }
};
