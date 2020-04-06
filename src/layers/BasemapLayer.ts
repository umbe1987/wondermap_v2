import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';


export class BasemapLayer extends TileLayer {

    constructor(url?: string) {
        super();
        new TileLayer({
            source: new OSM()
        })
    }
}