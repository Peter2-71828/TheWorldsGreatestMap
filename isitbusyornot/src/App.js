import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
var Twitter = require('twitter');

  var client = new Twitter({
    // consumer_key: 'fzf7AUSDZus9uMoZXUaAkxZbT',
    // consumer_secret: '3vdBKpUf32HnKN6GRrDal9V3LCUHwxGCKBcKZtKzbC2LWKCwqw',
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAABlYEwEAAAAAY1R%2FnW6bIf8WlEVR4zwvycOfryc%3DW8PSxjeP7JsrmP4FLMgDsDDOC3daNDTrx1sXGHgxpZrqgN2Kwy'
  })


  class App extends Component {

    constructor(props){
      super(props);

    }

  makeApiCall() {
    client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
      console.log(tweets);
   });
  }


  render() {
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
            <button type="button" class="nobtn" onClick={() => this.makeApiCall()}>✗</button>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )}
}

export default App;
