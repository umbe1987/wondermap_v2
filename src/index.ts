import 'ol/ol.css';
import '../style/wondermap.css'
import { WonderMap } from './Map';
import { WonderLayer } from './layers/OperationalLayer';
import { BasemapLayer } from './layers/BasemapLayer';
import { ToC } from './widgets/toc/toc';

// define layers
const basemaps = [
    new BasemapLayer(),
]
const operationalLayers = [
    new WonderLayer(
    "https://www.wondermap.it/cgi-bin/qgis_mapserv.fcgi?map=/home/umberto/qgis/projects/Demo_sci_WMS/demo_sci.qgs&",
    "piste_sci"
    ),
];
const layers = [basemaps, operationalLayers]

// define map
const map = new WonderMap('map', ...layers);

// define widgets (they will be added in the widget-bar)
const widgets = [new ToC()];