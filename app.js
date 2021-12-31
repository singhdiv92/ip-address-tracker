const express = require("express");
const https = require("https");
// const L=require("leaflet");
const app = express();
app.use(express.urlencoded());
app.use(express.static("public"));
app.set("view engine","ejs");

// const map = L.map('map').setView([51.505, -0.09], 13);

app.get("/", function (req, res) {
  res.render("index",{ip:"",country:"",city:"",region:"",timezone:"",isp:""});
});

app.post("/", function (req, res) {
   const ip = req.body.ip_address
   const api_key = "at_3MdfeiJUpM1k4cUoiH2y94rksE2vS"
   const url="https://geo.ipify.org/api/v2/country,city?apiKey="+api_key+"&ipAddress=" + ip;

  https.get(url, function (response) {
    response.on("data",function(data){
        const ipAddress=JSON.parse(data);
        const ip = ipAddress.ip;
        const country = ipAddress.location.country;
        const city = ipAddress.location.city;
        const region = ipAddress.location.region; 
        const timezone=ipAddress.location.timezone;
        const isp=ipAddress.isp;
       res.render("index",{ip:ip,country:country,city:city,region:region,timezone:timezone,isp:isp});
    });
  });
});



app.listen(process.env.PORT||3000,()=>console.log("server running at port 3000"));


