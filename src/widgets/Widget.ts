import Control from 'ol/control/Control';
import { getTemplate } from '../get-template.service';

const CSS_PREFIX = 'wondermap-widget';

export abstract class Widget extends Control {
    getTemplate: Function;
    element: HTMLElement;
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
        (this.panel as HTMLElement).classList.add("wondermap-panel");
        this.element.appendChild(this.panel);
        // bind this object to give context to openPanel
        // function assigned to onclick event function
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
        this.btn.onclick = this.openPanel.bind(this);
    }

    private openPanel(): void {
        (this.panel as HTMLElement).style.height = "100%";
    };
}