import { Widget } from '../Widget';

const CSS_PREFIX = 'wondermap-toc';

export class ToC extends Widget {
    
    constructor() {
        super({});

        this.element.className += ' wondermap-toc';

        // static folder must exists in the dist folder and html files must be copied to it!
        let filePath = './static/toc.template.html';
        let selector = '#toc-panel';
        
        this.createPanel(filePath, selector).then((panel) => {
            this.element.appendChild(panel);
        });
    }

    openPanel(): void {
        // define the method here
    };
}