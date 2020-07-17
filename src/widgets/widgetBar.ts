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
        this.widgetHandler();
    }

    private getWidgets() {
        return this.widgets;
    }

    private widgetHandler() {
        this.getWidgets().forEach(widget => {
            widget.widgetBox.onclick = this.toggleWidgetPanel.bind(widget);
        })
    }

    // this context is changed to be widget, see
    // https://stackoverflow.com/a/49456625/1979665
    private toggleWidgetPanel(this: Widget) {
        if (this.getPanel().classList.contains("active")) {
            closePanel(this);
        } else {
            openPanel(this);
        }

        function openPanel(widget: Widget) {
            widget.getPanel().classList.add("active");
        }

        function closePanel(widget: Widget) {
            widget.getPanel().classList.remove("active");
        }
    }

    getActiveWidgets() {
        this.getWidgets().map(widget => {
            console.log(`${widget.id}: ${widget.isActive}`);
        })
    }
}