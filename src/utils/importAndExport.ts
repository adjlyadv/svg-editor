export function exportToSvg() {
  const editor = document.getElementById("editor");

  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(editor!);

  source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');

  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
  const blob = new Blob([source], {type: "text/plain"})
  const a = document.createElement('a');
  a.download = 'export.svg';
  a.href = window.URL.createObjectURL(blob);
  a.textContent = 'Download ready';
  a.dataset.downloadurl = ["text/plain", a.download, a.href].join(':');
  a.click();
}
