import Control from 'ol/control/Control';
import { getTemplate } from '../get-template.service';

const CSS_PREFIX = 'wondermap-widget';

export abstract class Widget extends Control {
    getTemplate: Function;
    panel: Node;
    btn: HTMLButtonElement;
    
    constructor() {

        const element = document.createElement('div');
        super({element: element});

        this.element = element;
        this.btn = document.createElement('button');
        element.className = CSS_PREFIX + ' ol-unselectable ol-control';
        element.appendChild(this.btn);
    }

    protected async createPanel(file: string, selector: string) {
        this.panel = await getTemplate(file, selector);
        this.element.appendChild(this.panel);
        this.btn.onclick = this.openPanel.bind(this);
    }

    protected abstract openPanel(): void;
}