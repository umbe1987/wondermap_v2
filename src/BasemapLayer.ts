export class BasemapLayer {
    title: string;
    type: string;
    url?: string;
    fold?: string;

    constructor(title: string, url?: string) {
        this.type = 'base';
        this.title = title;
        this.url = url;

    }
}