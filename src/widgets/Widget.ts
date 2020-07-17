import { getTemplate } from '../get-template.service';

const CSS_PREFIX = 'wondermap-widget';

export abstract class Widget {
    widgetPanel: HTMLElement;
    widgetBox: HTMLElement;
    isActive: boolean = false;
    id: string;
    
    constructor(label: string, img: string) {

        this.widgetBox = document.createElement('div');
        this.widgetBox.className = CSS_PREFIX;
        const labelDiv = document.createElement('div');
        const labelText = document.createTextNode(label);
        labelDiv.appendChild(labelText);
        const labelImg = document.createElement('img');
        labelImg.src = img;
        this.widgetBox.appendChild(labelDiv);
        this.widgetBox.appendChild(labelImg);
        this.id = label;
    }

    protected async createPanel(file: string, selector: string) {
        const panelContent = await getTemplate(file, selector);
        this.widgetPanel = document.createElement('DIV');
        this.widgetPanel.classList.add("wondermap-panel");
        this.widgetPanel.appendChild(panelContent);
        document.body.appendChild(this.widgetPanel);
        // bind this object to give context to openPanel
        // function assigned to onclick event function
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
        this.widgetBox.onclick = this.togglePanel.bind(this);

        return this.widgetPanel;
    }

    private togglePanel(): void {
        if (this.widgetPanel.classList.contains("active")) {
            this.closePanel();
            this.isActive = false;
        } else {
            this.openPanel();
            this.isActive = true;
        }
    }

    private openPanel(): void {
        this.widgetPanel.classList.add("active");
    };

    private closePanel(): void {
        this.widgetPanel.classList.remove("active");
    };

    protected getPanelContent(): HTMLElement {
        return this.widgetPanel.firstElementChild as HTMLElement;
    }
}