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
                const hr = document.createElement('HR');
                this.panel.appendChild(hr);
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

        if (parent) {
            parent.addEventListener("click", evt => this.toggleContent(evt));
            ul.classList.add('group-content');
        }

        return {layerGroup: group, layerTreeDOM: ul};
    }

    private createDiv(code: string, name: string) {
        const lyrDiv = document.createElement("DIV");
        lyrDiv.id = code;
        var lyrText = document.createTextNode(name);
        lyrDiv.appendChild(lyrText);

        const visibilityInput = document.createElement('INPUT');
        visibilityInput.setAttribute("type", "checkbox");
        visibilityInput.id = "visible_" + code;
        visibilityInput.classList.add("visibility-checkbox");

        const label = document.createElement("Label");
        label.setAttribute("for", "visible_" + code);
        label.classList.add("checkbox");

        lyrDiv.appendChild(visibilityInput);
        lyrDiv.appendChild(label);
    
        return lyrDiv;
    }

    private bindInput(layerid: string, layerDiv: HTMLElement, olLayer: BaseLayer) {
        const visibilityCheckbox = layerDiv.children.namedItem(`visible_${layerid}`) as HTMLInputElement;
        visibilityCheckbox.onchange = (e) => {
            olLayer.setVisible((e.target as HTMLInputElement).checked);
        };
        visibilityCheckbox.checked = olLayer.getVisible();
      }

    private toggleContent(e: Event) {
        // prevent event firing when children are clicked
        if(e.target !== e.currentTarget) {
            return;
        }
        const groupCollapsible = e.target as HTMLElement;
        groupCollapsible.classList.toggle("expanded");
        this.expandContent(groupCollapsible);
    }

    private expandContent(collapsible: HTMLElement) {
        var isExpanded = collapsible.classList.contains('expanded');
        const ulContent = collapsible.children.item(collapsible.children.length - 1) as HTMLElement;
        if (!isExpanded){
            ulContent.style.maxHeight = null;
        } else {
            ulContent.style.maxHeight = ulContent.scrollHeight + "px";
            this.adjustParentMaxHeight(ulContent);
        }
    }

    private adjustParentMaxHeight(childContentDiv: HTMLElement) {
        const parentDiv = childContentDiv.parentElement;
        const parentUlContent = parentDiv.closest('.toc-list');
        // if this ul is the root layer tree
        if (!parentUlContent) {
            return;
        }
        if (parentUlContent === childContentDiv) {
            return;
        }
        const parentCollapsible = parentUlContent.parentElement;
        if (parentCollapsible.classList.contains('expanded')) {
            this.expandContent(parentCollapsible);
        }
    }
}