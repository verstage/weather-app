window.addEventListener("load",() => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let icon = document.querySelector(".icon");
    const temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".degree-section span");

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}http://api.weatherstack.com/current?access_key=bb1309cd2d57e63bd897b179a7e54850&query=${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, weather_descriptions, weather_icons} = data.current;

                    //SET DOM ELEMENTS from THE API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = weather_descriptions[0];
                    locationTimezone.textContent = data.location.timezone_id;
                    icon.setAttribute("src",weather_icons[0]);
                    temperatureSection.addEventListener("click", () => {
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = temperature;

                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = ((temperature * (9/5)) + 32);
                        }
                    });
                });
        });

    } else {
        h1.textContent = "Hey this browser don't allowed to access your geolocation"
    }

    


});