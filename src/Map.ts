import {Map, View} from 'ol';
import { OperationalLayer } from './layers/OperationalLayer';
import { BasemapLayer } from './layers/BasemapLayer';
import Control from 'ol/control/Control';
import Collection from 'ol/Collection';
import LayerGroup from 'ol/layer/Group';
import BaseLayer from 'ol/layer/Base';

export class WonderMap {
  private wonderMap: Map;

  // https://stackoverflow.com/a/43326461/1979665
  constructor(id: string, layers: LayerGroup) {
    this.wonderMap = new Map({
      target: document.getElementById(id),
      view: new View({
        center: [0, 0],
        zoom: 0
      })
    });
    
    // add layers
    layers.getLayers().forEach(lyr => {
      this.addLayer(lyr);
    })
    
  }

  addLayer(layer: BaseLayer) {
    this.wonderMap.addLayer(layer);
  }

  getLayers(): Collection<OperationalLayer | BasemapLayer> {
    return this.wonderMap.getLayers() as Collection<OperationalLayer | BasemapLayer>;
  }

  getLayerGroup() {
    return this.wonderMap.getLayerGroup;
  }

  addControl(control: Control) {
    this.wonderMap.addControl(control);
  }
}