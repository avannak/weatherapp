
window.addEventListener("load", () =>{
    navigator.geolocation.watchPosition(function(position) {
        console.log("i'm tracking you!");
      },
      function(error) {
        if (error.code == error.PERMISSION_DENIED)
          console.log("you denied me :-(");
        alert("In order to detect the weather, please enable location tracking.");
        
        
        
      });
      function setClock(epoch){

        const unix = epoch;
        console.log("epoch is " + unix);
        const newDate = unix*1000;
        console.log("epoch times 1000 is " + newDate);
        const dateObject = new Date(newDate);
        const localDate = new Date();
        const tolocale = dateObject.toLocaleString();
        console.log("toLocale method made it so now it is "+ tolocale);
        const finaltime = tolocale.slice(-11, -4);
        console.log("final time is " + finaltime);
      
            var hours = localDate.getHours(); // 10 AM
            var minutes =  localDate.getMinutes(); // 30
            var seconds = localDate.getSeconds(); // 15
            var month = localDate.getMonth();
            
            var weekday = dateObject.toLocaleString("en-US", {weekday: "long"}) // Monday
            var month = dateObject.toLocaleString("en-US", {month: "long"}) // December
            var day = dateObject.toLocaleString("en-US", {day: "numeric"}) // 9
            var year = dateObject.toLocaleString("en-US", {year: "numeric"}) // 2019
            console.log("weekday is " + weekday);
            console.log("month is " + month);
            console.log("day is " + day);
            console.log("year is " + year);
 
     
        document.getElementById('weekday').textContent = weekday;
        document.getElementById('month').textContent = month;
        document.getElementById('day').textContent = day;
        document.getElementById('year').textContent = year;
      
      }
      function backupClock(){
        const fullDate = new Date();
        var hours = fullDate.getHours() + ':';
        var minutes = fullDate.getMinutes() + ':';
        var seconds = fullDate.getSeconds();
      
        if(hours<10){
          hours = "0" + hours;
        }
        if(minutes<10){
          minutes = "0" + minutes;
        }
        if(seconds<10){
          seconds =  "0" + seconds;
        }
        document.getElementById('hour').textContent = hours;
        document.getElementById('minute').textContent = minutes;
        document.getElementById('second').textContent = seconds;
      }
      setInterval(backupClock, 1000);

      var partlycloudyday = false;
      var cloudy = false;
      var partlycloudynight = false;
      var rain = false;
      var clearday = false;
      var clearnight = false;
      var searching = true;
      var snow = false;
      var sleet = false;
      var fog = false;
      var windy = false;
      var container = true;
    
     const searchElement = document.querySelector('[data-city-search]')
     const searchBox = new google.maps.places.SearchBox(searchElement)
     searchBox.addListener('places_changed', () => {
         const place = searchBox.getPlaces()[0]
         if(place==null) return
         const latitude = place.geometry.location.lat()
         const longitude = place.geometry.location.lng()
         fetch('/weather', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json'
             },
             body: JSON.stringify({
                 latitude: latitude,
                 longitude: longitude
             })
         }).then(res => res.json()).then(data => {
            console.log(data);
            console.log(data.time);
            let icon = data.icon;
            setWeatherData(data, place.formatted_address, icon, document.querySelector('.icon'));
            console.log(data.time);
            setClock(data.time);
            
      
            
            if(icon == "partly-cloudy-day"){
                
                if(searching){
                    console.log("searching is turned off")
                    $(".searching").fadeToggle(2500);
                    searching = false;
                }
                if(container){
                    console.log("containerload is turned off")
                    $(".container").fadeToggle(2500);
                    container = false;
                }
                if(cloudy){
                    console.log("cloudy is turned off")
                    $(".cloudy").fadeToggle(0);
                    cloudy = false;
                }
                if(rain){
                    console.log("rain is turned off")
                    $(".rain").fadeToggle(0);
                    rain = false;
                }
                if(clearday){
                    console.log("clearday is turned off")
                    $(".clearday").fadeToggle(0);
                    clearday = false;
                }
                if(clearnight){
                    console.log("clearnight is turned off")
                    $(".clearnight").fadeToggle(0);
                    clearnight = false;
                }
                if(partlycloudynight){
                    console.log("partlycloudynight is turned off")
                    $(".partlycloudynight").fadeToggle(0);
                    partlycloudynight = false;
                }
                console.log("icon is partlycloudyday");
                if(!partlycloudyday){
                    $(".partlycloudyday").fadeToggle(2500);
                    console.log("partlycloudyday is now true");
                    partlycloudyday=true;
                }
                
            }
            if(icon == "cloudy"){
                if(searching){
                    console.log("searching is turned off")
                    $(".searching").fadeToggle(2500);
                    searching = false;
                }
                if(container){
                    console.log("containerload is turned off")
                    $(".container").fadeToggle(2500);
                    container = false;
                }
                if(partlycloudynight){
                    console.log("cloudy is turned off")
                    $(".partlycloudynight").fadeToggle(0);
                    cloudy = false;
                }
                if(partlycloudyday){
                    console.log("partlycloudyday is turned off")
                    $(".partlycloudyday").fadeToggle(0);
                    partlycloudyday = false;
                }
                if(rain){
                    console.log("rain is turned off")
                    $(".rain").fadeToggle(0);
                    rain = false;
                }
                if(clearday){
                    console.log("clearday is turned off")
                    $(".clearday").fadeToggle(0);
                    clearday = false;
                }
                if(clearnight){
                    console.log("clearnight is turned off")
                    $(".clearnight").fadeToggle(0);
                    clearnight = false;
                }
                console.log("icon is cloudy");
                if(!cloudy){
                    $(".cloudy").fadeToggle(2500);
                    console.log("it is still cloudy");
                    cloudy=true;
                }
                
                
            }
            if(icon == "partly-cloudy-night"){
                if(searching){
                    console.log("searching is turned off")
                    $(".searching").fadeToggle(0);
                    searching = false;
                }
                if(container){
                    console.log("containerload is turned off")
                    $(".container").fadeToggle(2500);
                    container = false;
                }
                if(cloudy){
                    console.log("cloudy is turned off")
                    $(".cloudy").fadeToggle(0);
                    cloudy = false;
                }
                if(partlycloudyday){
                    console.log("partlycloudyday is turned off")
                    $(".partlycloudyday").fadeToggle(0);
                    partlycloudyday = false;
                }
                if(rain){
                    console.log("rain is turned off")
                    $(".rain").fadeToggle(0);
                    rain = false;
                }
                if(clearday){
                    console.log("clearday is turned off")
                    $(".clearday").fadeToggle(0);
                    clearday = false;
                }
                if(clearnight){
                    console.log("clearnight is turned off")
                    $(".clearnight").fadeToggle(0);
                    clearnight = false;
                }
                
                console.log("icon is partlycloudynight");
                if(!partlycloudynight){
                    $(".partlycloudynight").fadeToggle(2500);
                    console.log("partlycloudynight is now true");
                    partlycloudynight=true;
                }
                
               
                
            }
            if(icon == "rain"){
                if(searching){
                    console.log("searching is turned off")
                    $(".searching").fadeToggle(2500);
                    searching = false;
                }
                if(container){
                    console.log("containerload is turned off")
                    $(".container").fadeToggle(2500);
                    container = false;
                }
                if(cloudy){
                    console.log("cloudy is turned off")
                    $(".cloudy").fadeToggle(0);
                    cloudy = false;
                }
                if(partlycloudyday){
                    console.log("partlycloudyday is turned off")
                    $(".partlycloudyday").fadeToggle(0);
                    partlycloudyday = false;
                }
                if(partlycloudynight){
                    console.log("partlycloudynight is turned off")
                    $(".partlycloudynight").fadeToggle(0);
                    partlycloudynight = false;
                }
                if(clearday){
                    console.log("clearday is turned off")
                    $(".clearday").fadeToggle(0);
                    clearday = false;
                }
                if(clearnight){
                    console.log("clearnight is turned off")
                    $(".clearnight").fadeToggle(0);
                    clearnight = false;
                }
                console.log("icon is rain");
                if(!rain){
                    $(".rain").fadeToggle(2500);
                    console.log("rain is now true");
                    rain=true;
                }
                
               
                
            }
            if(icon == "clear-day"){
                if(searching){
                    console.log("searching is turned off")
                    $(".searching").fadeToggle(2500);
                    searching = false;
                }
                if(container){
                    console.log("containerload is turned off")
                    $(".container").fadeToggle(2500);
                    container = false;
                }
                if(cloudy){
                    console.log("cloudy is turned off")
                    $(".cloudy").fadeToggle(0);
                    cloudy = false;
                }
                if(partlycloudyday){
                    console.log("partlycloudyday is turned off")
                    $(".partlycloudyday").fadeToggle(0);
                    partlycloudyday = false;
                }
                if(partlycloudynight){
                    console.log("partlycloudynight is turned off")
                    $(".partlycloudynight").fadeToggle(0);
                    partlycloudynight = false;
                }
                if(rain){
                    console.log("rain is turned off")
                    $(".rain").fadeToggle(0);
                    rain = false;
                }
                if(clearnight){
                    console.log("clearnight is turned off")
                    $(".clearnight").fadeToggle(0);
                    clearnight = false;
                }
                console.log("icon is clearday");
                if(!clearday){
                    $(".clearday").fadeToggle(2500);
                    console.log("clearday is now true");
                    clearday=true;
                }
                

               
                
            }
            if(icon == "clear-night"){
                if(searching){
                    console.log("searching is turned off")
                    $(".searching").fadeToggle(2500);
                    searching = false;
                }
                if(container){
                    console.log("containerload is turned off")
                    $(".container").fadeToggle(2500);
                    container = false;
                }
                if(cloudy){
                    console.log("cloudy is turned off")
                    $(".cloudy").fadeToggle(0);
                    cloudy = false;
                }
                if(partlycloudyday){
                    console.log("partlycloudyday is turned off")
                    $(".partlycloudyday").fadeToggle(0);
                    partlycloudyday = false;
                }
                if(partlycloudynight){
                    console.log("partlycloudynight is turned off")
                    $(".partlycloudynight").fadeToggle(0);
                    partlycloudynight = false;
                }
                if(rain){
                    console.log("rain is turned off")
                    $(".rain").fadeToggle(0);
                    rain = false;
                }
                if(clearday){
                    console.log("clearday is turned off")
                    $(".clearday").fadeToggle(0);
                    clearday = false;
                }
                console.log("icon is clearnight");
                if(!clearnight){
                    $(".clearnight").fadeToggle(2500);
                    console.log("clearnight is now true");
                    clearnight=true;
                }
            }
            if(icon == "snow"){
                if(searching){
                    console.log("searching is turned off")
                    $(".searching").fadeToggle(2500);
                    searching = false;
                }
                if(container){
                    console.log("containerload is turned off")
                    $(".container").fadeToggle(2500);
                    container = false;
                }
                if(cloudy){
                    console.log("cloudy is turned off")
                    $(".cloudy").fadeToggle(0);
                    cloudy = false;
                }
                if(partlycloudyday){
                    console.log("partlycloudyday is turned off")
                    $(".partlycloudyday").fadeToggle(0);
                    partlycloudyday = false;
                }
                if(partlycloudynight){
                    console.log("partlycloudynight is turned off")
                    $(".partlycloudynight").fadeToggle(0);
                    partlycloudynight = false;
                }
                if(rain){
                    console.log("rain is turned off")
                    $(".rain").fadeToggle(0);
                    rain = false;
                }
                if(clearday){
                    console.log("clearday is turned off")
                    $(".clearday").fadeToggle(0);
                    clearday = false;
                }
                if(clearnight){
                    console.log("clearnight is turned off")
                    $(".clearnight").fadeToggle(0);
                    clearnight = false;
                }
                if(windy){
                    console.log("windy is turned off")
                    $(".windy").fadeToggle(0);
                    windy = false;
                }
                if(sleet){
                    console.log("sleet is turned off")
                    $(".sleet").fadeToggle(0);
                    sleet = false;
                }
                if(fog){
                    console.log("fog is turned off")
                    $(".fog").fadeToggle(0);
                    fog = false;
                }
                console.log("icon is snow");
                if(!snow){
                    $(".snow").fadeToggle(2500);
                    console.log("snow is now true");
                    snow=true;
                }
                
            }
            if(icon == "sleet"){
                if(searching){
                    console.log("searching is turned off")
                    $(".searching").fadeToggle(2500);
                    searching = false;
                }
                if(container){
                    console.log("containerload is turned off")
                    $(".container").fadeToggle(2500);
                    container = false;
                }
                 if(cloudy){
                    console.log("cloudy is turned off")
                    $(".cloudy").fadeToggle(0);
                    cloudy = false;
                }
                if(partlycloudyday){
                    console.log("partlycloudyday is turned off")
                    $(".partlycloudyday").fadeToggle(0);
                    partlycloudyday = false;
                }
                if(partlycloudynight){
                    console.log("partlycloudynight is turned off")
                    $(".partlycloudynight").fadeToggle(0);
                    partlycloudynight = false;
                }
                if(rain){
                    console.log("rain is turned off")
                    $(".rain").fadeToggle(0);
                    rain = false;
                }
                if(clearday){
                    console.log("clearday is turned off")
                    $(".clearday").fadeToggle(0);
                    clearday = false;
                }
                if(clearnight){
                    console.log("clearnight is turned off")
                    $(".clearnight").fadeToggle(0);
                    clearnight = false;
                }
                if(snow){
                    console.log("snow is turned off")
                    $(".snow").fadeToggle(0);
                    snow = false;
                }
                if(windy){
                    console.log("windy is turned off")
                    $(".windy").fadeToggle(0);
                    windy = false;
                }
                if(fog){
                    console.log("fog is turned off")
                    $(".fog").fadeToggle(0);
                    fog = false;
                }
                console.log("icon is sleet");
                if(!sleet){
                    $(".sleet").fadeToggle(2500);
                    console.log("sleet is now true");
                    sleet=true;
                }
                
            }
            if(icon == "fog"){
                if(searching){
                    console.log("searching is turned off")
                    $(".searching").fadeToggle(2500);
                    searching = false;
                }
                if(container){
                    console.log("containerload is turned off")
                    $(".container").fadeToggle(2500);
                    container = false;
                }
                if(cloudy){
                    console.log("cloudy is turned off")
                    $(".cloudy").fadeToggle(0);
                    cloudy = false;
                }
                if(partlycloudyday){
                    console.log("partlycloudyday is turned off")
                    $(".partlycloudyday").fadeToggle(0);
                    partlycloudyday = false;
                }
                if(partlycloudynight){
                    console.log("partlycloudynight is turned off")
                    $(".partlycloudynight").fadeToggle(0);
                    partlycloudynight = false;
                }
                if(rain){
                    console.log("rain is turned off")
                    $(".rain").fadeToggle(0);
                    rain = false;
                }
                if(clearday){
                    console.log("clearday is turned off")
                    $(".clearday").fadeToggle(0);
                    clearday = false;
                }
                if(clearnight){
                    console.log("clearnight is turned off")
                    $(".clearnight").fadeToggle(0);
                    clearnight = false;
                }
                if(windy){
                    console.log("windy is turned off")
                    $(".windy").fadeToggle(0);
                    windy = false;
                }
                if(sleet){
                    console.log("sleet is turned off")
                    $(".sleet").fadeToggle(0);
                    sleet = false;
                }
                if(snow){
                    console.log("snow is turned off")
                    $(".snow").fadeToggle(0);
                    snow = false;
                }
                console.log("icon is fog");
                if(!fog){
                    $(".fog").fadeToggle(2500);
                    console.log("fog is now true");
                    fog=true;
                }
                
            }
            if(icon == "windy"){
                if(searching){
                    console.log("searching is turned off")
                    $(".searching").fadeToggle(2500);
                    searching = false;
                }
                if(container){
                    console.log("containerload is turned off")
                    $(".container").fadeToggle(2500);
                    container = false;
                }
                if(cloudy){
                    console.log("cloudy is turned off")
                    $(".cloudy").fadeToggle(0);
                    cloudy = false;
                }
                if(partlycloudyday){
                    console.log("partlycloudyday is turned off")
                    $(".partlycloudyday").fadeToggle(0);
                    partlycloudyday = false;
                }
                if(partlycloudynight){
                    console.log("partlycloudynight is turned off")
                    $(".partlycloudynight").fadeToggle(0);
                    partlycloudynight = false;
                }
                if(rain){
                    console.log("rain is turned off")
                    $(".rain").fadeToggle(0);
                    rain = false;
                }
                if(clearday){
                    console.log("clearday is turned off")
                    $(".clearday").fadeToggle(0);
                    clearday = false;
                }
                if(clearnight){
                    console.log("clearnight is turned off")
                    $(".clearnight").fadeToggle(0);
                    clearnight = false;
                }
                if(snow){
                    console.log("snow is turned off")
                    $(".snow").fadeToggle(0);
                    snow = false;
                }
                if(sleet){
                    console.log("sleet is turned off")
                    $(".sleet").fadeToggle(0);
                    sleet = false;
                }
                if(fog){
                    console.log("fog is turned off")
                    $(".fog").fadeToggle(0);
                    fog = false;
                }
                console.log("icon is windy");
                if(!windy){
                    $(".windy").fadeToggle(2500);
                    console.log("windy is now true");
                    windy=true;
                }
                
            }
                
            
          
         })
     });
     
     let temperatureDegree = document.querySelector(".temperature-degrees");
     let temperatureDescription = document.querySelector(".temperature-description");
     let locationTimezone = document.querySelector(".location-timezone");
    
     function setWeatherData(data, place, icon, iconID){
        
       
        if(place.includes("America") || place.includes("USA")){
            console.log("timezone includes america!");
            const fartocel = Math.round((data.temperature - 32) * 5/9);
        temperatureDegree.textContent = fartocel + ('°C')+(' /') + data.temperature + ('°F');
        }else{
            const celtofar = Math.round((data.temperature * (9/5))+32);
        temperatureDegree.textContent = data.temperature + ('°C')+(' /') + celtofar + ('°F');
        }
         locationTimezone.textContent = place
         
         temperatureDescription.textContent = data.summary
         const skycons = new Skycons({ color: "white" });
         const currentIcon = icon.replace(/-/g,'_').toUpperCase();
         skycons.play();
         return skycons.set(iconID, Skycons[currentIcon]);
         
         
       
    }
    
    
    function setIcons(icon, iconID){
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g,'_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
        
    }  
    
     
     
      $(document).mouseup(function (e){

        var container = $(".c-form");
    
        if (!container.is(e.target) && container.has(e.target).length === 0){
    
            $(".c-form__toggle::before").toggle;
            
        }
    }); 
   
    if(navigator.geolocation){
       
        
    
        


        navigator.geolocation.getCurrentPosition(position => {
            let long;
            let lat;
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/9090864cf130117ca5e83d76f8281e45/${lat},${long}?units=auto`;
            fetch(api)
                    .then(response =>{
                    return response.json();
                })
                    .then(data =>{
                    console.log(data);
                    let {temperature, summary, icon, time} = data.currently;
                    console.log("detected time is " + time);
                
                    //Set DOM elements from the API
                   
                    if(data.timezone.includes("America")){
                        console.log("timezone includes america!");
                        const fartocel = Math.round((temperature - 32) * 5/9);
                    temperatureDegree.textContent = fartocel + ('°C')+(' /') + temperature + ('°F');
                    }else{
                        const celtofar = Math.round((temperature * (9/5))+32);
                    temperatureDegree.textContent = temperature + ('°C')+(' /') + celtofar + ('°F');
                    }
                    
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    let remundtz = locationTimezone.textContent.replace(/_/g,' ');
                    locationTimezone.textContent = remundtz;
                    setIcons(icon, document.querySelector('.icon'));
                    setClock(time);
                    
                    
                    
                    if(icon == "partly-cloudy-day"){
                        if(searching){
                            console.log("searching is turned off")
                            $(".searching").fadeToggle(2500);
                            searching = false;
                        }
                        if(container){
                            console.log("containerload is turned off")
                            $(".container").fadeToggle(2500);
                            container = false;
                        }
                        console.log("icon is partlycloudyday");
                        if(!partlycloudyday){
                            $(".partlycloudy").fadeToggle(2500);
                            console.log("it is still partlycloudyday");
                            partlycloudyday=true;
                        }
                        
                    }
                    if(icon == "cloudy"){
                        if(searching){
                            console.log("searching is turned off")
                            $(".searching").fadeToggle(2500);
                            searching = false;
                        }
                        if(container){
                            console.log("containerload is turned off")
                            $(".container").fadeToggle(2500);
                            container = false;
                        }
                        console.log("icon is cloudy");
                        if(!cloudy){
                            $(".cloudy").fadeToggle(2500);
                            console.log("it is still cloudy");
                            cloudy=true;
                        }
                        
                        
                    }
                    if(icon == "partly-cloudy-night"){
                        if(searching){
                            console.log("searching is turned off")
                            $(".searching").fadeToggle(2500);
                            searching = false;
                        }
                        if(container){
                            console.log("containerload is turned off")
                            $(".container").fadeToggle(2500);
                            container = false;
                        }
                        console.log("icon is partlycloudynight");
                        if(!partlycloudynight){
                            $(".partlycloudynight").fadeToggle(2500);
                            console.log("it is still partlycloudynight");
                            partlycloudynight=true;
                        }
                        
                       
                        
                    }
                    if(icon == "rain"){
                        if(searching){
                            console.log("searching is turned off")
                            $(".searching").fadeToggle(2500);
                            searching = false;
                        }
                        if(container){
                            console.log("containerload is turned off")
                            $(".container").fadeToggle(2500);
                            container = false;
                        }
                        console.log("icon is rain");
                        if(!rain){
                            $(".rain").fadeToggle(2500);
                            console.log("it is still rain");
                            rain=true;
                        }
                        
                       
                        
                    }
                    if(icon == "clear-day"){
                        if(searching){
                            console.log("searching is turned off")
                            $(".searching").fadeToggle(2500);
                            searching = false;
                        }
                        if(container){
                            console.log("containerload is turned off")
                            $(".container").fadeToggle(2500);
                            container = false;
                        }
                        console.log("icon is clearday");
                        if(!clearday){
                            $(".clearday").fadeToggle(2500);
                            console.log("it is still clearday");
                            clearday=true;
                        }
                        
        
                       
                        
                    }
                    if(icon == "clear-night"){
                        if(searching){
                            console.log("searching is turned off")
                            $(".searching").fadeToggle(2500);
                            searching = false;
                        }
                        if(container){
                            console.log("containerload is turned off")
                            $(".container").fadeToggle(2500);
                            container = false;
                        }
                        console.log("icon is clearnight");
                        if(!clearnight){
                            $(".clearnight").fadeToggle(2500);
                            console.log("it is still clearnight");
                            clearnight=true;
                        }
                    }
                    if(icon == "snow"){
                        if(searching){
                            console.log("searching is turned off")
                            $(".searching").fadeToggle(2500);
                            searching = false;
                        }
                        console.log("icon is snow");
                        if(!snow){
                            $(".snow").fadeToggle(2500);
                            console.log("it is still snow");
                            snow=true;
                        }
                        
                    }
                    if(icon == "sleet"){
                        if(searching){
                            console.log("searching is turned off")
                            $(".searching").fadeToggle(2500);
                            searching = false;
                        }
                        if(container){
                            console.log("containerload is turned off")
                            $(".container").fadeToggle(2500);
                            container = false;
                        }
                        console.log("icon is sleet");
                        if(!sleet){
                            $(".sleet").fadeToggle(2500);
                            console.log("it is still sleet");
                            sleet=true;
                        }
                        
                    }
                    if(icon == "fog"){
                        if(searching){
                            console.log("searching is turned off")
                            $(".searching").fadeToggle(2500);
                            searching = false;
                        }
                        if(container){
                            console.log("containerload is turned off")
                            $(".container").fadeToggle(2500);
                            container = false;
                        }
                        console.log("icon is fog");
                        if(!fog){
                            $(".fog").fadeToggle(2500);
                            console.log("it is still fog");
                            fog=true;
                        }
                        
                    }
                    if(icon == "windy"){
                        if(searching){
                            console.log("searching is turned off")
                            $(".searching").fadeToggle(2500);
                            searching = false;
                        }
                        if(container){
                            console.log("containerload is turned off")
                            $(".container").fadeToggle(2500);
                            container = false;
                        }
                        console.log("icon is windy");
                        if(!windy){
                            $(".windy").fadeToggle(2500);
                            console.log("it is still windy");
                            windy=true;
                        }
                        
                    }
                    
                    
                    
                    
                });
        });
        
    }
     
});


    
