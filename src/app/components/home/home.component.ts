import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';
import 'leaflet.heat';
//import * as  from 'leaflet.heat';
import * as Papa from "papaparse";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public file: any;
  public csv: any;
  public static data: any;

  constructor() { }

  ngOnInit(): void {
  }

  handleFileSelect(e: any) {
    var files = e.target.files; // FileList object
    this.file = files[0];
    console.log(this.file.name);
    var reader = new FileReader();
    reader.readAsText(this.file);
    reader.onload = (event: any) => {
      this.csv = event.target.result; // Content of CSV file
      console.log(this.csv);
    }

    Papa.parse(this.file, {
      header: true,
      complete: function (results) {
        HomeComponent.data = results.data;
        console.log("Finished:", results.data);
        console.log("Type", typeof (results.data));
      }
    });
  }

  DrawMap() {
    var map = L.map('map').setView([36.087,114.358], 4);
    var map1 = L.map('map1').setView([36.087,114.358],4);
    var map2 = L.map('map2').setView([36.087,114.358],4);
    var map3 = L.map('map3').setView([36.087,114.358],4);
    var heatmap = null;
    var heatmap1 = null;
    var heatmap2 = null;
    var heatmap3 = null;
    var d: any = [];
    var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osm = new L.TileLayer(osmUrl, { minZoom: 2, maxZoom: 16 });
    map.addLayer(osm);
    var cfg = {
      "radius": 2,
      "maxOpacity": .4,
      "scaleRadius": true,
      "useLocalExtrema": true,
      latField: 'lat',
      lngField: 'lon',
      valueField: 'PM25'
    };
    for (var i = 0; i < 1427; i++) {
      d[i] = [Number(HomeComponent.data[i].lat), Number(HomeComponent.data[i].lon), Number(HomeComponent.data[i].PM25)];
    }
    console.log("d", d);
    heatmap = L.heatLayer(d, {radius: 25}).addTo(map);
    heatmap1 = L.heatLayer(d, {radius: 25}).addTo(map1);
    heatmap2 = L.heatLayer(d, {radius: 25}).addTo(map2);
    heatmap3 = L.heatLayer(d, {radius: 25}).addTo(map3);
  }

}
