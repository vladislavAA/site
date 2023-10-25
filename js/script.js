const checkPressure = (pressureValue) => {
    if (pressureValue >= 770) {
        return 'высокое';
    } else if (pressureValue <= 750) {
        return 'низкое';
    } else {
        return 'нормальное';
    }
}

const receptionPrecipitation = (precipitationValue) => {
    if (!precipitationValue) return precipitationValue;

    return precipitationValue[0].toUpperCase() + precipitationValue.slice(1);
}

const getCardinalDirection = (angle) => {
    const directions = ['северный', 'северо-восточный', 'восточный', 'юго-восточный', 'южный', 'юго-западный', 'западный', 'северо-западный'];
    return directions[Math.round(angle / 45) % 8];
}


//------------- Кнопка темы ----------------
localStorage.setItem('theme', 0);

const buttonTheme = document.querySelector('.main-section__btn-theme');

buttonTheme.addEventListener('click', () => {
    if (localStorage.getItem('theme') == 0) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 1);
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 0);
    }
});
//------------- Время ----------------
const time = () => {
    let date = new Date(),
        hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
        minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
        document.querySelector('.left-block__timer').innerHTML = hours + ':' + minutes;
}

setInterval(time, 1000);
time();
//------------- API текущая погода ----------------
const key = '13249f386f20c9987a4ae351d0a81873';
let url = `https://api.openweathermap.org/data/2.5/weather?id=498698&units=metric&lang=ru&appid=${key}`;
let response = await fetch(url);

let commits = await response.json();

document.querySelector('.left-block__degree-value').innerHTML = Math.round(commits.main.temp);
document.querySelector('.right-block__text-temp-value').innerHTML = Math.round(commits.main.temp);
document.querySelector('.right-block__text-temp-feels-like-value').innerHTML = Math.round(commits.main.feels_like);
document.querySelector('.right-block__text-pressure-value').innerHTML = Math.round(commits.main.pressure / 1.333);
document.querySelector('.right-block__text-pressure-property').innerHTML = checkPressure(Math.round(commits.main.pressure / 1.333));
document.querySelector('.right-block__text-precipitation-value').innerHTML = receptionPrecipitation(commits.weather[0].description);
document.querySelector('.right-block__text-wind-value').innerHTML = Math.round(commits.wind.speed);
document.querySelector('.right-block__text-wind-direction').innerHTML = getCardinalDirection(Math.round(commits.wind.deg));


console.log(commits);
console.log(Math.round(commits.main.temp_max));

