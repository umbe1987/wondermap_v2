import { Widget } from '../Widget';

export class ToC extends Widget {
    
    constructor() {
        super();

        this.element.classList.add("toc-widget");
        // static folder must exists in the dist folder and html files must be copied to it!
        let filePath = './static/toc.template.html';
        let selector = '#toc';
        
        this.createPanel(filePath, selector);
    }
}