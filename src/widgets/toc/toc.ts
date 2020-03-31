import { Widget } from '../Widget';

const TOC_CLASS = ' wondermap-toc';

export class ToC extends Widget {
    
    constructor() {
        super();

        this.element.className += TOC_CLASS;

        // static folder must exists in the dist folder and html files must be copied to it!
        let filePath = './static/toc.template.html';
        let selector = '#toc-panel';
        
        this.createPanel(filePath, selector);
    }

    openPanel(): void {
        (this.panel as HTMLElement).style.display = "block"; 
    };
}