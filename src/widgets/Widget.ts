const CSS_PREFIX = 'wondermap-widget';

import image from './missing_icon.svg';

export class Widget {
    private widgetPanel: HTMLElement;
    widgetBox: HTMLElement;
    isActive: boolean = false;
    id: string;
    
    constructor(label: string, img: string = image) {
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
        this.widgetPanel = this.createPanel();
    }

    private createPanel() {
        this.widgetPanel = document.createElement('DIV');
        this.widgetPanel.classList.add("wondermap-panel");
        document.body.appendChild(this.widgetPanel);

        return this.widgetPanel;
    }

    getPanel(): HTMLElement {
        return this.widgetPanel;
    }
}