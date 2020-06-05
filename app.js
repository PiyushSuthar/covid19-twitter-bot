var twit = require('twit');
var request = require('request');
var express =  require('express')
var app = express();

var port = process.env.PORT || 3000;

var T = new twit({
  consumer_key: process.env.CONSUMER_KEY,//consumer_key
  consumer_secret: process.env.CONSUMER_SECRET,//consumer_secret
  access_token: process.env.ACCESS_TOKEN,//access_token
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,//access_token secret
})

// Function for capitalizing the first word of the string
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



app.get("/" , (req,res)=>{
  res.send("Follow <a href='https://twitter.com/piyushsthr'>@PiyushSthr</a> on twitter")
})

app.get("/MJuUhWgSk4gnk5bRm2X9DRXfYY7Mrc/hcqZmGebucRGxfRTHSGCRyWFgf6YGp/9anMqFhCQsbef7k4qmdv4m6Meue6zL",(req,res)=>{
  main()
})




 var main = async()=>{

  //Variables
  let cases;
  let deaths;
  let recovered;

  let casesIndia;
  let deathsIndia;
  let casesTodayIndia;
  let todayRecoveredIndia;
  let recoveredIndia;
  let todayDeathsIndia;
  let recoveredToday;
  let deathsToday;

  var text;

  //Getting Quotes from api
   request("https://disease.sh/v2/all", { json: true }, (err, res, body) => {
     console.log(body.cases);
     console.log(body.deaths);
     //Text you want to show in the image
     cases = numberWithCommas(body.cases);
     deaths = numberWithCommas(body.deaths);
     recovered = numberWithCommas(body.recovered);
     casesToday = numberWithCommas(body.todayCases)
     recoveredToday = numberWithCommas(body.todayRecovered);
     deathsToday = numberWithCommas(body.todayDeaths)

     let India = request("https://disease.sh/v2/countries/india", { json: true }, (err, res, body) => {

      casesIndia = numberWithCommas(body.cases);
      casesTodayIndia = numberWithCommas(body.todayCases);
      deathsIndia = numberWithCommas(body.deaths);
      todayRecoveredIndia = numberWithCommas(body.todayRecovered);
      recoveredIndia = numberWithCommas(body.recovered);
      todayDeathsIndia = numberWithCommas(body.todayDeaths);

      text = `
Latest Covid-19 News! 👨‍🔬

WorldWide 🌍
Cases Today :- ${casesToday} (${cases})
Recovered Today :- ${recoveredToday} (${recovered})
Deaths Today :- ${deathsToday} (${deaths})

India 🇮🇳
Cases Today :- ${casesTodayIndia} (${casesIndia})
Recovered Today :- ${todayRecoveredIndia} (${recoveredIndia})
Deaths Today :- ${todayDeathsIndia} (${deathsIndia})

Stay Safe 😷
      `;
      console.log(text);
      tweet(text);

    })

   });

}



// uploading Image
function tweet(text) {

  var tweet = text;
  //Converting image to base64 to easily upload image on twitter servers
  T.post('statuses/update', { status: tweet }, function (err, data, response) {

    console.log(data);
    console.log("Tweeted")

  });


}

app.listen(port, ()=>console.log("Jai Shree ram"))