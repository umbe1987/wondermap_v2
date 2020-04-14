import { getTemplate } from '../get-template.service';

const CSS_PREFIX = 'wondermap-widget';

export abstract class Widget {
    panel: Node;
    element: HTMLLIElement;
    
    constructor() {

        this.element = document.createElement('li');
        this.element.className = CSS_PREFIX;
    }

    protected async createPanel(file: string, selector: string) {
        this.panel = await getTemplate(file, selector);
        (this.panel as HTMLElement).classList.add("wondermap-panel");
        document.body.appendChild(this.panel);
        // bind this object to give context to openPanel
        // function assigned to onclick event function
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
        this.element.onclick = this.openPanel.bind(this);
    }

    private openPanel(): void {
        (this.panel as HTMLElement).classList.add("active");
    };
}