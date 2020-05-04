import { Widget } from '../Widget';
import { WmsParser, WMSLayer } from '../../WmsParser.service';
import { OperationalLayer } from '../../layers/OperationalLayer';
import { BasemapLayer } from '../../layers/BasemapLayer';
import Collection from 'ol/Collection';

export class ToC extends Widget {
    
    constructor(layers: Collection<OperationalLayer | BasemapLayer>) {
        super();

        this.element.id = "toc";
        // static folder must exists in the dist folder and html files must be copied to it!
        let filePath = './static/toc.template.html';
        let selector = '#toc-panel';
        
        this.createPanel(filePath, selector).then(() => {
            layers.forEach(lyr => {
                if (lyr.type === 'operational') {
                    const parser = WmsParser.getParams(lyr.getSource().get('url'));
                    parser.then(result => {
                        this.listLayers(result.layers, (this.panel as HTMLElement));
                    })
                }
                
            });
        });
    }

    private listLayers(layers: WMSLayer[], parent: HTMLElement) {
        const ul = document.createElement('UL');

        layers.forEach(lyr => {
            const li = document.createElement('LI');
            const liContent = createCheck(lyr.Name, lyr.Title);
            li.appendChild(liContent[0]); // <input>
            li.appendChild(liContent[1]); // <label>

            ul.appendChild(li);

            if (lyr.Layer) {
                this.listLayers(lyr.Layer, ul);
            }
            parent.appendChild(ul);
        });
    }
}

function createCheck(code: string, name: string) {
    const input = document.createElement('INPUT');
    input.setAttribute("type", "checkbox");
    input.id = code;
    input.setAttribute("value", code);

    const label = document.createElement("Label");
    label.setAttribute("for", code);

    const labelText = document.createTextNode(name);

    label.appendChild(labelText);

    return [input, label];
}