import 'ol/ol.css';
import '../style/wondermap.css'
import { WonderMap } from './Map';
import { BasemapLayer } from './layers/BasemapLayer';
import LayerGroup from 'ol/layer/Group';
import { WidgetBar } from './widgets/widgetBar';
import { ToC } from './widgets/toc/toc';

// define basemaps
const basemaps = new LayerGroup({
    layers: [
        new BasemapLayer()
    ]});

// define map and add basemaps to it
const map = new WonderMap('map', basemaps);

// define WMS URLs
const layerURLs = ["https://www.wondermap.it/cgi-bin/qgis_mapserv.fcgi?map=/home/umberto/qgis/projects/Demo_sci_WMS/demo_sci.qgs&",
"http://servizigis.regione.emilia-romagna.it/wms/areeprotette_natura2000?",
"https://www.gebco.net/data_and_products/gebco_web_services/2019/mapserv?"];

// define widgets and add them to the widget-bar
const widgets = [
                // define ToC and which layers will be inserted
                new ToC(map, layerURLs)
            ];

// add widgets to the widget bar
new WidgetBar(map, widgets);