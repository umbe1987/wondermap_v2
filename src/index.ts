import 'ol/ol.css';
import '../style/wondermap.css'
import { WonderMap } from './Map';
import { BasemapLayer } from './layers/BasemapLayer';
import Collection from 'ol/Collection';
import { WidgetBar } from './widgets/widgetBar';
import { ToC } from './widgets/toc/toc';

// define basemaps
const basemaps = new Collection([new BasemapLayer()]);

// define map and add basemaps to it
const map = new WonderMap('map', basemaps);

// define WMS URLs
const layerURLs = ["https://www.wondermap.it/cgi-bin/qgis_mapserv.fcgi?map=/home/umberto/qgis/projects/Demo_sci_WMS/demo_sci.qgs&"];

// define widgets and add them to the widget-bar
const widgets = [
                // define ToC and which layers will be inserted
                new ToC(map, layerURLs)
            ];

// add widgets to the widget bar
new WidgetBar(map, widgets);