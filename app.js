const express = require("express");
const https = require("https");

const app = express();

app.get("/", function (req, res) {
  res.setHeader('Content-Type', 'text/html'); 
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=b00cac5e30663bb3e315cc47854556f8&units=metric";
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
          const weatherData =  JSON.parse(data);
          console.log(weatherData);
          const temp = weatherData.main.temp;
          console.log(temp);    
          const weatherDescription = weatherData.weather[0].description;
          const weatherIcon = weatherData.weather[0].icon;
          const imageURL = "http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
          
          res.write("<h1>The temperature in Paris is: "+temp+ " degree Celcius.</h1>")
          res.write("Weather Description: "+weatherDescription+"<br>");
          res.write("<img src="+imageURL+ "></img>");
          res.end();
        })

        
        
     
})
})



app.listen(3000, function () {
    console.log("Server is running on port 3000");
})
