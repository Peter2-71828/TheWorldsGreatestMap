import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props){
    super(props)
    this.state={
      tweetData: 1
    }
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ ping: res.express }))
      .catch(err => console.log(err));
  }

  // Tests our /ping GET route from the Express server (look inside server.js)
  callBackendAPI = async () => {
    const response = await fetch('/ping');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  // Handles the API call, updates the state
  handleFetchTweets = async() => {
    this.fetchTweets()
      .then(
        res => this.setState({ tweetData: res.express })
      )
// WE plan to to count number of tweets in the day. If its above 40 then its RED, 20 AMBer, < 10 its GREEN.
//we display this colour to the user
      console.log(this.state.tweetData.statuses)
  };
//function that filters tweetdata by date and counts how many tweets on the day.
  filterArray(){
  }

  // Calls the Express endpoint
  fetchTweets = async () => {
    const response = await fetch('/twitter_test');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  // Sort Tweet response
  // tweetNum = async () => {
  //   console.log(this.state.tweetData.statuses.size)
  // };

  // Main body
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <div>
            <button type="button" className="nobtn" onClick={() => this.handleFetchTweets()}>Grab tweets</button>
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
    )
  }
}

export default App;
