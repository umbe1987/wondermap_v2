import 'ol/ol.css';
import '../style/wondermap.css'
import { WonderMap } from './Map';
import { ToC } from './widgets/toc/toc';

// define map
const map = new WonderMap('map');

// define layers
// TODO: pass layers to the map and remove their definition from Map.ts

// define widgets
const widgets = [new ToC()];

// add widgets to widget-bar
const widgetBar = document.getElementById("widget-bar");