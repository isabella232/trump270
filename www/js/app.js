/*
 * Run on page load.
 */
var onDocumentLoad = function(e) {
    var baseTableRactive = new Ractive({
        el: '#base-table',
        template: '#base-table-template',
        data: baseData,
        magic: true
    });
}

document.addEventListener('DOMContentLoaded', onDocumentLoad);
