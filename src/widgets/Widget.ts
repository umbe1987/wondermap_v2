import Control from 'ol/control/Control';
import { getTemplate } from '../get-template.service';

const CSS_PREFIX = 'wondermap-widget';

export abstract class Widget extends Control {
    getTemplate: Function;
    panel: Node;
    
    constructor(opt_options?) {

        const options = opt_options || {};

        const element = document.createElement('div');
        super({element: element,
            target: options.target});

        const button = document.createElement('button');
        element.className = CSS_PREFIX + ' ol-unselectable ol-control';
        element.appendChild(button);

        button.onclick = this.openPanel;
    }

    protected async createPanel(file: string, selector: string) {
        return await getTemplate(file, selector);
    }

    protected abstract openPanel(): void;
}