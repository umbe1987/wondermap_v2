import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';

export class OperationalLayer extends ImageLayer {
    private operationalLayer: ImageLayer;
    id: String;
    
    constructor(url: string, name: string, id: string) {
        const source = new ImageWMS({
            ratio: 1,
            params: {'LAYERS': name},
            url: url,
        });

        super({source});

        this.id = id;

        this.operationalLayer = new ImageLayer({
            source: source,
        })
    }
}