import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import { OperationalLayer } from './layers/OperationalLayer';
import { BasemapLayer } from './layers/BasemapLayer';
import { WondermapLayer } from './layers/LayerInterface';

export class WonderMap extends Map {
    private wonderMap: Map;

    constructor(id: string) {
      super({});
      this.wonderMap = new Map({
        target: document.getElementById(id),
        view: new View({
          center: [0, 0],
          zoom: 0
        })
      });

      // add basemap to map
      this.addWonderBasemap(new BasemapLayer("OSM"));

      // add operational layers to map
      this.addWonderLayer(new OperationalLayer(
        "piste da sci",
        "https://www.wondermap.it/cgi-bin/qgis_mapserv.fcgi?map=/home/umberto/qgis/projects/Demo_sci_WMS/demo_sci.qgs&",
        "piste_sci"
      ));
    }

    private addWonderLayer(layer: WondermapLayer): void {
      const olLyr = new ImageLayer({
        source: new ImageWMS({
            ratio: 1,
            params: {'LAYERS': layer.layerName},
            url: layer.url
        })
      })
      this.wonderMap.addLayer(olLyr);
      olLyr.set('title', layer.title);
    }

    private addWonderBasemap(basemap: WondermapLayer): void {
      const baseLyr = new TileLayer({
        source: new OSM()
      })
      this.wonderMap.addLayer(baseLyr);
      baseLyr.set('title', basemap.title);
      baseLyr.set('type', basemap.type);
  }
}