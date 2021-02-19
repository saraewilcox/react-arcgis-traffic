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
    loadModules(["esri/Map", "esri/layers/MapImageLayer", "esri/widgets/ScaleBar","esri/widgets/TimeSlider", "esri/views/MapView","esri/widgets/Legend", "esri/widgets/Expand","esri/TimeExtent", "esri/widgets/LayerList"], { css: true })
    .then(([ArcGISMap, MapImageLayer, Scalebar, TimeSlider, MapView, Legend, Expand, TimeExtent, LayerList
    ]) => {

      const trafficLayer = new MapImageLayer({
        url: "https://utility.arcgis.com/usrsvcs/appservices/XpzFIG0fm0IcDmE2/rest/services/World/Traffic/MapServer",
        //url: "http://traffic.arcgis.com/arcgis/rest/services/World/Traffic/MapServer",
        dpi: 48,
        imageFormat: "png32",
        refreshInterval: 5, 
        useViewTime: true,
        sublayers: [
        {
          title: "Traffic Incidents Intermediate",
          id: 1,
          opacity: 0.75,
          source: {
            type: "map-layer",
            mapLayerId: 3,
          }
         },{
          title: "Live Traffic",
          id: 1,
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
        center: [-77.0369, 38.9072], //DC coordinates 
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
      this.view.ui.add(scaleBar,"bottom-right");

      const expandLegend = new Expand({
        view: this.view,
        expandIconClass: "esri-icon-layers",
        expandTooltip: "Legend",
        content: legend,
        expanded: false,
        mode: "floating",
      });
      this.view.ui.add(expandLegend,"top-left");

      const date_today = new Date();
      const date_yesterday = new Date(date_today);
      date_yesterday.setDate(date_yesterday.getDate()-1);

      const timeSlider = new TimeSlider({
        view: this.view,
        container: this.sliderRef.current,
        values: [
          date_yesterday,
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
      delete this.view;
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