    //select elements
    const locationTimezone=document.querySelector(".location-timezone");
    const temp=document.querySelector(".temp-degree");
    const degree=document.querySelector(".degree");
    const description=document.querySelector(".temp-desc");
    const notification=document.querySelector(".notification");
    const icon=document.querySelector(".icon");

    //app data
    const weather={};
    const kelvin=273;
    const key="c69b2a4d4ee1df2f01a025017aa8c76d";

    //checking geolocation
   if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(showPosition);
   }
   else{
       notification.innerHTML="browser doesnot support geolocation";
   }
   function showPosition(position){
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;
    getWeather(latitude,longitude);
   }

   function getWeather(latitude,longitude){
       let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
       fetch(api)
       .then(function (response){
           let data=response.json();
           return data;
       })
       .then(function(data){
        weather.tempValue=Math.floor(data.main.temp-kelvin);
        weather.city=data.name;
        weather.desc=data.weather[0].description;
        weather.icon=data.weather[0].icon;
       })
       .then(function(){
           displayWeather();
       })
   }
   function displayWeather(){
       temp.innerHTML=weather.tempValue;
       locationTimezone.innerHTML=weather.city;
       description.innerHTML=weather.desc;
       icon.innerHTML=`<img src="icons/${weather.icon}.png"/>`;
   }