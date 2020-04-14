import {Map, View} from 'ol';
import BaseLayer from 'ol/layer/Base';
import Control from 'ol/control/Control';

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
  }

  addLayers(layers: BaseLayer[]) {
    layers.forEach(lyr => {
      this.wonderMap.addLayer(lyr);
    })
  }

  addControl(control: Control) {
    this.wonderMap.addControl(control);
  }
}