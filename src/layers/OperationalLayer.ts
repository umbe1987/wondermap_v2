import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';

export class OperationalLayer{
    private operationalLayer: TileLayer;
    id: String;
    
    constructor(url: string, name: string, id: string) {
        const source = new TileWMS({
            params: {'LAYERS': name},
            url: url,
        });

        this.id = id;

        this.operationalLayer = new TileLayer({
            source: source,
        })
    }

    getLayer() {
        return this.operationalLayer;
    }
}