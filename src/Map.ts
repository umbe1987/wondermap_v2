import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import { OperationalLayer, BasemapLayer } from './Layer';

export class WonderMap {
    private olMap: Map;

    constructor(id: string) {
        this.olMap = new Map({
            target: document.getElementById(id),
            view: new View({
              center: [0, 0],
              zoom: 0
            })
        })
        this.addWonderBasemap(new BasemapLayer("OSM"));
        this.addWonderLayer(new OperationalLayer(
          "piste da sci",
          "https://www.wondermap.it/cgi-bin/qgis_mapserv.fcgi?map=/home/umberto/qgis/projects/Demo_sci_WMS/demo_sci.qgs&",
          "piste_sci"
        ))
    }

    private addWonderLayer(layer: OperationalLayer): void {
        this.olMap.addLayer(new ImageLayer({
          title: layer.title,
          source: new ImageWMS({
              ratio: 1,
              params: {'LAYERS': layer.layerName},
              url: layer.url
          })
      }));
    }

    private addWonderBasemap(basemap: BasemapLayer): void {
      this.olMap.addLayer(new TileLayer({
        title: basemap.title,
        type: basemap.type,
        source: new OSM()
      }));
  }
}