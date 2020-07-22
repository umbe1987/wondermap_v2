import { Subject, fromEvent } from 'rxjs';

import { WonderMap } from '../Map';
import { Widget } from './Widget';
import Control from 'ol/control/Control';

interface widgetStatus {
    id: string;
    isActive: boolean;
}

export class WidgetBar {
    private map: WonderMap;
    private element: HTMLElement;
    private widgets: Widget[];
    private widgetActivated$: Subject<widgetStatus>;

    constructor(map: WonderMap, widgets?: Widget[]) {

        this.element = document.getElementById('widget-bar');
        this.map = map;
        this.widgetActivated$ = new Subject();
        this.widgets = [];

        if (widgets) {
            widgets.forEach(widget =>
                this.addWidget(widget));
        }
    }

    private addWidget(widget: Widget): void {
        this.widgets.push(widget);
        const newWidget = new Control({
            element: widget.widgetBox,
            target: this.element,
        })
        this.map.addControl(newWidget);
        this.widgetHandler(widget);
    }

    private getWidgets() {
        return this.widgets;
    }

    private widgetHandler(widget: Widget) {
        fromEvent(widget.widgetBox, 'click').subscribe(
            () => this.toggleWidgetPanel(widget)
        );
        this.widgetActivated$.subscribe(status => {
            const widgetsToClose = this.getWidgets().filter(widget => 
                widget.isActive === true && widget.id !== status.id);
            if (widgetsToClose) {
                widgetsToClose.forEach(widgetToClose => this.closePanel(widgetToClose));
            }
        })
    }

    private toggleWidgetPanel(widget: Widget) {
        if (!widget.getPanel().classList.contains("active")) {
            this.openPanel(widget);
        } else {
            this.closePanel(widget);
        }
    }

    private openPanel(widget: Widget) {
        widget.getPanel().classList.add("active");
        widget.isActive = true;
        this.widgetActivated$.next(this.getWidgetStatus(widget));
    }

    private closePanel(widget: Widget) {
        widget.getPanel().classList.remove("active");
    }

    private getWidgetStatus(widget: Widget): widgetStatus {
        return {id: widget.id, isActive: widget.isActive};
    }
}