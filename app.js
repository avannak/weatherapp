window.addEventListener("load", () =>{
    if(navigator.geolocation){
        let long;
        let lat;
        let temperatureDegree = document.querySelector(".temperature-degrees");
        let temperatureDescription = document.querySelector(".temperature-description");
        let locationTimezone = document.querySelector(".location-timezone");
        


        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/9090864cf130117ca5e83d76f8281e45/${lat},${long}`;
            fetch(api)
                    .then(response =>{
                    return response.json();
                })
                    .then(data =>{
                    console.log(data);
                    const {temperature, summary} = data.currently;
                
                    //Set DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    let remundtz = locationTimezone.textContent.replace(/_/g,' ');
                    locationTimezone.textContent = remundtz;
                    
                    
                    
                });
            
                
            
            
                
            
        
        
        
        });
    }else{
        h1.textContent = "geolocation is not working";
    }
        
});


    
