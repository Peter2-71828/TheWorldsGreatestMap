const express = require('express');
const path = require('path');
const app = express();

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} else{
  require('dotenv').config();
}

const bodyParser = require('body-parser')
app.use(bodyParser.json());

// Instantiate Twitter
const Twitter = require('twitter');
const twitterClient = new Twitter({
  consumer_key: process.env.REACT_APP_API_KEY,
  consumer_secret: process.env.REACT_APP_API_SECRET_KEY,
  bearer_token: process.env.REACT_APP_TWITTER_BEARER_TOKEN
})

// console.log that your server is up and running
app.listen((process.env.PORT || 8080), () => console.log(`Listening on port ${process.env.PORT || 8080}`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// GET route for testing ping and getting a pong
app.get('/ping', (req, res) => {
  res.send({ express: 'pong' });
});

// GET route to test connection to front-end
app.get('/test_connection', (req, res) => {
  res.send({ express: 'Express is running and connected to React' });
});

// GET route example for twitter
function askTwitter(location) {
  var patch;
  twitterClient.get('search/tweets', { q: ' ', geocode: location, count: 100, result_type: "recent" }, function(error, tweets, response) {
    patch = {greeting:'hello'};
  });
  return {greeting:'hello'};
}

// send coordinates
app.post('/client/App', function (req, res) { 
  console.log(req.body);
  var location = `${req.body.lat},${req.body.lon},0.9km`
  twitterClient.get('search/tweets', {
    q: ' ', geocode: location, count: 100, result_type: "recent"
  },
  function(error, tweets, response) {
    res.send({express: tweets});
  // var tweets = askTwitter(location)
  // console.log(tweets)
  // res.send(tweets) 
  })
})
