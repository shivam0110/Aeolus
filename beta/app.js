var iconimg = document.getElementsByClassName('icon');

window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-dergee");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature")
    const temperatureSpan = document.querySelector(".temperature span");


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
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
                    locationTimezone.textContent = data.name;
                    
                    //icon
                    iconimg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    console.log(iconimg.src);

                    //formula for celsius
                    let celsius = (feels_like - 273.15);
                    
                    //Temperature conversion
                    temperatureSection.addEventListener("click", ()=>{
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }else{
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = Math.floor(((feels_like-273.15)*(9/5)+32));
                        }
                    });


                });
        });
    }

    function setIcons(icon,proxy){
        var $image = $("img").first();
        var $downloadingImage = $("<img>");
        $downloadingImage.load(function(){
        $image.attr("src", $(this).attr("src"));	
        });
        //$downloadingImage.attr("src", `${proxy}http://openweathermap.org/img/wn/${icon}@2x.png`);        
        $downloadingImage.attr("src", `${proxy}https://i.imgur.com/fQA85lwr.jpg`);        

    }


});
