var twit = require('twit');
var request = require('request');

var T = new twit({
    consumer_key:         '/*Your Consumer Key*/',//consumer_key
    consumer_secret:      '/*Your Consumer Secret*/',//consumer_secret
    access_token:         '/*Your Access Token*/',//access_token
    access_token_secret:  '/*Your Access Token Secret*/',//access_token secret
});

// Function for capitalizing the first word of the string
const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
;
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  //Getting Quotes from api
request("https://disease.sh/v2/all",{json : true}, async(err,res,body)=>{
    console.log(body.cases);
    console.log(body.deaths);
    
    //Text you want to show in the image
    let cases = numberWithCommas(body.cases);
    let deaths = body.deaths;
let recovered = body.recovered;
		let active = body.active;

var text = `
Latest Covid-19 Cases! 👨‍🔬

WorldWide ☠
Total Cases :- ${cases}
Total Deaths :- ${deaths}
Total Recovered :- ${recovered}
Total Active :- ${active}

India 🇮🇳
Total Cases :- 182,990
Total Deaths :- 5,188
Cases Today :- 1,163

Stay Safe 😷
`;
console.log(text)

		// tweet(text , quoteAuthor);

    })




// uploading Image
  function tweet(text){
	
	var tweet = text;
    //Converting image to base64 to easily upload image on twitter servers
    T.post('statuses/update', { status: tweet}, function(err, data, response) {

  console.log(data);

});


  }

