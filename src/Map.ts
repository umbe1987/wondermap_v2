import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import BaseLayer from 'ol/layer/Base';

export class WonderMap {
  private wonderMap: Map;

  // https://stackoverflow.com/a/43326461/1979665
  constructor(id: string, layers: BaseLayer[] = []) {
    this.wonderMap = new Map({
      target: document.getElementById(id),
      view: new View({
        center: [0, 0],
        zoom: 0
      })
    });
    
    // add layers
    this.addLayers(layers);

    // add basemap to map
    this.wonderMap.addLayer(new TileLayer({
      source: new OSM()
    }));
  }

  addLayers(layers: BaseLayer[]) {
    layers.forEach(lyr => {
      this.wonderMap.addLayer(lyr);
    })
  }
}