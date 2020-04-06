import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';

export class WonderLayer extends ImageLayer {
    
    constructor(url: string, name: string) {
        super();
        new ImageLayer({
            source: new ImageWMS({
                ratio: 1,
                params: {'LAYERS': name},
                url: url,
            })
        })
    }
}