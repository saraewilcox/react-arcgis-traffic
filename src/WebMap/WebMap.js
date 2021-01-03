import React from 'react';
import { loadModules } from 'esri-loader';
import './WebMap.css';

class WebMap extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.sliderRef = React.createRef();
  }

  componentDidMount() {
    loadModules(['esri/Map', 'esri/layers/MapImageLayer','esri/views/MapView',"esri/widgets/Legend", "esri/widgets/ScaleBar","esri/widgets/TimeSlider","esri/widgets/Expand","esri/TimeExtent", "esri/widgets/LayerList"], { css: true })
    .then(([ArcGISMap, MapImageLayer, MapView, Legend, Scalebar,TimeSlider,Expand,TimeExtent,LayerList
    ]) => {

      const trafficLayer = new MapImageLayer({
        url: "https://utility.arcgis.com/usrsvcs/appservices/XpzFIG0fm0IcDmE2/rest/services/World/Traffic/MapServer",
        // url: "http://traffic.arcgis.com/arcgis/rest/services/World/Traffic/MapServer",
        dpi: 48,
        imageFormat: "png32",
        refreshInterval: 5, 
        useViewTime: true,
        sublayers: [{
          title: "Traffic Incidents Overview",
          id: 0,
          opacity: 0.75,
          source: {
            type: "map-layer",
            mapLayerId: 2,
          }
        },{
          title: "Traffic Incidents Intermediate",
          id: 1,
          opacity: 0.75,
          source: {
            type: "map-layer",
            mapLayerId: 3,
          }
        },{
          title: "Traffic Incidents Detailed",
          id: 2,
          opacity: 0.75,
          source: {
            type: "map-layer",
            mapLayerId: 4,
          }
        },{
          title: "Live Traffic",
          id: 2,
          opacity: 0.75,
          source: {
            type: "map-layer",
            mapLayerId: 6,
          }
        },{
          title: "Traffic",
          id: 4,
          opacity: 0.75,
          source: {
            type: "map-layer",
            mapLayerId: 7,
          }
        }]
      });

      const map = new ArcGISMap({
        basemap: 'streets-night-vector',
        layers: [trafficLayer]
      });

      this.view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [-97.3301, 37.6872], //Wichita coordinates
        zoom: 10
      });

      const legend = new Legend({
        view: this.view,
        layerInfos: [
          {
            layer: trafficLayer,
            title: "Legend",
          }
        ],
      });

      const scaleBar = new Scalebar({
        view: this.view,
        scalebarUnit: "english"
      })
      this.view.ui.add(scaleBar,"bottom-left");

      const legendExpand = new Expand({
        expandIconClass: "esri-icon-layers",
        expandTooltip: "Legend",
        view: this.view,
        content: legend,
        mode: "floating",
        expanded: false,
      });
      this.view.ui.add(legendExpand,"top-left");

      const date_today = new Date();
      const date_yesterday = new Date();
      date_yesterday.setDate(date_today.getDate()-1);

      const timeSlider = new TimeSlider({
        container: this.sliderRef.current,
        view: this.view,
        values: [
          date_today
        ],
        loop: true,
        timeVisible: true,//show the time stamps on the timeslider
      })
      this.view.ui.add(timeSlider,"bottom");
      
      const layerList = new LayerList({
        view: this.view
      })
      this.view.ui.add(layerList, "top-right");

      this.view.whenLayerView(trafficLayer).then(function() {
        const fullTimeExtent = new TimeExtent({
          start: date_yesterday,
          end: date_today
        })
        timeSlider.fullTimeExtent = fullTimeExtent;
        timeSlider.stops = {
          interval:{
            value: 15,
            unit: "minutes"
          }
        }
      })
    })     
  }

  componentWillUnmount() {
    if (this.view) {
      this.view.container = null;
    }
  }

  render() {
    return (
      <div>
        <div className="webmap" ref={this.mapRef} />
        <div className="sliderRef" ref={this.sliderRef}/>
      </div>
    );
  }
}

export default WebMap;