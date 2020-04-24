import axios from 'axios';
import WMSCapabilities from 'ol/format/WMSCapabilities';

// https://www.typescriptlang.org/docs/handbook/advanced-types.html#string-literal-types
type lyrType = "group" | "layer";

export interface WMSLayer {
    Title: string;
    type: lyrType;
    Name?: string;
    Layer?: WMSLayer[];
}

export class WmsParser {
    extent: number[]; // in EPSG:3857
    layers: WMSLayer[];
    // anotherProperty

    constructor(url: string, layers: WMSLayer[] = []) {
        // this.anotherProperty = anotherProperty;
        this.layers = layers;
    }

    private static getLayersFromCapability(lyrCapability: WMSLayer): Promise<WMSLayer[]> {
        if (lyrCapability.Layer) {
            let layerGroup: WMSLayer = {
                Title: lyrCapability.Title,
                Name: lyrCapability.Title, // TO CHANGE: workaround as most root layers do not have Names...
                type: 'group',
                Layer: lyrCapability.Layer,
            };
            
            layerGroup.Layer.forEach(lyr => {
                this.getLayersFromCapability(lyr);
            });
            
            return Promise.resolve([layerGroup]);

        } else if (!lyrCapability.Layer) {
            let layer: WMSLayer = {
                Title: lyrCapability.Title,
                Name: lyrCapability.Name,
                type: 'layer',
            };

            return;
        }
    }

    static async getParams(url: string) {
        // https://stackoverflow.com/a/55211194/1979665
        const parser = new WMSCapabilities();

        url += '&SERVICE=WMS&REQUEST=GetCapabilities';

        try {
            const response = await axios.get(url);
            const result = await parser.read(response.data);
            console.log(result.Capability.Layer);

            const [layers] = await Promise.all(
                [
                    this.getLayersFromCapability(result.Capability.Layer as WMSLayer),
                    // this.anotherStaticMethod(result),
                ]);
            
            return new this(url, layers) //, anotherArg);
        } catch (error) {
            console.error(error);

            return;
        }
    }
}