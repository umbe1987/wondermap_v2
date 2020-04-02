import 'ol/ol.css';
import '../style/wondermap.css'
import { WonderMap } from './Map';
import { ToC } from './widgets/toc/toc';

// define widgets
const widgets = [new ToC()];

// define layers
// TODO: pass layers to the map and remove their definition from Map.ts

// define map
const map = new WonderMap('map');
map.addWonderWidgets(widgets);