(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index-exposed.ts":
/*!******************************!*\
  !*** ./src/index-exposed.ts ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ___EXPOSE_LOADER_IMPORT___ = __webpack_require__(/*! -!../node_modules/ts-loader/index.js!./index.ts */ "./node_modules/ts-loader/index.js!./src/index.ts");
var ___EXPOSE_LOADER_GET_GLOBAL_THIS___ = __webpack_require__(/*! ../node_modules/expose-loader/dist/runtime/getGlobalThis.js */ "./node_modules/expose-loader/dist/runtime/getGlobalThis.js");
var ___EXPOSE_LOADER_GLOBAL_THIS___ = ___EXPOSE_LOADER_GET_GLOBAL_THIS___;
___EXPOSE_LOADER_GLOBAL_THIS___["DOM"] = ___EXPOSE_LOADER_IMPORT___;
module.exports = ___EXPOSE_LOADER_IMPORT___;


/***/ }),

/***/ "./node_modules/expose-loader/dist/runtime/getGlobalThis.js":
/*!******************************************************************!*\
  !*** ./node_modules/expose-loader/dist/runtime/getGlobalThis.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// eslint-disable-next-line func-names
module.exports = function () {
  if (typeof globalThis === "object") {
    return globalThis;
  }

  var g;

  try {
    // This works if eval is allowed (see CSP)
    // eslint-disable-next-line no-new-func
    g = this || new Function("return this")();
  } catch (e) {
    // This works if the window reference is available
    if (typeof window === "object") {
      return window;
    } // This works if the self reference is available


    if (typeof self === "object") {
      return self;
    } // This works if the global reference is available


    if (typeof __webpack_require__.g !== "undefined") {
      return __webpack_require__.g;
    }
  }

  return g;
}();

/***/ }),

/***/ "./node_modules/ts-loader/index.js!./src/index.ts":
/*!********************************************************!*\
  !*** ./node_modules/ts-loader/index.js!./src/index.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DOM": () => (/* binding */ DOM)
/* harmony export */ });
/**
 * Document Object Model - helper functions
 * Helps you interact with the DOM safely and easily.
 *
 */
var DOM = /** @class */ (function () {
    function DOM() {
    }
    /**
     * Adds a global event listener that can monitor changes and perform events
     * @param type - Event type, example: click, dblclick, mouseover, ect..
     * @param selector - Same as query selector. Element class denoted with period, id denoted with #, or element name.
     * @param callback - A callback function to perform when the event is triggered.
     * @param useCapture - Optionally use capture instead of event bubbling.
     * @param parent - Optionally where to add the listener. Defaults to the document.
     *
     * ```javascript
     *
     * // Example 1 - Adds click to ID unique-id inside of document.
     * DOM.addEventDelegate('click', "#unique-id", () => { console.log("FIRE!") });
     *
     * // Example 2 - Adds click to class .btn inside of document.
     * DOM.addEventDelegate('click', ".btn", () => { console.log("FIRE!") });
     *
     * // Example 3 - Adds click to button elements inside window via capture.
     * DOM.addEventDelegate('click', "button", () => { console.log("FIRE!") }, true, window);
     *
     *
     * ```
     */
    DOM.addEventDelegate = function (type, selector, callback, useCapture, parent) {
        if (useCapture === void 0) { useCapture = false; }
        if (parent === void 0) { parent = document; }
        parent.addEventListener(type, function (e) {
            if (e.target.matches(selector))
                callback(e);
        }, useCapture);
    };
    /**
     * Create a complex DOM element with a single funciton.
     * @param element - Standard HTML element. Example: div, span, input, button, ect...
     * @param attributes - Pass an object using this pattern. **{ attributeName : value }**.
     * - ```text``` You are able to pass a string as textContent or pass an Element/node to append.
     * - ```class``` You are able to pass multiple classes using a space as the delimiter.
     * @param events - Optionally pass an object using this pattern to add events. **{ eventType: callback }**. The eventType consists of standard javascript events.
     * @returns The new created element inferred from the ```element``` param.
     * ```javascript
     *
     * // Example 1 - <div id="unique-id" class="text-class"> Some call to action text! </div>
     * let newElement = DOM.create("div", { id: "unique-id", class: "text-class", text: "Some call to action text!"});
     *
     * // Example 2 - When clicked it prints out "Clicked!" to the console.
     * // <button id="unique-id-2" class="button-class">
     * //  <div id="unique-id" class="text-class"> Some call to action text! </div>
     * // </button>
     * DOM.create("button", { id: "unique-id-2", class: "button-class", text: newElement}, { click: () => console.log('Clicked!') });
     *
     *
     * ```
     */
    DOM.create = function (element, attributes, events) {
        if (attributes === void 0) { attributes = null; }
        if (events === void 0) { events = null; }
        var elem = document.createElement(element);
        if (attributes !== null) {
            Object.keys(attributes).forEach(function (attributeName) {
                switch (attributeName) {
                    case "class":
                        (attributes[attributeName].trim().split(/\s+/)).forEach(function (attrClass) { elem.classList.add(attrClass); });
                        break;
                    case "text":
                        if (typeof attributes[attributeName] === "string") {
                            elem.textContent = attributes[attributeName];
                        }
                        else {
                            elem.append(attributes[attributeName]);
                        }
                        break;
                    case "dataset":
                        Object.entries(attributes[attributeName]).forEach(function (_a) {
                            var dataKey = _a[0], dataValue = _a[1];
                            elem.dataset[dataKey] = dataValue;
                        });
                        break;
                    default: elem.setAttribute(attributeName, attributes[attributeName]);
                }
            });
        }
        if (events !== null) {
            var eventList = Object.keys(events);
            eventList.forEach(function (event) { return elem.addEventListener(event, events[event]); });
        }
        return elem;
    };
    /**
     * Shorthand for the query selector
     * @param query - A query selector string, Example: ```".class"```
     * @param element - Defaults to the document object
     * @return The first or only element
     */
    DOM.select = function (query, parent) {
        if (parent === void 0) { parent = document; }
        return parent.querySelector(query);
    };
    /**
     * Shorthand for the query selector all with the added bonus of returning an array.
     * @param query - A query selector string, Example: ```".class"```
     * @param element - Defaults to the document object
     * @return An array of elements
     */
    DOM.selectAll = function (query, parent) {
        if (parent === void 0) { parent = document; }
        return Array.prototype.slice.call(parent.querySelectorAll(query));
    };
    /**
     * Detach and return an Element from the DOM
     * @param referemce A query selector string or elem reference (Element, ect...)
     * @return The detached element
     */
    DOM.detach = function (referemce) {
        var elem = typeof referemce === "string" ? this.select(referemce) : referemce;
        return elem.parentElement.removeChild(elem);
    };
    return DOM;
}());



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index-exposed.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzLy4vc3JjL2luZGV4LWV4cG9zZWQudHMiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy8uL25vZGVfbW9kdWxlcy9leHBvc2UtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRHbG9iYWxUaGlzLmpzIiwid2VicGFjazovL2RvbWluYXRpb24tanMvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHNlbGYsICgpID0+IHtcbnJldHVybiAiLCJ2YXIgX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX18gPSByZXF1aXJlKFwiLSEuLi9ub2RlX21vZHVsZXMvdHMtbG9hZGVyL2luZGV4LmpzIS4vaW5kZXgudHNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX18gPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXIvZGlzdC9ydW50aW1lL2dldEdsb2JhbFRoaXMuanNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fXyA9IF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fO1xuX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fX1tcIkRPTVwiXSA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xubW9kdWxlLmV4cG9ydHMgPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gXCJvYmplY3RcIikge1xuICAgIHJldHVybiBnbG9iYWxUaGlzO1xuICB9XG5cbiAgdmFyIGc7XG5cbiAgdHJ5IHtcbiAgICAvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICBnID0gdGhpcyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICB9IC8vIFRoaXMgd29ya3MgaWYgdGhlIHNlbGYgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXG5cbiAgICBpZiAodHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0gLy8gVGhpcyB3b3JrcyBpZiB0aGUgZ2xvYmFsIHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblxuXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybiBnbG9iYWw7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGc7XG59KCk7IiwiaW1wb3J0IHsganNFdmVudHMgfSBmcm9tIFwiLi9tb2RlbHMvanMtZXZlbnRzXCI7XHJcblxyXG4vKipcclxuICogRG9jdW1lbnQgT2JqZWN0IE1vZGVsIC0gaGVscGVyIGZ1bmN0aW9uc1xyXG4gKiBIZWxwcyB5b3UgaW50ZXJhY3Qgd2l0aCB0aGUgRE9NIHNhZmVseSBhbmQgZWFzaWx5LlxyXG4gKiBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBET00ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGdsb2JhbCBldmVudCBsaXN0ZW5lciB0aGF0IGNhbiBtb25pdG9yIGNoYW5nZXMgYW5kIHBlcmZvcm0gZXZlbnRzXHJcbiAgICAgKiBAcGFyYW0gdHlwZSAtIEV2ZW50IHR5cGUsIGV4YW1wbGU6IGNsaWNrLCBkYmxjbGljaywgbW91c2VvdmVyLCBlY3QuLlxyXG4gICAgICogQHBhcmFtIHNlbGVjdG9yIC0gU2FtZSBhcyBxdWVyeSBzZWxlY3Rvci4gRWxlbWVudCBjbGFzcyBkZW5vdGVkIHdpdGggcGVyaW9kLCBpZCBkZW5vdGVkIHdpdGggIywgb3IgZWxlbWVudCBuYW1lLlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIC0gQSBjYWxsYmFjayBmdW5jdGlvbiB0byBwZXJmb3JtIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5cclxuICAgICAqIEBwYXJhbSB1c2VDYXB0dXJlIC0gT3B0aW9uYWxseSB1c2UgY2FwdHVyZSBpbnN0ZWFkIG9mIGV2ZW50IGJ1YmJsaW5nLlxyXG4gICAgICogQHBhcmFtIHBhcmVudCAtIE9wdGlvbmFsbHkgd2hlcmUgdG8gYWRkIHRoZSBsaXN0ZW5lci4gRGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50LlxyXG4gICAgICogXHJcbiAgICAgKiBgYGBqYXZhc2NyaXB0XHJcbiAgICAgKiBcclxuICAgICAqIC8vIEV4YW1wbGUgMSAtIEFkZHMgY2xpY2sgdG8gSUQgdW5pcXVlLWlkIGluc2lkZSBvZiBkb2N1bWVudC5cclxuICAgICAqIERPTS5hZGRFdmVudERlbGVnYXRlKCdjbGljaycsIFwiI3VuaXF1ZS1pZFwiLCAoKSA9PiB7IGNvbnNvbGUubG9nKFwiRklSRSFcIikgfSk7XHJcbiAgICAgKiBcclxuICAgICAqIC8vIEV4YW1wbGUgMiAtIEFkZHMgY2xpY2sgdG8gY2xhc3MgLmJ0biBpbnNpZGUgb2YgZG9jdW1lbnQuXHJcbiAgICAgKiBET00uYWRkRXZlbnREZWxlZ2F0ZSgnY2xpY2snLCBcIi5idG5cIiwgKCkgPT4geyBjb25zb2xlLmxvZyhcIkZJUkUhXCIpIH0pO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBFeGFtcGxlIDMgLSBBZGRzIGNsaWNrIHRvIGJ1dHRvbiBlbGVtZW50cyBpbnNpZGUgd2luZG93IHZpYSBjYXB0dXJlLlxyXG4gICAgICogRE9NLmFkZEV2ZW50RGVsZWdhdGUoJ2NsaWNrJywgXCJidXR0b25cIiwgKCkgPT4geyBjb25zb2xlLmxvZyhcIkZJUkUhXCIpIH0sIHRydWUsIHdpbmRvdyk7XHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogYGBgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkRXZlbnREZWxlZ2F0ZSggdHlwZSA6IGFueSwgc2VsZWN0b3IgOiBzdHJpbmcsIGNhbGxiYWNrIDogRnVuY3Rpb24sIHVzZUNhcHR1cmUgOiBib29sZWFuID0gZmFsc2UsIHBhcmVudDogYW55ID0gZG9jdW1lbnQpIHtcclxuICAgICAgICBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lciggdHlwZSxcclxuICAgICAgICAgICAgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQubWF0Y2hlcyhzZWxlY3RvcikpIGNhbGxiYWNrKGUpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVzZUNhcHR1cmVcclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBjb21wbGV4IERPTSBlbGVtZW50IHdpdGggYSBzaW5nbGUgZnVuY2l0b24uXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAtIFN0YW5kYXJkIEhUTUwgZWxlbWVudC4gRXhhbXBsZTogZGl2LCBzcGFuLCBpbnB1dCwgYnV0dG9uLCBlY3QuLi5cclxuICAgICAqIEBwYXJhbSBhdHRyaWJ1dGVzIC0gUGFzcyBhbiBvYmplY3QgdXNpbmcgdGhpcyBwYXR0ZXJuLiAqKnsgYXR0cmlidXRlTmFtZSA6IHZhbHVlIH0qKi4gXHJcbiAgICAgKiAtIGBgYHRleHRgYGAgWW91IGFyZSBhYmxlIHRvIHBhc3MgYSBzdHJpbmcgYXMgdGV4dENvbnRlbnQgb3IgcGFzcyBhbiBFbGVtZW50L25vZGUgdG8gYXBwZW5kLlxyXG4gICAgICogLSBgYGBjbGFzc2BgYCBZb3UgYXJlIGFibGUgdG8gcGFzcyBtdWx0aXBsZSBjbGFzc2VzIHVzaW5nIGEgc3BhY2UgYXMgdGhlIGRlbGltaXRlci5cclxuICAgICAqIEBwYXJhbSBldmVudHMgLSBPcHRpb25hbGx5IHBhc3MgYW4gb2JqZWN0IHVzaW5nIHRoaXMgcGF0dGVybiB0byBhZGQgZXZlbnRzLiAqKnsgZXZlbnRUeXBlOiBjYWxsYmFjayB9KiouIFRoZSBldmVudFR5cGUgY29uc2lzdHMgb2Ygc3RhbmRhcmQgamF2YXNjcmlwdCBldmVudHMuXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgbmV3IGNyZWF0ZWQgZWxlbWVudCBpbmZlcnJlZCBmcm9tIHRoZSBgYGBlbGVtZW50YGBgIHBhcmFtLlxyXG4gICAgICogYGBgamF2YXNjcmlwdFxyXG4gICAgICogXHJcbiAgICAgKiAvLyBFeGFtcGxlIDEgLSA8ZGl2IGlkPVwidW5pcXVlLWlkXCIgY2xhc3M9XCJ0ZXh0LWNsYXNzXCI+IFNvbWUgY2FsbCB0byBhY3Rpb24gdGV4dCEgPC9kaXY+XHJcbiAgICAgKiBsZXQgbmV3RWxlbWVudCA9IERPTS5jcmVhdGUoXCJkaXZcIiwgeyBpZDogXCJ1bmlxdWUtaWRcIiwgY2xhc3M6IFwidGV4dC1jbGFzc1wiLCB0ZXh0OiBcIlNvbWUgY2FsbCB0byBhY3Rpb24gdGV4dCFcIn0pO1xyXG4gICAgICpcclxuICAgICAqIC8vIEV4YW1wbGUgMiAtIFdoZW4gY2xpY2tlZCBpdCBwcmludHMgb3V0IFwiQ2xpY2tlZCFcIiB0byB0aGUgY29uc29sZS5cclxuICAgICAqIC8vIDxidXR0b24gaWQ9XCJ1bmlxdWUtaWQtMlwiIGNsYXNzPVwiYnV0dG9uLWNsYXNzXCI+XHJcbiAgICAgKiAvLyAgPGRpdiBpZD1cInVuaXF1ZS1pZFwiIGNsYXNzPVwidGV4dC1jbGFzc1wiPiBTb21lIGNhbGwgdG8gYWN0aW9uIHRleHQhIDwvZGl2PlxyXG4gICAgICogLy8gPC9idXR0b24+XHJcbiAgICAgKiBET00uY3JlYXRlKFwiYnV0dG9uXCIsIHsgaWQ6IFwidW5pcXVlLWlkLTJcIiwgY2xhc3M6IFwiYnV0dG9uLWNsYXNzXCIsIHRleHQ6IG5ld0VsZW1lbnR9LCB7IGNsaWNrOiAoKSA9PiBjb25zb2xlLmxvZygnQ2xpY2tlZCEnKSB9KTtcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogYGBgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGVsZW1lbnQ6IHN0cmluZywgYXR0cmlidXRlczogYW55ID0gbnVsbCwgZXZlbnRzOiBqc0V2ZW50cyA9IG51bGwpIDogYW55IHtcclxuXHJcbiAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xyXG5cclxuICAgICAgICBpZiAoYXR0cmlidXRlcyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHJpYnV0ZU5hbWUgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIHN3aXRjaChhdHRyaWJ1dGVOYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY2xhc3NcIiA6IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXS50cmltKCkuc3BsaXQoL1xccysvKSkuZm9yRWFjaCggYXR0ckNsYXNzID0+IHsgZWxlbS5jbGFzc0xpc3QuYWRkKGF0dHJDbGFzcykgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRleHRcIiA6IFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID09PSBcInN0cmluZ1wiKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnRleHRDb250ZW50ID0gYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXTsgXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5hcHBlbmQoYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkYXRhc2V0XCIgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyhhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdKS5mb3JFYWNoKChbZGF0YUtleSwgZGF0YVZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5kYXRhc2V0W2RhdGFLZXldID0gZGF0YVZhbHVlIGFzIHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQgOiBlbGVtLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGV2ZW50cyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgZXZlbnRMaXN0IDogQXJyYXk8c3RyaW5nPiA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XHJcbiAgICAgICAgICAgIGV2ZW50TGlzdC5mb3JFYWNoKGV2ZW50ID0+IGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZXZlbnRzW2V2ZW50XSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG9ydGhhbmQgZm9yIHRoZSBxdWVyeSBzZWxlY3RvclxyXG4gICAgICogQHBhcmFtIHF1ZXJ5IC0gQSBxdWVyeSBzZWxlY3RvciBzdHJpbmcsIEV4YW1wbGU6IGBgYFwiLmNsYXNzXCJgYGBcclxuICAgICAqIEBwYXJhbSBlbGVtZW50IC0gRGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50IG9iamVjdFxyXG4gICAgICogQHJldHVybiBUaGUgZmlyc3Qgb3Igb25seSBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2VsZWN0KHF1ZXJ5OiBzdHJpbmcsIHBhcmVudCA6IGFueSA9IGRvY3VtZW50KTogRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHBhcmVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3J0aGFuZCBmb3IgdGhlIHF1ZXJ5IHNlbGVjdG9yIGFsbCB3aXRoIHRoZSBhZGRlZCBib251cyBvZiByZXR1cm5pbmcgYW4gYXJyYXkuXHJcbiAgICAgKiBAcGFyYW0gcXVlcnkgLSBBIHF1ZXJ5IHNlbGVjdG9yIHN0cmluZywgRXhhbXBsZTogYGBgXCIuY2xhc3NcImBgYFxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgLSBEZWZhdWx0cyB0byB0aGUgZG9jdW1lbnQgb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJuIEFuIGFycmF5IG9mIGVsZW1lbnRzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2VsZWN0QWxsKHF1ZXJ5OiBzdHJpbmcsIHBhcmVudCA6IGFueSA9IGRvY3VtZW50KTogQXJyYXk8RWxlbWVudD4ge1xyXG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChwYXJlbnQucXVlcnlTZWxlY3RvckFsbChxdWVyeSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWNoIGFuZCByZXR1cm4gYW4gRWxlbWVudCBmcm9tIHRoZSBET01cclxuICAgICAqIEBwYXJhbSByZWZlcmVtY2UgQSBxdWVyeSBzZWxlY3RvciBzdHJpbmcgb3IgZWxlbSByZWZlcmVuY2UgKEVsZW1lbnQsIGVjdC4uLilcclxuICAgICAqIEByZXR1cm4gVGhlIGRldGFjaGVkIGVsZW1lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkZXRhY2gocmVmZXJlbWNlOiBzdHJpbmcgfCBFbGVtZW50KTogRWxlbWVudCB7XHJcbiAgICAgICAgbGV0IGVsZW06IEVsZW1lbnQgPSB0eXBlb2YgcmVmZXJlbWNlID09PSBcInN0cmluZ1wiID8gdGhpcy5zZWxlY3QocmVmZXJlbWNlKSA6IHJlZmVyZW1jZTtcclxuICAgICAgICByZXR1cm4gZWxlbS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGVsZW0pO1xyXG4gICAgfVxyXG5cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC1leHBvc2VkLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9