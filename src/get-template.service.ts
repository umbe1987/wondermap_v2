// https://stackoverflow.com/a/54471296/1979665
export async function getTemplate(filepath: string, selectors: string) {
    let response = await fetch(filepath);
    let txt = await response.text();

    let html =  new DOMParser().parseFromString(txt, 'text/html');

    return html.querySelector(selectors) as HTMLElement;
}