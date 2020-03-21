import Control from 'ol/control/Control';

const CSS_PREFIX = 'wondermap-toc';

export class ToC extends Control {
    
    constructor(opt_options) {

        const options = opt_options || {};

        const element = document.createElement('div');
        super({element: element,
            target: options.target});

        const button = document.createElement('button');
        element.className = CSS_PREFIX + ' ol-unselectable ol-control';
        element.appendChild(button);
    }
}