import {Map, View} from 'ol';
import { OperationalLayer } from './layers/OperationalLayer';
import { BasemapLayer } from './layers/BasemapLayer';
import Control from 'ol/control/Control';
import Collection from 'ol/Collection';

export class WonderMap {
  private wonderMap: Map;

  // https://stackoverflow.com/a/43326461/1979665
  constructor(id: string, layers: Collection<OperationalLayer | BasemapLayer>) {
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

  addLayers(layers: Collection<OperationalLayer | BasemapLayer>) {
    layers.forEach(lyr => {
      this.wonderMap.addLayer(lyr);
    })
  }

  getLayers(): Collection<OperationalLayer | BasemapLayer> {
    return this.wonderMap.getLayers() as Collection<OperationalLayer | BasemapLayer>;
  }

  addControl(control: Control) {
    this.wonderMap.addControl(control);
  }
}