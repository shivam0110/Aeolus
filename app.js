var iconimg = document.getElementById('icon');

//iconimg.src = 'http://openweathermap.org/img/wn/10d@2x.png';


window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-dergee");
    //let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature")
    const temperatureSpan = document.querySelector(".temperature span");

    console.log('line 65');
    const proxy1 = "https://cors-anywhere.herokuapp.com/";
    //const api1 = `https://api.ipgeolocation.io/ipgeo?apiKey=b104e1db249f48aeba843d10ad66469b`;
    const api1 = `https://ipapi.co/json/`;

    fetch(api1)
        .then(response =>{
            return response.json();
        })
        .then(data=>{
            console.log(data);
                let locationTimezone = document.querySelector(".location-timezone");
                //Setting DOM Elements from API
                locationTimezone.textContent = data.city + ' / ' + data.region;
                long = data.longitude;
                lat = data.latitude;
                
    
            //long = position.coords.longitude;
            //lat = position.coords.latitude;
            //e04cf9b52062859663ef8908c137c365
	        //Weatherstack: 3c4e009a79904c54af52db127e8e7b87
            
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e04cf9b52062859663ef8908c137c365`;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data=>{
                    console.log(data);
                    const feels_like = data.main.feels_like;
                    const summary = data.weather[0].description;
                    const icon = data.weather[0].icon;

                    //Setting DOM Elements from API
                    temperatureDegree.textContent = Math.floor(((feels_like-273.15)*(9/5)+32)); 
                    temperatureDescription.textContent = summary; 
                    //locationTimezone.textContent = data.name;
                    
                    //icon
                    iconimg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                    //formula for celsius
                    let celsius = (feels_like - 273.15);
                    
                    //Temperature conversion
                    temperatureSection.addEventListener("click", ()=>{
                        if(temperatureSpan.textContent === "F  /C"){
                            temperatureSpan.textContent = "C  /F";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }else{
                            temperatureSpan.textContent = "F  /C";
                            temperatureDegree.textContent = Math.floor(((feels_like-273.15)*(9/5)+32));
                        }
                    });


                });
    });


});
