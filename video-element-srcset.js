// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// MIT license

(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

/**
 * Breakpoint based multiple videos sources for html5 videos
 *
 * Allows the use of multiple videos sources for different breakpoints on HTML5 videos
 *
 * @since      0.1.0
 * @access     public
 *
 * @param   {node}      videoElement    HTML element to be used or the first found video element
 * @param   {array}     videoSources    An array of arrays containing a media string, a video src (URL) string
 *                                      and and string to signaling if the src was fully loaded or not.
 *                                      The key is the media string.
 *          @param   {string}     videoSources[i][0]    device-based breakpoint names to be tested against
 *          @param   {string}     videoSources[i][1]    a video src, it must be an URL
 *          @param   {string}     videoSources[i][2]    a media string to be signal if the src was loaded fully
 *                                                      Values: 'loaded' or 'not-loaded'.
 *
 * @return {void}
 */

 var videoElementSrcset = function (videoElement, videoSources) {

    // declare our variables
    var breakpoint, previousBreakpoint, activeVideoBreakpoint, timeout, videoSourceElement, activeSource, videoSrcSet = '';

    // if videoElement is not provided, get the first video element in the document
    var videoElement = videoElement || document.getElementsByTagName('video')[0];

    // if videoSources is not provided, create an empty object
    var videoSources = videoSources || [];

    // Public APIs
    var publicAPIs = {};

    // breakpoint weights, used to avoid unnecessaries video loading
    var breakpointWeight = {
        '"xsmall"': 1,
        '"small"':  2,
        '"medium"': 3,
        '"large"':  4,
        '"xlarge"': 5
    }

    // install Service Worker to better cache management
    var installWorker = function () {
        navigator.serviceWorker.register('./sw-video-cache.js', { scope: './' }).then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    }

    // Get the current breakpoint
    var getBreakpoint = function () {
        return window.getComputedStyle(document.body, ':before').content;
    };

    // Calculate breakpoint on page load
    breakpoint = previousBreakpoint = activeVideoBreakpoint = getBreakpoint();

    // if there's no video element is found, return and show error on console
    if (0 === videoElement.length) {
        return;
    }

    // if videoSources is an empty object, get all source elements nested inside videoElement
    // if there is no sources, bail and logs to console
    if (!videoSources || 0 === videoSources.length) {


        videoSourceElement = document.querySelector('video source');
        if (0 === videoSourceElement.length) {
            return;
        }

        // get our information from markup
        videoSrcSet = videoSourceElement.getAttribute('data-srcset');

        // if there's no data-srcset info, bail and log
        if (!videoSrcSet || '' === videoSrcSet) {
            return;
        }

        //convert data-srcset to an array
        videoSrcSet = videoSrcSet.split('; ');

        // loops the through our sources
        for (i = 0; i < videoSrcSet.length; ++i) {

            var components = videoSrcSet[i].split(' ');
            videoSources['"' + components[0] + '"'] = [components[1], 'not-loaded'] ;
        }
    }

    // window.resize listener
    var breakpointListener = function () {
        breakpoint = getBreakpoint();

        // triggers only if breakpoint changed and if the new breakpoint is larger than the one
        // which loaded the active video
        if (breakpointWeight[breakpoint] !== breakpointWeight[previousBreakpoint] && breakpointWeight[breakpoint] > breakpointWeight[activeVideoBreakpoint]  ) {
            publicAPIs.manageSrc( breakpoint);
        }

        previousBreakpoint = breakpoint;
        return;
    }

    // manager the source swap
    publicAPIs.manageSrc = function ( breakpoint ) {

        // what is the active src?
        activeSource = videoSourceElement.getAttribute('src');

        // if activeSource URL is the same URL for this breakpoint, do nothing
        if ( activeSource !== videoSources[breakpoint][0]) {

            // let's change the src of the source element
            videoSourceElement.setAttribute('src', videoSources[breakpoint][0]);
            //  test if is possible avoid a new load by check if was loaded before

            // loads videos
            videoElement.load();

            // let's signal this video is loaded
            // TODO: this should be done only after the video fully loads
            videoSources[breakpoint][1] = 'loaded'

            // play it, monkey!
            videoElement.play();

            // update activeSource
            activeSource = videoSources[breakpoint][0];

            // activeVideoBreakpoint
            activeVideoBreakpoint = breakpoint;
        }
        return;

    }

    // init method
    publicAPIs.init = function (options) {

        // defaults
        // TODO merge user options
        // TODO allows overriding of breakpoint weights
        var defaults = {
            serviceWorker: true
        };

        // if the Service Worker is supported, install it to better cache management
        if (true === defaults.serviceWorker && 'serviceWorker' in navigator) {
            //installWorker();
            //console.log('installWorker');
        }

        // run the manageSrc once on load
        publicAPIs.manageSrc(breakpoint);

        // Listen for resize events
        // see https://gomakethings.com/debouncing-events-with-requestanimationframe-for-better-performance/
        window.addEventListener('resize', function (event) {

            // If there's a timer, cancel it
            if (timeout) {
                window.cancelAnimationFrame(timeout);
            }

            // Setup the new requestAnimationFrame()
            timeout = window.requestAnimationFrame(function () {

                // Run our scroll listener
                breakpointListener();

            });

        }, false);

    }

    // return ou publis APIs
    return publicAPIs;
}();