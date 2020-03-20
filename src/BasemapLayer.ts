export class BasemapLayer {
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