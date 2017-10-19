/**
* Libairie simplePopup
* Utilisé pour afficher des popup
* Exemple : simplePopup.openWindow("http://google.fr/", "1080px", "50%")
* Léo GRAND - 26/07/2017
*/
(function(window) {

    "use strict";

    /**
     * Display errors
     * @param {string} err - error to show
     */
    function errorDisplay(err) {
        window.console.error("simplePopup error: " + err);
        return false;
    }

    /**
     * Parse value of popup size
     * @param {string} param - value in pixel, % or ratio
     * @return {Object} - object contains popup sizes
     */
    function parseSize(param) {

        var result = {
            size: "",
            isRatio: false,
            isPourcentage: false,
            isPixel: false
        };

        var size = param.toLowerCase().replace(" ", "");

        /** Pixel */
        if (size.match(/px/)) {

            result.isPixel = true;
            result.size = Number(size.slice(0, -2));

            // check if size is a number
            if (result.size) {
                return result;
            } else {
                return errorDisplay("expected valid number");
            }
        }

        /** Ratio */
        else if (size.match(/ratio:/)) {

            result.isRatio = true;
            result.size = Number(size.slice(6));

            // check if size is a number
            if (result.size) {
                return result;
            } else {
                return errorDisplay("expected valid number");
            }
        }

        /** % */
        else if (size.match(/%/)) {

            result.isPourcentage = true;
            result.size = Number(size.slice(0, -1));

            // check if size is a number
            if (result.size) {
                return result;
            } else {
                return errorDisplay("expected valid number");
            }
        }

        /** default pixel */
        else {
            result.isPixel = true;
            result.size = Number(size);

            // check if size is a number
            if (result.size) {
                return result;
            } else {
                return errorDisplay("expected valid number");
            }
        }
    }


    /**
     * Transform values in pixel
     * @param {string} width - width of popup 
     * @param {string} height - height of popup
     * @return {Object} result - object contain pixels size
     */
    function getPixel(width, height) {

        var result = {
            height: "",
            width: ""
        };

        var size = {
            height: parseSize(height),
            width: parseSize(width)
        };

        var sizeScreen = {
            height: screen.availHeight,
            width: screen.availWidth
        };

        if (size.height.isPixel) {
            result.height = size.height.size;
        }

        if (size.height.isPourcentage) {
            result.height = size.height.size * sizeScreen.height / 100;
        }

        if (size.width.isPixel) {
            result.width = size.width.size;
        }

        if (size.width.isPourcentage) {
            result.width = size.width.size * sizeScreen.width / 100;
        }

        if (size.width.isRatio) {
            result.width = result.height * size.width.size;
        }

        if (size.height.isRatio) {
            result.height = result.width * size.height.size;
        }

        return result;
    }

    /**
     * find screen and popup size
     * @param {string} w - widht of popup
     * @param {string} h - height of popup
     */
    function findCenter(w, h) {
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;

        return {
            top: top,
            left: left
        };
    }

    /**
     * Open popup
     * @param {string} url - url to open in popup
     * @param {Object} windowSize - size of popup
     * @param {bool} centered
     */
    function windowOpener(url, windowSize, centered) {
        if (centered) {
            var center = findCenter(windowSize.width, windowSize.height);
            return window.open(url, "", "height=" + windowSize.height + ", width=" + windowSize.width + ', top=' + center.top + ' , left=' + center.left);
        } else {
            return window.open(url, "", "height=" + windowSize.height + ", width=" + windowSize.width);
        }
    }

    /**
     * Display errors
     * @param {string} url - url to check
     * @return {bool} - false if error, true if valid
     */
    function validateParams(url) {
        if (typeof url != "string") {
            errorDisplay("url must be a string, got" + typeof url);
            return false;
        }
        return true;
    }

    /**
     * Open a page in an other window
     * @param {string} url - url to open in popup
     * @param {string} width - width of popup (px, % ou ratio:)
     * @param {string} height - height of popup (px, % ou ratio:)
     * @param {bool} center - if null or true, popup is centered
     */
    function openWindow(url, width, height, center) {

        if (typeof center === "undefined") {
            center = true;
        }

        var val = validateParams(url);

        if (val) {
            var windowConstructor = getPixel(width, height);
            windowOpener(url, windowConstructor, center);
        }
    }

    /**
     * define lib and inject in window
     * @return {Object}
     */
    function define() {
        var simplePopup = {};
        simplePopup.openWindow = openWindow;
        return simplePopup;
    }

    if (typeof(simplePopup) === 'undefined') {
        window.simplePopup = define();
    }

})(window);
