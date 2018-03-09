// set Event Listeners
// =================================================

if (document.addEventListener) {
    window.addEventListener('load', function () {
        videoElementSrcset.init();
    }, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", function () {
        videoElementSrcset.init();
    });
} else {
    window.onload = function () {
        videoElementSrcset.init();
    };
};