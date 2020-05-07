import { Widget } from '../Widget';
import { WmsParser, WMSLayer } from '../../WmsParser.service';
import { OperationalLayer } from '../../layers/OperationalLayer';
import { WonderMap } from '../../Map';
import { Collection } from 'ol';

export class ToC extends Widget {
    
    constructor(map: WonderMap, urls: string[]) {
        super();

        this.element.id = "toc";
        // static folder must exists in the dist folder and html files must be copied to it!
        let filePath = './static/toc.template.html';
        let selector = '#toc-panel';

        // creates the widget panel
        this.createPanel(filePath, selector).then(() => {
            urls.forEach(url => {
                // parses the WMS GetCapabilities response based of current URL
                const parser = WmsParser.getParams(url);
                parser.then(result => {
                    // place the layer tree inside the panel
                    this.createLayerTree(result.layers, (this.panel as HTMLElement));

                    // create an OpenLayers layer for each layer found in WMS (not group of layers)
                    const OLlayers = this.createMapLayers(url, result.layers);
                    map.addLayers(OLlayers);
                })
            })
        })
    }

    private createLayerTree(layers: WMSLayer[], parent: HTMLElement) {
        const ul = document.createElement('UL');
        ul.classList.add("toc-list");

        layers.forEach(lyr => {
            const li = document.createElement('LI');
            const liContent = this.createCheck(lyr.Name, lyr.Title);
            li.appendChild(liContent);

            ul.appendChild(li);

            if (lyr.Layer) {
                this.createLayerTree(lyr.Layer, ul);
            }
            parent.appendChild(ul);
        });
    }

    private createCheck(code: string, name: string) {
        const fieldset = document.createElement("fieldset");
        fieldset.id = code;

        const label = document.createElement("Label");
        label.setAttribute("for", "visible_" + code);
        label.classList.add("checkbox");

        const input = document.createElement('INPUT');
        input.setAttribute("type", "checkbox");
        input.id = "visible_" + code;
        input.classList.add("visible");

        label.appendChild(input);
        fieldset.appendChild(label);

        const labelText = document.createTextNode(name);
    
        label.appendChild(labelText);
    
        return fieldset;
    }

    private createMapLayers(url:string, layers: WMSLayer[]) {
        let result: Collection<OperationalLayer> | undefined;
        result = new Collection();
        this.eachRecursive(url, layers, result);
        
        return result;
    }

    private eachRecursive(url: string, layers: WMSLayer[], result: Collection<OperationalLayer>) {
        layers.forEach(lyr => {
            if (lyr.type === 'group') {
                this.eachRecursive(url, lyr.Layer, result);
                
            } else {
                result.push(new OperationalLayer(url, lyr.Name));
            }
        })
    }
}