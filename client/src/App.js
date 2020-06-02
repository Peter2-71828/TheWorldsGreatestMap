 // document for react-geo: https://terrestris.github.io/react-geo-ws/map-integration/nominatim-search.html

import React, { useState, useEffect, Component } from 'react';

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOsm from 'ol/source/OSM';
import * as _proj from "ol/proj";

import { Drawer } from 'antd';

import {
  SimpleButton,
  MapComponent,
  NominatimSearch,
} from '@terrestris/react-geo';

import './App.css';
import 'ol/ol.css';
import 'antd/dist/antd.css';
import './react-geo.css';
import {fromLonLat} from 'ol/proj';


class App extends Component {
  constructor(props){
    super(props)
    this.state={
      tweetData: 1
    }
  }
const layer = new OlLayerTile({
  source: new OlSourceOsm()
});
const london = [ -0.126286, 51.508623 ];
const londonWebMercator = fromLonLat(london);

const map = new OlMap({
  view: new OlView({
    center: londonWebMercator,
    zoom: 14,
  }),
  layers: [layer]
});
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
  handleFilterArray(){
    var data = this.state.tweetData.statuses
    var acc = 0
    var currentDate = new Date()
    for (var i=0;i<data.length;i++){
      var tweetDate = (new Date(data[i].created_at))
  
      if(tweetDate.getDate() === currentDate.getDate()){
        acc++
      }
    }

    console.log(acc)
  
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

  const [visible, setVisible] = useState(false);
  const [currentLonLat, setCurrentLonLat] = useState({ lon: "0", lat: "0" });

  const toggleDrawer = () => {
  setVisible(!visible);
  };
  render(){
  return (
    <>
      <div>
            <button type="button" className="nobtn" onClick={() => this.handleFetchTweets()}>Grab tweets</button>
          </div>
          <div>
            <button type="button" className="nobtn" onClick={() => this.handleFilterArray()}>Filter data</button>
          </div>
      <div>
        {currentLonLat.lon} {currentLonLat.lat}
      </div>
      <div className="App">
        <MapComponent
          map={map}
          />
      <SimpleButton
        style={{position: 'fixed', top: '30px', right: '30px'}}
        onClick={toggleDrawer}
        icon="bars"
      />
      <Drawer
        title="isitbusyornot?"
        placement="right"
        onClose={toggleDrawer}
        visible={visible}
        mask={false}
      >

      <NominatimSearch
        countrycodes="gb"
        placeholder="isitbusyornot...?"
        key="search"
        map={map}
        onSelect={({ lon, lat, ...selected }, olMap) => {
          if (selected && selected.boundingbox) {
            var olView = olMap.getView();
            var extent = [
              selected.boundingbox[2],
              selected.boundingbox[0],
              selected.boundingbox[3],
              selected.boundingbox[1],
            ];
            extent = extent.map(function (coord) {
              return parseFloat(coord);
            });
            extent = (0, _proj.transformExtent)(
              extent,
              "EPSG:4326",
              olView.getProjection().getCode()
            );
            olView.fit(extent, {
              duration: 500,
            });
          }

          setCurrentLonLat({ lon, lat });
        }}
      />
      
      </Drawer>
      </div>
    </>
  )};
}
export default App;
