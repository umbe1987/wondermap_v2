import { WonderMap } from '../Map';
import { Widget } from './Widget';
import Control from 'ol/control/Control';

export class WidgetBar {
    private map: WonderMap;
    private element: HTMLElement;
    private widgets: Widget[];

    constructor(map: WonderMap, widgets?: Widget[]) {

        this.element = document.getElementById('widget-bar');
        this.map = map;
        this.widgets = [];

        if (widgets) {
            widgets.forEach(widget =>
                this.addWidget(widget))
        }
    }

    private addWidget(widget: Widget): void {
        this.widgets.push(widget);
        const newWidget = new Control({
            element: widget.widgetBox,
            target: this.element,
        })
        this.map.addControl(newWidget);
    }

    private getWidgets() {
        return this.widgets;
    }

    getActiveWidgets() {
        this.getWidgets().map(widget => {
            console.log(`${widget.id}: ${widget.isActive}`);
        })
    }
}