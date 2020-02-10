const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const locationEl = document.getElementById('location');
const forecastEl = document.getElementById('forecast');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    forecastEl.textContent = 'Loading...';

    const location = search.value;

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return forecastEl.textContent = data.error;
            };
            
            locationEl.textContent = data.location;
            forecastEl.textContent = data.forecast;
        });
    });

    search.value = '';
});