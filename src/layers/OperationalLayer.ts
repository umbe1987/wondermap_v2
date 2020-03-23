export class OperationalLayer {
    title: string;
    url: string;
    layerName: string;

    constructor(title: string, url: string, name: string, fold?: string) {
        this.title = title;
        this.url = url;
        this.layerName = name;

    }
}