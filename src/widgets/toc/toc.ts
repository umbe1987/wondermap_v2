import { Widget } from '../Widget';
import { WmsParser, WMSLayer } from '../../WmsParser.service';
import { OperationalLayer } from '../../layers/OperationalLayer';
import { WonderMap } from '../../Map';
import LayerGroup from 'ol/layer/Group';
import { genUUID } from '../../random-uuid.service';

export class ToC extends Widget {
    
    constructor(map: WonderMap, urls: string[]) {
        super();

        this.element.id = "toc";
        // static folder must exists in the dist folder and html files must be copied to it!
        let filePath = './static/toc.template.html';
        let selector = '#toc-panel';
        
        // creates the widget panel
        this.createPanel(filePath, selector).then(() => {
            urls.map(function (url) {
                WmsParser.getParams(url).then(result => {
                    const wmsLayers = result.layers;
                    this.createLayers(wmsLayers, (this.panel as HTMLElement), url, map);
                });
            }, this);
        });

        
    }

    private createLayers(layers: WMSLayer[], parent: HTMLElement, url: string, map: WonderMap, group = new LayerGroup()) {
        // create an OpenLayers layer or group layer for each layer or group found in WMS
        // create the toc tree and place it inside panel

        let tocLayers: HTMLFieldSetElement[] = [];
        const ul = document.createElement('UL');
        ul.classList.add("toc-list");

        layers.forEach(lyr => {
            // generate unique layer identifier
            const uuid = genUUID();

            // build checkbox for layer as HTML Element
            const li = document.createElement('LI');
            const liContent = this.createFieldSet(uuid, lyr.Title);

            liContent.classList.add(lyr.type); // whether it's a group or a layer

            tocLayers.push(liContent);
            li.appendChild(liContent);

            ul.appendChild(li);

            if (lyr.Layer) {
                tocLayers.push(...this.createLayers(lyr.Layer, ul, url, map, group));
            }
            const opLyr = new OperationalLayer(url, lyr.Name, uuid);
            map.addLayer(opLyr);
            this.bindInput(uuid, liContent, opLyr);
                
            group.getLayers().push(opLyr);
            parent.appendChild(ul);
        }, tocLayers);

        return tocLayers;
    }

    private createFieldSet(code: string, name: string) {
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

    private bindInput(layerid: string, layerFieldSet: HTMLFieldSetElement, olLayer: OperationalLayer) {
        const layerCheckbox = layerFieldSet.children.item(0).children.namedItem(`visible_${layerid}`) as HTMLInputElement;
        layerCheckbox.onchange = function(e) {
            olLayer.setVisible((e.target as HTMLInputElement).checked);
            console.log((e.target as HTMLInputElement).checked);
        };
        layerCheckbox.checked = olLayer.getVisible();
      }
}