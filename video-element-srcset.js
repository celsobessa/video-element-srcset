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
 *          @param   {string}     videoSources[i][0]    a media string to be tested against
 *          @param   {string}     videoSources[i][1]    a video src, it must be an URL
 *          @param   {string}     videoSources[i][2]    a media string to be signal if the src was loaded fully
 *                                                      Values: 'loaded' or 'not-loaded'.
 *
 * @return {void}
 */

// TODO use of service work and storageCache to avoid unnecessary loading of video files
var videoElementSrcset = function (videoElement, videoSources) {

    console.info('videoElementSrcset init');

    // if videoElement is not provided, get the first video element in the document
    var videoElement = videoElement || document.getElementsByTagName('video')[0];

    //console.info('videoElementSrcset videoElement initial = ', videoElement);

    // if videoSources is not provided, create an empty object
    var videoSources = videoSources || [];

    var videoSourceElement, activeSource, activeBreakpoint, mediaQueriesList, videoSrcSet = '';

    //console.info('videoElementSrcset videoSources initial = ', videoSources);

    // Public APIs
    var publicAPIs = {};

    var installWorker = function () {
        //console.log('init installWorker');
        navigator.serviceWorker.register('./sw-video-cache.js', { scope: './' }).then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            //console.log('ServiceWorker registration failed: ', err);
        });
    }

    // if there's no video element is found, return and show error on console
    if (0 === videoElement.length) {
        //console.error('there is no video element in this document');
        return;
    }

    // if videoSources is an empty object, get all source elements nested inside videoElement
    // if there is no sources, bail and logs to console
    if (!videoSources || 0 === videoSources.length) {
        //console.info('videoSources is empty');
        videoSourceElement = document.querySelector('video source');
        if (0 === videoSourceElement.length) {
            //console.info('there is no source element to this video element');
            return;
        } else {
            //console.info('there is A source element to this video element', videoSourceElement);
        }


        videoSrcSet = videoSourceElement.getAttribute('data-srcset');

        // if there's no data-srcset info, bail and log
        if (!videoSrcSet || '' === videoSrcSet) {
            //console.error('there is no srcset attribute in this source element');
            return;
        }

        //convert data-srcset to an array
        videoSrcSet = videoSrcSet.split(';');

        // loops the through our sources
        for (i = 0; i < videoSrcSet.length; ++i) {
            var components = videoSrcSet[i].split(', ');
            components.push('not-loaded');
            videoSources[components[1]] = components;

            //console.info('videoSources inex ' + i + '=', videoSources[i]);

            //console.info('videoSources index ' + i + '=', videoSources[components[1]]);
        }

        //console.info('videoSources after for ', videoSources);

    } else {
        //console.info('videoSources is NOT empty and is =', videoSources);
    }

    // if default is not provided, let's set it to the initial src element
    if (!videoSources['default'] || '' === videoSources) {

        videoSources['default'] = ['default', videoSourceElement.getAttribute('src'), 'loaded'];

    }//activeSource.

    // an array of media queries to be used with
    mediaQueries = Object.keys(videoSources);

    //console.info('mediaQueries', mediaQueries);

    activeSource = videoSources.default;
    //console.info('activeSource = .default', activeSource);
    publicAPIs.mediaCheck = function (media) {

        //console.info('publicAPIs.mediaCheck init');
        //console.info('publicAPIs.mediaCheck init media = ', media);
        //console.info('publicAPIs.mediaCheck init activeSource = ', activeSource);
        //console.info('publicAPIs.mediaCheck init videoSources[media][1] = ', videoSources[media][1]);

        if (!media || '' === media) {
            //console.error('breakpoint error');
            return;
        }

        if (window.matchMedia(media).matches) {
            //console.info('media matches = ', media);
            if (activeSource !== videoSources[media][0]) {
                //console.info('activeSource !== videoSources[media][1].  activeSource');
                //console.info('videoSources[media][0] = ', videoSources[media][0]);
                //console.info('videoSources[media][2] 1 = ', videoSources[media][2]);
                videoSourceElement.setAttribute('src', videoSources[media][0]);
                //  test if is possible avoid a new load by check if was loaded before
                videoElement.load();
                videoElement.play();
                activeSource = videoSources[media][0];
                //console.info('videoSources[media][2] 2 = ', videoSources[media][2]);

                //console.info('publicAPIs.mediaCheck activeSource after = ', activeSource);
            } else {
                //console.info('activeSource === videoSources[media][1].  activeSource = ');
            }

        } else {
            //console.info('media does not match = ', media);
        }

    }


    publicAPIs.init = function (options) {
        //console.log('publicAPIs.init init ');
        var defaults = {
            serviceWorker: true
        };

        if ( true === defaults.serviceWorker && 'serviceWorker' in navigator ){
            installWorker();
            //console.log('installWorker');
        }

        var mediaQueriesList = [];

        //var mediaQueries = window.matchMedia(mediaQueryList[1]); // Create the query list.

        function handleOrientationChange(evt) {
            //console.log('breakpoint mediaQueryList init for evt = ', evt);
            //console.log('evt.media no init = ', evt.media);
            if (evt.matches) {
                //console.log('breakpoint matches ');
                publicAPIs.mediaCheck(evt.media);
            } else {
                //console.log('breakpoint does not matche');
                publicAPIs.mediaCheck(evt.media);
            }

        }// Define a callback function for the event listener.

        // loops through our mediaQueries list and add matchMedia
        for (i = 0; i < mediaQueries.length; ++i) {
            mediaQueriesList.push(window.matchMedia(mediaQueries[i]));
        }

        // loops through our mediaQueriesList, runs handleOrientationChange once and adds
        // event listener
        for (i = 0; i < mediaQueriesList.length; ++i) {
            handleOrientationChange(mediaQueriesList[i]);
            mediaQueriesList[i].addListener(handleOrientationChange) // call handler function whenever the media query is triggered
        }
        //console.log('publicAPIs.init end ');
    }

    return publicAPIs;
}();