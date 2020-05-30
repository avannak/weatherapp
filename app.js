
window.addEventListener("load", () =>{
    navigator.geolocation.watchPosition(function(position) {
        console.log("i'm tracking you!");
      },
      function(error) {
        if (error.code == error.PERMISSION_DENIED)
          console.log("you denied me :-(");
        alert("In order to detect weather, please enable location.");
        
        
        
      });
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
                    const {temperature, summary, icon} = data.currently;
                
                    //Set DOM elements from the API
                    const fartocel = Math.round((temperature - 32)*5/9);
                    temperatureDegree.textContent = temperature + ('°F')+(' /') + fartocel + ('°C');
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    let remundtz = locationTimezone.textContent.replace(/_/g,' ');
                    locationTimezone.textContent = remundtz;
                    setIcons(icon, document.querySelector('.icon'));
                    if(icon == "partly-cloudy-day"){
                        console.log("icon is partlycloudyday");
                        $(".partlycloudy").fadeToggle(2500);
                        
                    }
                    if(icon == "partly-cloudy-night"){
                        console.log("icon is partlycloudynight");
                        $(".partlycloudynight").fadeToggle(2500);
                       
                        
                    }
                    if(icon == "rain"){
                        console.log("icon is rain");
                        $(".rain").fadeToggle(2500);
                       
                        
                    }
                    
                    
                    
                    
                    
                });
        });
        
    }
      function setIcons(icon, iconID){
          const skycons = new Skycons({ color: "white" });
          const currentIcon = icon.replace(/-/g,'_').toUpperCase();
          skycons.play();
          return skycons.set(iconID, Skycons[currentIcon]);
      }  
});


    
