import { Widget } from '../Widget';

const CSS_PREFIX = 'wondermap-toc';

export class ToC extends Widget {
    
    constructor() {
        super({});

        this.element.className += ' wondermap-toc';
    }
}