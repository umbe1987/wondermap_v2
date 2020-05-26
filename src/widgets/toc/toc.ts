import { Widget } from '../Widget';
import { WmsParser, WMSLayer } from '../../WmsParser.service';
import { OperationalLayer } from '../../layers/OperationalLayer';
import { WonderMap } from '../../Map';
import LayerGroup from 'ol/layer/Group';
import { genUUID } from '../../random-uuid.service';
import BaseLayer from 'ol/layer/Base';

interface CreateLayerParameters {
    layers: WMSLayer[];
    parent: HTMLElement;
    url: string;
    map: WonderMap;
    group?: LayerGroup;
    index?: number;
}

export class ToC extends Widget {
    
    constructor(map: WonderMap, urls: string[]) {
        super();

        this.element.id = "toc";
        // static folder must exists in the dist folder and html files must be copied to it!
        let filePath = './static/toc.template.html';
        let selector = '#toc-panel';
        
        // creates the widget panel
        this.createPanel(filePath, selector).then(() => {
            urls.map(function (url, idx) {
                WmsParser.getParams(url).then(result => {
                    const wmsLayers = result.layers;
                    const layerGroup = this.createLayers({
                        layers: wmsLayers,
                        parent: (this.panel as HTMLElement),
                        url: url,
                        map: map,
                        index: idx});
                    map.addLayer(layerGroup);
                });
            }, this);
        });

        
    }

    private createLayers({
        layers,
        parent,
        url,
        map,
        group = new LayerGroup(),
        index
    }: CreateLayerParameters) {
        // create an OpenLayers layer or group layer for each layer or group found in WMS
        // create the toc tree and place it inside panel

        const ul = document.createElement('UL');
        ul.classList.add("toc-list");

        layers.forEach(lyr => {
            // generate unique layer identifier
            const uuid = genUUID();

            // build checkbox for layer as HTML Element
            const li = document.createElement('LI');
            const liContent = this.createFieldSet(uuid, lyr.Title);

            liContent.classList.add(lyr.type); // whether it's a group or a layer

            li.appendChild(liContent);

            ul.appendChild(li);

            // if lyr is a layer group
            if (lyr.Layer) {
                const innerGroup = new LayerGroup();
                group.getLayers().insertAt(0, innerGroup);
                this.bindInput(uuid, liContent, innerGroup);
                const groupLi = document.createElement('LI');
                ul.appendChild(groupLi);
                this.createLayers({layers: lyr.Layer,
                    parent: groupLi,
                    url: url,
                    map: map,
                    group: innerGroup});
            }
            // if lyr is a layer (not a group)
            else {
                const opLyr = new OperationalLayer(url, lyr.Name, uuid);
                this.bindInput(uuid, liContent, opLyr);
                group.getLayers().insertAt(0, opLyr);
            }
            parent.insertBefore(ul, parent.children[index]);
        });

        return group;
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

    private bindInput(layerid: string, layerFieldSet: HTMLFieldSetElement, olLayer: BaseLayer) {
        const layerCheckbox = layerFieldSet.children.item(0).children.namedItem(`visible_${layerid}`) as HTMLInputElement;
        layerCheckbox.onchange = (e) => {
            olLayer.setVisible((e.target as HTMLInputElement).checked);
            console.log((e.target as HTMLInputElement).checked);
        };
        layerCheckbox.checked = olLayer.getVisible();
      }
}