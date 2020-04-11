import Control from 'ol/control/Control';
import { getTemplate } from '../get-template.service';

const CSS_PREFIX = 'wondermap-widget';

export abstract class Widget extends Control {
    element: HTMLElement;
    panel: Node;
    btn: HTMLButtonElement;
    
    constructor() {

        const widgetBar = document.getElementById('widget-bar');
        super({element: widgetBar,
            target: widgetBar});

        this.element = widgetBar;
        this.btn = document.createElement('button');
        this.element.className = CSS_PREFIX;
        this.element.appendChild(this.btn);
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
        (this.panel as HTMLElement).classList.add("active");
    };
}