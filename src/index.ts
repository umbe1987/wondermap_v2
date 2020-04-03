import 'ol/ol.css';
import '../style/wondermap.css'
import { WonderMap } from './Map';
import { ToC } from './widgets/toc/toc';

// define map
const map = new WonderMap('map');

// define layers
// TODO: pass layers to the map and remove their definition from Map.ts

// define widgets (they will be added in the widget-bar)
const widgets = [new ToC()];