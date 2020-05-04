import TileLayer from 'ol/layer/Tile';
import TileImage from 'ol/source/TileImage';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import WMTS from 'ol/source/WMTS';
import TileWMS from 'ol/source/TileWMS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import {get as getProjection} from 'ol/proj';
import {getWidth, getTopLeft} from 'ol/extent';

enum BasemapTypes {
    XYZ = 'xyz',
    WMTS = 'wmts',
    TileWMS = 'tile-wms',
}

// needed to build WMTS tileGrid property
// (https://openlayers.org/en/latest/examples/wmts.html?q=wmts)
const projection = getProjection('EPSG:3857');
const projectionExtent = projection.getExtent();
const size = getWidth(projectionExtent) / 256;
let resolutions = new Array(14);
let matrixIds = new Array(14);
for (let z = 0; z < 14; ++z) {
  // generate resolutions and matrixIds arrays for this WMTS
  resolutions[z] = size / Math.pow(2, z);
  matrixIds[z] = z;
}

export class BasemapLayer extends TileLayer {
    source: TileImage;

    constructor(type?: BasemapTypes, url?: string, layer?: string) {
        let source: TileImage;
        switch (type) {
            case BasemapTypes.XYZ: {
                source = new XYZ({url: url});
                break;
            }
            case BasemapTypes.WMTS: {
                source = new WMTS({
                    layer: layer,
                    style: 'default',
                    matrixSet: 'EPSG:3857',
                    url: url,
                    tileGrid: new WMTSTileGrid({
                        origin: getTopLeft(projectionExtent),
                        resolutions: resolutions,
                        matrixIds: matrixIds
                    }),
                });
                break;
            }
            case BasemapTypes.TileWMS: {
                // see defaults for TileWMS 'params' in https://openlayers.org/en/latest/apidoc/module-ol_source_TileWMS-TileWMS.html
                source = new TileWMS({
                    url: url,
                    params: {'LAYERS': layer},
                });
                break;
            }
            default:
                source = new OSM({});
        }
        
        super({source});
        new TileLayer({
            source: this.source,
        })
    }
}