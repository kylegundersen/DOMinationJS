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
class DOM {
    /**
     * Adds an event listener that follows the event delegation pattern. The advantage is that you can add
     * elements at any depth inside the parent container without having to worry about the event being
     * applied. This solves having to add, remove, and manage events per element.
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
    static addEventDelegate(type, selector, callback, useCapture = false, parent = document) {
        parent.addEventListener(type, (e) => {
            if (e.target.matches(selector))
                callback(e);
        }, useCapture);
    }
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
    static create(element, attributes = null, events = null) {
        let elem = document.createElement(element);
        if (attributes !== null) {
            Object.keys(attributes).forEach(attributeName => {
                switch (attributeName) {
                    case "class":
                        (attributes[attributeName].trim().split(/\s+/)).forEach(attrClass => { elem.classList.add(attrClass); });
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
                        Object.entries(attributes[attributeName]).forEach(([dataKey, dataValue]) => {
                            elem.dataset[dataKey] = dataValue;
                        });
                        break;
                    default: elem.setAttribute(attributeName, attributes[attributeName]);
                }
            });
        }
        if (events !== null) {
            let eventList = Object.keys(events);
            eventList.forEach(event => elem.addEventListener(event, events[event]));
        }
        return elem;
    }
    /**
     * Shorthand for the query selector
     * @param query - A query selector string, Example: ```".class"```
     * @param element - Defaults to the document object
     * @return The first or only element
     */
    static select(query, parent = document) {
        return parent.querySelector(query);
    }
    /**
     * Shorthand for the query selector all with the added bonus of returning an array.
     * @param query - A query selector string, Example: ```".class"```
     * @param element - Defaults to the document object
     * @return An array of elements
     */
    static selectAll(query, parent = document) {
        return Array.prototype.slice.call(parent.querySelectorAll(query));
    }
    /**
     * Detach and return an Element from the DOM
     * @param reference A query selector string or elem reference (Element, ect...)
     * @return The detached element
     */
    static detach(reference) {
        let elem = typeof reference === "string" ? this.select(reference) : reference;
        return elem.parentElement.removeChild(elem);
    }
    /**
     * Two-way data binding between an object's property and an Element's attribute.
     * @param object - The parent object where the property will be added.
     * @param objectProperty - Create a property that binds with an attribute.
     * @param element - The element or query selector of the element.
     * @param elementAttribute - The attribute to bind to the object's property.
     * ```javascript
     *
     * // Example - Binds Object Property "name" (dataObject.name) to an element's attribute value.
     * let dataObject = {};
     * DOM.bindAttribute(dataObject, "name", "#unique-id", 'value');
     *
     *
     * ```
     */
    static bindAttribute(object, objectProperty, element, elementAttribute) {
        let elem = typeof element === "string" ? this.select(element) : element;
        Object.defineProperty(object, objectProperty, {
            get() {
                return elem.getAttribute(elementAttribute);
            },
            set(value) {
                elem.setAttribute(elementAttribute, value);
            }
        });
    }
    /**
     * Get a route based on current path. This is great for making a SPA with deep-linking.
     * @param isArray - This will return the path as an array ```['some', 'path', 'defined']```
     * otherwise it will default to a string ```'/some/path/defined'```.
     * @return - A string or array representing the current document.location.pathName
     *
     * ```javascript
     *
     * // Example 1 - Get path `/some/path/defined`
     * let currentRoute = DOM.getRoute();
     *
     * // Example 2 - Get path as array ['some', 'path', 'defined']
     * let currentRoute = DOM.getRoute(true);
     *
     * ```
     */
    static getRoute(isArray = false) {
        return isArray ? document.location.pathname.split("/").filter(n => n) : document.location.pathname;
    }
    /**
     * Get the routes query string as a string or an object
     * @param isObject - (Optional) Defaults to true and will return an object by default.
     * @return - A string or object representing the current document.location.search
     *
     * ```javascript
     *
     * // Example 1 - Get query string as object ```{ test : 1 }```
     * let currentRoute = DOM.getRouteData();
     *
     * // Example 2 - Get query string as string ```"?test=1"```
     * let currentRoute = DOM.getRouteData(false);
     *
     * ```
     */
    static getRouteData(isObject = true) {
        return isObject ? Object.fromEntries(new URLSearchParams(document.location.search)) : document.location.search;
    }
    /**
     * Set the browser url and update browser history without triggering a full page refresh.
     * @param route - The path location with an optional query string
     *
     * ```javascript
     *
     * // Example 1 - Set url localhost:4200/some/path/defined
     * DOM.setRoute('/some/path/defined');
     *
     * // Example 2 - Gets current route as array ['some', 'path', 'defined']
     * //             Sets new route localhost:4200/some/path/new
     * let currentRoute = DOM.getRoute(true);
     * DOM.setRoute(`/${currentRoute[0]}/${currentRoute[1]}/new`);
     *
     * ```
     */
    static setRoute(route) {
        window.history.pushState({}, "", route);
    }
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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eUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzLy4vc3JjL2luZGV4LWV4cG9zZWQudHMiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy8uL25vZGVfbW9kdWxlcy9leHBvc2UtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRHbG9iYWxUaGlzLmpzIiwid2VicGFjazovL2RvbWluYXRpb24tanMvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHNlbGYsICgpID0+IHtcbnJldHVybiAiLCJ2YXIgX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX18gPSByZXF1aXJlKFwiLSEuLi9ub2RlX21vZHVsZXMvdHMtbG9hZGVyL2luZGV4LmpzIS4vaW5kZXgudHNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX18gPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXIvZGlzdC9ydW50aW1lL2dldEdsb2JhbFRoaXMuanNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fXyA9IF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fO1xuX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fX1tcIkRPTVwiXSA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xubW9kdWxlLmV4cG9ydHMgPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gXCJvYmplY3RcIikge1xuICAgIHJldHVybiBnbG9iYWxUaGlzO1xuICB9XG5cbiAgdmFyIGc7XG5cbiAgdHJ5IHtcbiAgICAvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICBnID0gdGhpcyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICB9IC8vIFRoaXMgd29ya3MgaWYgdGhlIHNlbGYgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXG5cbiAgICBpZiAodHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0gLy8gVGhpcyB3b3JrcyBpZiB0aGUgZ2xvYmFsIHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblxuXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybiBnbG9iYWw7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGc7XG59KCk7IiwiaW1wb3J0IHsgSlNFdmVudHMgfSBmcm9tIFwiLi9tb2RlbHMvanMtZXZlbnRzXCI7XHJcbmltcG9ydCB7IEpTRXZlbnRzRW51bSB9IGZyb20gXCIuL2VudW0vanMtZXZlbnRzXCI7XHJcbi8qKlxyXG4gKiBEb2N1bWVudCBPYmplY3QgTW9kZWwgLSBoZWxwZXIgZnVuY3Rpb25zXHJcbiAqIEhlbHBzIHlvdSBpbnRlcmFjdCB3aXRoIHRoZSBET00gc2FmZWx5IGFuZCBlYXNpbHkuXHJcbiAqIFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERPTSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQgZm9sbG93cyB0aGUgZXZlbnQgZGVsZWdhdGlvbiBwYXR0ZXJuLiBUaGUgYWR2YW50YWdlIGlzIHRoYXQgeW91IGNhbiBhZGQgXHJcbiAgICAgKiBlbGVtZW50cyBhdCBhbnkgZGVwdGggaW5zaWRlIHRoZSBwYXJlbnQgY29udGFpbmVyIHdpdGhvdXQgaGF2aW5nIHRvIHdvcnJ5IGFib3V0IHRoZSBldmVudCBiZWluZyBcclxuICAgICAqIGFwcGxpZWQuIFRoaXMgc29sdmVzIGhhdmluZyB0byBhZGQsIHJlbW92ZSwgYW5kIG1hbmFnZSBldmVudHMgcGVyIGVsZW1lbnQuXHJcbiAgICAgKiBAcGFyYW0gdHlwZSAtIEV2ZW50IHR5cGUsIGV4YW1wbGU6IGNsaWNrLCBkYmxjbGljaywgbW91c2VvdmVyLCBlY3QuLlxyXG4gICAgICogQHBhcmFtIHNlbGVjdG9yIC0gU2FtZSBhcyBxdWVyeSBzZWxlY3Rvci4gRWxlbWVudCBjbGFzcyBkZW5vdGVkIHdpdGggcGVyaW9kLCBpZCBkZW5vdGVkIHdpdGggIywgb3IgZWxlbWVudCBuYW1lLlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIC0gQSBjYWxsYmFjayBmdW5jdGlvbiB0byBwZXJmb3JtIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5cclxuICAgICAqIEBwYXJhbSB1c2VDYXB0dXJlIC0gT3B0aW9uYWxseSB1c2UgY2FwdHVyZSBpbnN0ZWFkIG9mIGV2ZW50IGJ1YmJsaW5nLlxyXG4gICAgICogQHBhcmFtIHBhcmVudCAtIE9wdGlvbmFsbHkgd2hlcmUgdG8gYWRkIHRoZSBsaXN0ZW5lci4gRGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50LlxyXG4gICAgICogXHJcbiAgICAgKiBgYGBqYXZhc2NyaXB0XHJcbiAgICAgKiBcclxuICAgICAqIC8vIEV4YW1wbGUgMSAtIEFkZHMgY2xpY2sgdG8gSUQgdW5pcXVlLWlkIGluc2lkZSBvZiBkb2N1bWVudC5cclxuICAgICAqIERPTS5hZGRFdmVudERlbGVnYXRlKCdjbGljaycsIFwiI3VuaXF1ZS1pZFwiLCAoKSA9PiB7IGNvbnNvbGUubG9nKFwiRklSRSFcIikgfSk7XHJcbiAgICAgKiBcclxuICAgICAqIC8vIEV4YW1wbGUgMiAtIEFkZHMgY2xpY2sgdG8gY2xhc3MgLmJ0biBpbnNpZGUgb2YgZG9jdW1lbnQuXHJcbiAgICAgKiBET00uYWRkRXZlbnREZWxlZ2F0ZSgnY2xpY2snLCBcIi5idG5cIiwgKCkgPT4geyBjb25zb2xlLmxvZyhcIkZJUkUhXCIpIH0pO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBFeGFtcGxlIDMgLSBBZGRzIGNsaWNrIHRvIGJ1dHRvbiBlbGVtZW50cyBpbnNpZGUgd2luZG93IHZpYSBjYXB0dXJlLlxyXG4gICAgICogRE9NLmFkZEV2ZW50RGVsZWdhdGUoJ2NsaWNrJywgXCJidXR0b25cIiwgKCkgPT4geyBjb25zb2xlLmxvZyhcIkZJUkUhXCIpIH0sIHRydWUsIHdpbmRvdyk7XHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogYGBgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkRXZlbnREZWxlZ2F0ZSh0eXBlOiBKU0V2ZW50c0VudW0gfCBzdHJpbmcsIHNlbGVjdG9yOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbiwgdXNlQ2FwdHVyZTogYm9vbGVhbiA9IGZhbHNlLCBwYXJlbnQ6IGFueSA9IGRvY3VtZW50KSB7XHJcbiAgICAgICAgcGFyZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSxcclxuICAgICAgICAgICAgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5tYXRjaGVzKHNlbGVjdG9yKSkgY2FsbGJhY2soZSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXNlQ2FwdHVyZVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIGNvbXBsZXggRE9NIGVsZW1lbnQgd2l0aCBhIHNpbmdsZSBmdW5jaXRvbi5cclxuICAgICAqIEBwYXJhbSBlbGVtZW50IC0gU3RhbmRhcmQgSFRNTCBlbGVtZW50LiBFeGFtcGxlOiBkaXYsIHNwYW4sIGlucHV0LCBidXR0b24sIGVjdC4uLlxyXG4gICAgICogQHBhcmFtIGF0dHJpYnV0ZXMgLSBQYXNzIGFuIG9iamVjdCB1c2luZyB0aGlzIHBhdHRlcm4uICoqeyBhdHRyaWJ1dGVOYW1lIDogdmFsdWUgfSoqLiBcclxuICAgICAqIC0gYGBgdGV4dGBgYCBZb3UgYXJlIGFibGUgdG8gcGFzcyBhIHN0cmluZyBhcyB0ZXh0Q29udGVudCBvciBwYXNzIGFuIEVsZW1lbnQvbm9kZSB0byBhcHBlbmQuXHJcbiAgICAgKiAtIGBgYGNsYXNzYGBgIFlvdSBhcmUgYWJsZSB0byBwYXNzIG11bHRpcGxlIGNsYXNzZXMgdXNpbmcgYSBzcGFjZSBhcyB0aGUgZGVsaW1pdGVyLlxyXG4gICAgICogQHBhcmFtIGV2ZW50cyAtIE9wdGlvbmFsbHkgcGFzcyBhbiBvYmplY3QgdXNpbmcgdGhpcyBwYXR0ZXJuIHRvIGFkZCBldmVudHMuICoqeyBldmVudFR5cGU6IGNhbGxiYWNrIH0qKi4gVGhlIGV2ZW50VHlwZSBjb25zaXN0cyBvZiBzdGFuZGFyZCBqYXZhc2NyaXB0IGV2ZW50cy5cclxuICAgICAqIEByZXR1cm5zIFRoZSBuZXcgY3JlYXRlZCBlbGVtZW50IGluZmVycmVkIGZyb20gdGhlIGBgYGVsZW1lbnRgYGAgcGFyYW0uXHJcbiAgICAgKiBgYGBqYXZhc2NyaXB0XHJcbiAgICAgKiBcclxuICAgICAqIC8vIEV4YW1wbGUgMSAtIDxkaXYgaWQ9XCJ1bmlxdWUtaWRcIiBjbGFzcz1cInRleHQtY2xhc3NcIj4gU29tZSBjYWxsIHRvIGFjdGlvbiB0ZXh0ISA8L2Rpdj5cclxuICAgICAqIGxldCBuZXdFbGVtZW50ID0gRE9NLmNyZWF0ZShcImRpdlwiLCB7IGlkOiBcInVuaXF1ZS1pZFwiLCBjbGFzczogXCJ0ZXh0LWNsYXNzXCIsIHRleHQ6IFwiU29tZSBjYWxsIHRvIGFjdGlvbiB0ZXh0IVwifSk7XHJcbiAgICAgKlxyXG4gICAgICogLy8gRXhhbXBsZSAyIC0gV2hlbiBjbGlja2VkIGl0IHByaW50cyBvdXQgXCJDbGlja2VkIVwiIHRvIHRoZSBjb25zb2xlLlxyXG4gICAgICogLy8gPGJ1dHRvbiBpZD1cInVuaXF1ZS1pZC0yXCIgY2xhc3M9XCJidXR0b24tY2xhc3NcIj5cclxuICAgICAqIC8vICA8ZGl2IGlkPVwidW5pcXVlLWlkXCIgY2xhc3M9XCJ0ZXh0LWNsYXNzXCI+IFNvbWUgY2FsbCB0byBhY3Rpb24gdGV4dCEgPC9kaXY+XHJcbiAgICAgKiAvLyA8L2J1dHRvbj5cclxuICAgICAqIERPTS5jcmVhdGUoXCJidXR0b25cIiwgeyBpZDogXCJ1bmlxdWUtaWQtMlwiLCBjbGFzczogXCJidXR0b24tY2xhc3NcIiwgdGV4dDogbmV3RWxlbWVudH0sIHsgY2xpY2s6ICgpID0+IGNvbnNvbGUubG9nKCdDbGlja2VkIScpIH0pO1xyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoZWxlbWVudDogc3RyaW5nLCBhdHRyaWJ1dGVzOiBhbnkgPSBudWxsLCBldmVudHM6IEpTRXZlbnRzID0gbnVsbCk6IGFueSB7XHJcblxyXG4gICAgICAgIGxldCBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcclxuXHJcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChhdHRyaWJ1dGVOYW1lID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGF0dHJpYnV0ZU5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY2xhc3NcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0udHJpbSgpLnNwbGl0KC9cXHMrLykpLmZvckVhY2goYXR0ckNsYXNzID0+IHsgZWxlbS5jbGFzc0xpc3QuYWRkKGF0dHJDbGFzcykgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0ZXh0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS50ZXh0Q29udGVudCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmFwcGVuZChhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGF0YXNldFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyhhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdKS5mb3JFYWNoKChbZGF0YUtleSwgZGF0YVZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5kYXRhc2V0W2RhdGFLZXldID0gZGF0YVZhbHVlIGFzIHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogZWxlbS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChldmVudHMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IGV2ZW50TGlzdDogQXJyYXk8c3RyaW5nPiA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XHJcbiAgICAgICAgICAgIGV2ZW50TGlzdC5mb3JFYWNoKGV2ZW50ID0+IGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZXZlbnRzW2V2ZW50XSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG9ydGhhbmQgZm9yIHRoZSBxdWVyeSBzZWxlY3RvclxyXG4gICAgICogQHBhcmFtIHF1ZXJ5IC0gQSBxdWVyeSBzZWxlY3RvciBzdHJpbmcsIEV4YW1wbGU6IGBgYFwiLmNsYXNzXCJgYGBcclxuICAgICAqIEBwYXJhbSBlbGVtZW50IC0gRGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50IG9iamVjdFxyXG4gICAgICogQHJldHVybiBUaGUgZmlyc3Qgb3Igb25seSBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2VsZWN0KHF1ZXJ5OiBzdHJpbmcsIHBhcmVudDogYW55ID0gZG9jdW1lbnQpOiBFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gcGFyZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvcnRoYW5kIGZvciB0aGUgcXVlcnkgc2VsZWN0b3IgYWxsIHdpdGggdGhlIGFkZGVkIGJvbnVzIG9mIHJldHVybmluZyBhbiBhcnJheS5cclxuICAgICAqIEBwYXJhbSBxdWVyeSAtIEEgcXVlcnkgc2VsZWN0b3Igc3RyaW5nLCBFeGFtcGxlOiBgYGBcIi5jbGFzc1wiYGBgXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAtIERlZmF1bHRzIHRvIHRoZSBkb2N1bWVudCBvYmplY3RcclxuICAgICAqIEByZXR1cm4gQW4gYXJyYXkgb2YgZWxlbWVudHNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzZWxlY3RBbGwocXVlcnk6IHN0cmluZywgcGFyZW50OiBhbnkgPSBkb2N1bWVudCk6IEFycmF5PEVsZW1lbnQ+IHtcclxuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFjaCBhbmQgcmV0dXJuIGFuIEVsZW1lbnQgZnJvbSB0aGUgRE9NXHJcbiAgICAgKiBAcGFyYW0gcmVmZXJlbmNlIEEgcXVlcnkgc2VsZWN0b3Igc3RyaW5nIG9yIGVsZW0gcmVmZXJlbmNlIChFbGVtZW50LCBlY3QuLi4pXHJcbiAgICAgKiBAcmV0dXJuIFRoZSBkZXRhY2hlZCBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZGV0YWNoKHJlZmVyZW5jZTogc3RyaW5nIHwgRWxlbWVudCk6IEVsZW1lbnQge1xyXG4gICAgICAgIGxldCBlbGVtOiBFbGVtZW50ID0gdHlwZW9mIHJlZmVyZW5jZSA9PT0gXCJzdHJpbmdcIiA/IHRoaXMuc2VsZWN0KHJlZmVyZW5jZSkgOiByZWZlcmVuY2U7XHJcbiAgICAgICAgcmV0dXJuIGVsZW0ucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbGVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFR3by13YXkgZGF0YSBiaW5kaW5nIGJldHdlZW4gYW4gb2JqZWN0J3MgcHJvcGVydHkgYW5kIGFuIEVsZW1lbnQncyBhdHRyaWJ1dGUuXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0IC0gVGhlIHBhcmVudCBvYmplY3Qgd2hlcmUgdGhlIHByb3BlcnR5IHdpbGwgYmUgYWRkZWQuXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0UHJvcGVydHkgLSBDcmVhdGUgYSBwcm9wZXJ0eSB0aGF0IGJpbmRzIHdpdGggYW4gYXR0cmlidXRlLlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgLSBUaGUgZWxlbWVudCBvciBxdWVyeSBzZWxlY3RvciBvZiB0aGUgZWxlbWVudC5cclxuICAgICAqIEBwYXJhbSBlbGVtZW50QXR0cmlidXRlIC0gVGhlIGF0dHJpYnV0ZSB0byBiaW5kIHRvIHRoZSBvYmplY3QncyBwcm9wZXJ0eS5cclxuICAgICAqIGBgYGphdmFzY3JpcHRcclxuICAgICAqIFxyXG4gICAgICogLy8gRXhhbXBsZSAtIEJpbmRzIE9iamVjdCBQcm9wZXJ0eSBcIm5hbWVcIiAoZGF0YU9iamVjdC5uYW1lKSB0byBhbiBlbGVtZW50J3MgYXR0cmlidXRlIHZhbHVlLiBcclxuICAgICAqIGxldCBkYXRhT2JqZWN0ID0ge307XHJcbiAgICAgKiBET00uYmluZEF0dHJpYnV0ZShkYXRhT2JqZWN0LCBcIm5hbWVcIiwgXCIjdW5pcXVlLWlkXCIsICd2YWx1ZScpO1xyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBiaW5kQXR0cmlidXRlKG9iamVjdDogYW55LCBvYmplY3RQcm9wZXJ0eTogc3RyaW5nLCBlbGVtZW50OiBFbGVtZW50IHwgc3RyaW5nLCBlbGVtZW50QXR0cmlidXRlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBsZXQgZWxlbTogRWxlbWVudCA9IHR5cGVvZiBlbGVtZW50ID09PSBcInN0cmluZ1wiID8gdGhpcy5zZWxlY3QoZWxlbWVudCkgOiBlbGVtZW50O1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIG9iamVjdFByb3BlcnR5LCB7XHJcbiAgICAgICAgICAgIGdldCgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZShlbGVtZW50QXR0cmlidXRlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZShlbGVtZW50QXR0cmlidXRlLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGEgcm91dGUgYmFzZWQgb24gY3VycmVudCBwYXRoLiBUaGlzIGlzIGdyZWF0IGZvciBtYWtpbmcgYSBTUEEgd2l0aCBkZWVwLWxpbmtpbmcuIFxyXG4gICAgICogQHBhcmFtIGlzQXJyYXkgLSBUaGlzIHdpbGwgcmV0dXJuIHRoZSBwYXRoIGFzIGFuIGFycmF5IGBgYFsnc29tZScsICdwYXRoJywgJ2RlZmluZWQnXWBgYCBcclxuICAgICAqIG90aGVyd2lzZSBpdCB3aWxsIGRlZmF1bHQgdG8gYSBzdHJpbmcgYGBgJy9zb21lL3BhdGgvZGVmaW5lZCdgYGAuXHJcbiAgICAgKiBAcmV0dXJuIC0gQSBzdHJpbmcgb3IgYXJyYXkgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhOYW1lXHJcbiAgICAgKiBcclxuICAgICAqIGBgYGphdmFzY3JpcHRcclxuICAgICAqIFxyXG4gICAgICogLy8gRXhhbXBsZSAxIC0gR2V0IHBhdGggYC9zb21lL3BhdGgvZGVmaW5lZGBcclxuICAgICAqIGxldCBjdXJyZW50Um91dGUgPSBET00uZ2V0Um91dGUoKTtcclxuICAgICAqIFxyXG4gICAgICogLy8gRXhhbXBsZSAyIC0gR2V0IHBhdGggYXMgYXJyYXkgWydzb21lJywgJ3BhdGgnLCAnZGVmaW5lZCddXHJcbiAgICAgKiBsZXQgY3VycmVudFJvdXRlID0gRE9NLmdldFJvdXRlKHRydWUpO1xyXG4gICAgICogXHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRSb3V0ZShpc0FycmF5OmJvb2xlYW4gPSBmYWxzZSkgOiBBcnJheTxzdHJpbmc+IHwgc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gaXNBcnJheSA/IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKS5maWx0ZXIobiA9PiBuKSA6IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSByb3V0ZXMgcXVlcnkgc3RyaW5nIGFzIGEgc3RyaW5nIG9yIGFuIG9iamVjdFxyXG4gICAgICogQHBhcmFtIGlzT2JqZWN0IC0gKE9wdGlvbmFsKSBEZWZhdWx0cyB0byB0cnVlIGFuZCB3aWxsIHJldHVybiBhbiBvYmplY3QgYnkgZGVmYXVsdC5cclxuICAgICAqIEByZXR1cm4gLSBBIHN0cmluZyBvciBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaFxyXG4gICAgICogXHJcbiAgICAgKiBgYGBqYXZhc2NyaXB0XHJcbiAgICAgKiBcclxuICAgICAqIC8vIEV4YW1wbGUgMSAtIEdldCBxdWVyeSBzdHJpbmcgYXMgb2JqZWN0IGBgYHsgdGVzdCA6IDEgfWBgYFxyXG4gICAgICogbGV0IGN1cnJlbnRSb3V0ZSA9IERPTS5nZXRSb3V0ZURhdGEoKTtcclxuICAgICAqIFxyXG4gICAgICogLy8gRXhhbXBsZSAyIC0gR2V0IHF1ZXJ5IHN0cmluZyBhcyBzdHJpbmcgYGBgXCI/dGVzdD0xXCJgYGBcclxuICAgICAqIGxldCBjdXJyZW50Um91dGUgPSBET00uZ2V0Um91dGVEYXRhKGZhbHNlKTtcclxuICAgICAqIFxyXG4gICAgICogYGBgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Um91dGVEYXRhKGlzT2JqZWN0OmJvb2xlYW4gPSB0cnVlKSA6IGFueSB8IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGlzT2JqZWN0ID8gT2JqZWN0LmZyb21FbnRyaWVzKG5ldyBVUkxTZWFyY2hQYXJhbXMoZG9jdW1lbnQubG9jYXRpb24uc2VhcmNoKSBhcyBhbnkpIDogZG9jdW1lbnQubG9jYXRpb24uc2VhcmNoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBicm93c2VyIHVybCBhbmQgdXBkYXRlIGJyb3dzZXIgaGlzdG9yeSB3aXRob3V0IHRyaWdnZXJpbmcgYSBmdWxsIHBhZ2UgcmVmcmVzaC4gXHJcbiAgICAgKiBAcGFyYW0gcm91dGUgLSBUaGUgcGF0aCBsb2NhdGlvbiB3aXRoIGFuIG9wdGlvbmFsIHF1ZXJ5IHN0cmluZ1xyXG4gICAgICogXHJcbiAgICAgKiBgYGBqYXZhc2NyaXB0XHJcbiAgICAgKiBcclxuICAgICAqIC8vIEV4YW1wbGUgMSAtIFNldCB1cmwgbG9jYWxob3N0OjQyMDAvc29tZS9wYXRoL2RlZmluZWRcclxuICAgICAqIERPTS5zZXRSb3V0ZSgnL3NvbWUvcGF0aC9kZWZpbmVkJyk7XHJcbiAgICAgKiBcclxuICAgICAqIC8vIEV4YW1wbGUgMiAtIEdldHMgY3VycmVudCByb3V0ZSBhcyBhcnJheSBbJ3NvbWUnLCAncGF0aCcsICdkZWZpbmVkJ11cclxuICAgICAqIC8vICAgICAgICAgICAgIFNldHMgbmV3IHJvdXRlIGxvY2FsaG9zdDo0MjAwL3NvbWUvcGF0aC9uZXdcclxuICAgICAqIGxldCBjdXJyZW50Um91dGUgPSBET00uZ2V0Um91dGUodHJ1ZSk7XHJcbiAgICAgKiBET00uc2V0Um91dGUoYC8ke2N1cnJlbnRSb3V0ZVswXX0vJHtjdXJyZW50Um91dGVbMV19L25ld2ApO1xyXG4gICAgICogXHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzZXRSb3V0ZShyb3V0ZSkgOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIFwiXCIsIHJvdXRlKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC1leHBvc2VkLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9