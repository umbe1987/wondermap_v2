import { WonderMap } from '../Map';
import { Widget } from './Widget';
import Control from 'ol/control/Control';

export class WidgetBar {
    private map: WonderMap;
    private element: HTMLElement;
    private ul: HTMLUListElement;

    constructor(map: WonderMap, widgets?: Widget[]) {

        this.element = document.getElementById('widget-bar');
        this.ul = document.createElement("ul");
        this.element.appendChild(this.ul);
        this.map = map;

        if (widgets) {
            widgets.forEach(widget =>
                this.addWidget(widget))
        }
    }

    private addWidget(widget: Widget): void {
        const newWidget = new Control({
            element: widget.element,
            target: this.ul,
        })
        this.map.addControl(newWidget);
    }
}