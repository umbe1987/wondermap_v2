import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';

export class OperationalLayer extends ImageLayer {
    private operationalLayer: ImageLayer;
    
    constructor(url: string, name: string) {

        const source = new ImageWMS({
            ratio: 1,
            params: {'LAYERS': name},
            url: url,
        });

        super({source});

        this.operationalLayer = new ImageLayer({
            source: source,
        })
    }
}