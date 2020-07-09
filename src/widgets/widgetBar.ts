import { WonderMap } from '../Map';
import { Widget } from './Widget';
import Control from 'ol/control/Control';

export class WidgetBar {
    private map: WonderMap;
    private element: HTMLElement;

    constructor(map: WonderMap, widgets?: Widget[]) {

        this.element = document.getElementById('widget-bar');
        this.map = map;

        if (widgets) {
            widgets.forEach(widget =>
                this.addWidget(widget))
        }
    }

    private addWidget(widget: Widget): void {
        const newWidget = new Control({
            element: widget.element,
            target: this.element,
        })
        this.map.addControl(newWidget);
    }
}