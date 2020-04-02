import {Map, View} from 'ol';
import { Widget } from '../Widget';

export class RootWidget extends Widget {
    widgets: Widget[];
    
    constructor(widgets: Widget[], map: Map) {
        super();

        this.element.classList.add("root-widget");

        this.widgets = widgets;
        this.createWidgets(map, this.widgets);

        // bind this object to give context to openPanel
        // function assigned to onclick event function
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
        this.btn.onclick = this.showWidgets.bind(this);
    }

    private createWidgets(map: Map, widget: Widget[]): void {
        this.widgets.forEach(function(widget) {
            map.addControl(widget);
        })
    }

    private showWidgets(): void {
        this.widgets.forEach(function(widget) {
            widget.element.style.visibility = "visible";
        })
    }
}