import { getTemplate } from '../get-template.service';

const CSS_PREFIX = 'wondermap-widget';

export abstract class Widget {
    panel: Node;
    element: HTMLDivElement;
    
    constructor(label: string, img: string) {

        this.element = document.createElement('div');
        this.element.className = CSS_PREFIX;
        const labelDiv = document.createElement('div');
        const labelText = document.createTextNode(label);
        labelDiv.appendChild(labelText);
        const labelImg = document.createElement('img');
        labelImg.src = img;
        this.element.appendChild(labelDiv);
        this.element.appendChild(labelImg);
    }

    protected async createPanel(file: string, selector: string) {
        this.panel = await getTemplate(file, selector);
        (this.panel as HTMLElement).classList.add("wondermap-panel");
        document.body.appendChild(this.panel);
        // bind this object to give context to openPanel
        // function assigned to onclick event function
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
        this.element.onclick = this.togglePanel.bind(this);

        return this.panel;
    }

    private togglePanel(): void {
        if ((this.panel as HTMLElement).classList.contains("active")) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    }

    private openPanel(): void {
        (this.panel as HTMLElement).classList.add("active");
    };

    private closePanel(): void {
        (this.panel as HTMLElement).classList.remove("active");
    }
}