import { Widget } from '../Widget';
import { WmsParser, WMSLayer } from '../../WmsParser.service';
import { OperationalLayer } from '../../layers/OperationalLayer';
import { WonderMap } from '../../Map';
import LayerGroup from 'ol/layer/Group';
import { genUUID } from '../../random-uuid.service';
import BaseLayer from 'ol/layer/Base';

interface CreateLayerParameters {
    layers: WMSLayer[];
    parent?: HTMLElement;
    url: string;
    map: WonderMap;
    group?: LayerGroup;
}

export class ToC extends Widget {
    
    constructor(private map: WonderMap, private urls: string[]) {
        super();
        this.map = map;
        this.urls = urls;

        this.element.id = "toc";
        // static folder must exists in the dist folder and html files must be copied to it!
        let filePath = './static/toc.template.html';
        let selector = '#toc-panel';
        
        // creates the widget panel
        this.createPanel(filePath, selector).then(async () => {
            // generate ol and DOM tree Layers for each WMS URL 
            const layers = await Promise.all(urls.map(url => {
                return this.getLayersFromWMS(url);
            }))
            layers.forEach(layer => {
                // add layers to the map (position 1 because basemaps are already there)
                // IMPORTANT: when new layers are added, they cover the others,that's why we use insertAt instead of addLayer!
                this.map.getLayers().insertAt(1, layer.layerGroup);
                // add layer tree to the panel
                this.panel.appendChild(layer.layerTreeDOM);
            });
        });
    }

    private async getLayersFromWMS(url: string) {
        const parser = await WmsParser.getParams(url);
        const wmsLayers = parser.layers;
        const wonderLayers = this.createLayers({
            layers: wmsLayers,
            url: url,
            map: this.map
        });

        return wonderLayers;
    }

    private createLayers({
        layers,
        url,
        map,
        parent,
        group = new LayerGroup()
    }: CreateLayerParameters) {
        // create an OpenLayers layer or group layer for each layer or group found in WMS
        // create the toc tree DOM
        const ul = document.createElement('UL');
        ul.classList.add("toc-list");
        const li = document.createElement('LI');
        ul.appendChild(li);

        layers.forEach(lyr => {
            // generate unique layer identifier
            const uuid = genUUID();
            const lyrDiv = this.createDiv(uuid, lyr.Title);

            lyrDiv.classList.add(lyr.type); // whether it's a group or a layer
            li.appendChild(lyrDiv);

            // if lyr is a layer group
            if (lyr.type === 'group') {
                const innerGroup = new LayerGroup();
                group.getLayers().insertAt(0, innerGroup);

                this.bindInput(uuid, lyrDiv, innerGroup);
                this.createLayers({layers: lyr.Layer,
                    url: url,
                    map: map,
                    parent: lyrDiv,
                    group: innerGroup}).layerTreeDOM;
            }
            // if lyr is a layer (not a group)
            else {
                const opLyr = new OperationalLayer(url, lyr.Name, uuid);
                this.bindInput(uuid, lyrDiv, opLyr.getLayer());
                group.getLayers().insertAt(0, opLyr.getLayer());
            }
            if (parent) {
                parent.appendChild(ul);
            }
        });

        return {layerGroup: group, layerTreeDOM: ul};
    }

    private createDiv(code: string, name: string) {
        const lyrDiv = document.createElement("DIV");
        lyrDiv.id = code;

        const label = document.createElement("Label");
        label.setAttribute("for", "visible_" + code);
        label.classList.add("checkbox");

        const input = document.createElement('INPUT');
        input.setAttribute("type", "checkbox");
        input.id = "visible_" + code;
        input.classList.add("visible");

        label.appendChild(input);
        lyrDiv.appendChild(label);

        const labelText = document.createTextNode(name);
    
        label.appendChild(labelText);
    
        return lyrDiv;
    }

    private bindInput(layerid: string, layerDiv: HTMLElement, olLayer: BaseLayer) {
        const layerCheckbox = layerDiv.children.item(0).children.namedItem(`visible_${layerid}`) as HTMLInputElement;
        layerCheckbox.onchange = (e) => {
            olLayer.setVisible((e.target as HTMLInputElement).checked);
        };
        layerCheckbox.checked = olLayer.getVisible();
      }
}