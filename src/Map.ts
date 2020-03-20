import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import { OperationalLayer } from './OperationalLayer';
import { BasemapLayer } from './BasemapLayer';
import { WondermapLayer } from './LayerInterface';
import { ToC } from './widgets/toc';

export class WonderMap {
    private olMap: Map;

    constructor(id: string) {
        this.olMap = new Map({
            target: document.getElementById(id),
            view: new View({
              center: [0, 0],
              zoom: 0
            })
        });

        this.olMap.addControl(new ToC());

        this.addWonderBasemap(new BasemapLayer("OSM"));

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
      this.olMap.addLayer(olLyr);
      olLyr.set('title', layer.title);
    }

    private addWonderBasemap(basemap: WondermapLayer): void {
      const baseLyr = new TileLayer({
        source: new OSM()
      })
      this.olMap.addLayer(baseLyr);
      baseLyr.set('title', basemap.title);
      baseLyr.set('type', basemap.type);
  }
}