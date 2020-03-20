interface WonderLayer {
    title: string;
    layerName?: string;
    url?: string;
}

export class OperationalLayer implements WonderLayer {
    title: string;
    url: string;
    layerName: string;
    fold?: string;

    constructor(title: string, url: string, name: string, fold?: string) {
        this.title = title;
        this.url = url;
        this.layerName = name;
        this.fold = 'open';

    }
}

export class BasemapLayer implements WonderLayer {
    title: string;
    url?: string;
    type: string;
    fold?: string;

    constructor(title: string, url?: string) {
        this.type = 'base';
        this.title = title;
        this.url = url;

    }
}