import 'ol/ol.css';
import '../style/wondermap.css'
import { WonderMap } from './Map';
import { OperationalLayer } from './layers/OperationalLayer';
import { BasemapLayer } from './layers/BasemapLayer';
import Collection from 'ol/Collection';
import { WidgetBar } from './widgets/widgetBar';
import { ToC } from './widgets/toc/toc';

// define layers
const basemaps = [
    new BasemapLayer(),
]
const operationalLayers = [
    new OperationalLayer(
    "https://www.wondermap.it/cgi-bin/qgis_mapserv.fcgi?map=/home/umberto/qgis/projects/Demo_sci_WMS/demo_sci.qgs&",
    "piste_sci"
    ),
];
const layers = new Collection([...basemaps, ...operationalLayers]);

// define map
const map = new WonderMap('map', layers);

// define widgets and add them to the widget-bar)
const widgets = [new ToC(map.getLayers())];
new WidgetBar(map, widgets);