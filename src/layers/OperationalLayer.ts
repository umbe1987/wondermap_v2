import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';

export class WonderLayer extends ImageLayer {
    private wonderLayer: ImageLayer;
    
    constructor(url: string, name: string) {

        const source = new ImageWMS({
            ratio: 1,
            params: {'LAYERS': name},
            url: url,
        });

        super({source});

        this.wonderLayer = new ImageLayer({
            source: source,
        })
    }
}