import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import { WonderLayer } from './WonderLayer';

export class OperationalLayer extends ImageLayer implements WonderLayer {
    private operationalLayer: ImageLayer;
    type: string;
    
    constructor(url: string, name: string) {

        const source = new ImageWMS({
            ratio: 1,
            params: {'LAYERS': name},
            url: url,
        });

        super({source});

        this.type = 'operational';

        this.operationalLayer = new ImageLayer({
            source: source,
        })
    }
}