export function createLinkDownload(blob, filename) {
    let fileURL = window.URL.createObjectURL(new Blob([blob]));
    let fileLink = document.createElement('a');
    
    fileLink.href = fileURL;
    fileLink.setAttribute('download',filename);
    document.body.appendChild(fileLink);

    fileLink.click()
}