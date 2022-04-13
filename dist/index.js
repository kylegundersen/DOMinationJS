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
     * @param reference A query selector string or elem reference (Element, ect...)
     * @return The detached element
     */
    DOM.detach = function (reference) {
        var elem = typeof reference === "string" ? this.select(reference) : reference;
        return elem.parentElement.removeChild(elem);
    };
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
    DOM.bindAttribute = function (object, objectProperty, element, elementAttribute) {
        var elem = typeof element === "string" ? this.select(element) : element;
        Object.defineProperty(object, objectProperty, {
            get: function () {
                return elem.getAttribute(elementAttribute);
            },
            set: function (value) {
                elem.setAttribute(elementAttribute, value);
            }
        });
    };
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
    DOM.getRoute = function (isArray) {
        if (isArray === void 0) { isArray = false; }
        return isArray ? document.location.pathname.split("/").filter(function (n) { return n; }) : document.location.pathname;
    };
    /**
     * Set a route based on path. This is great for making a SPA with deep-linking.
     * @param route - The path you want to navigate without refreshing the view.
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
    DOM.setRoute = function (route) {
        window.history.pushState({}, "", route);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Oi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy8uL3NyYy9pbmRleC1leHBvc2VkLnRzIiwid2VicGFjazovL2RvbWluYXRpb24tanMvLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0R2xvYmFsVGhpcy5qcyIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KShzZWxmLCAoKSA9PiB7XG5yZXR1cm4gIiwidmFyIF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fID0gcmVxdWlyZShcIi0hLi4vbm9kZV9tb2R1bGVzL3RzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LnRzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9leHBvc2UtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRHbG9iYWxUaGlzLmpzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX18gPSBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXztcbl9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX19bXCJET01cIl0gPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbm1vZHVsZS5leHBvcnRzID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICByZXR1cm4gZ2xvYmFsVGhpcztcbiAgfVxuXG4gIHZhciBnO1xuXG4gIHRyeSB7XG4gICAgLy8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgZyA9IHRoaXMgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfSAvLyBUaGlzIHdvcmtzIGlmIHRoZSBzZWxmIHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblxuXG4gICAgaWYgKHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9IC8vIFRoaXMgd29ya3MgaWYgdGhlIGdsb2JhbCByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cblxuICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gZ2xvYmFsO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnO1xufSgpOyIsImltcG9ydCB7IEpTRXZlbnRzIH0gZnJvbSBcIi4vbW9kZWxzL2pzLWV2ZW50c1wiO1xyXG5pbXBvcnQgeyBKU0V2ZW50c0VudW0gfSBmcm9tIFwiLi9lbnVtL2pzLWV2ZW50c1wiO1xyXG4vKipcclxuICogRG9jdW1lbnQgT2JqZWN0IE1vZGVsIC0gaGVscGVyIGZ1bmN0aW9uc1xyXG4gKiBIZWxwcyB5b3UgaW50ZXJhY3Qgd2l0aCB0aGUgRE9NIHNhZmVseSBhbmQgZWFzaWx5LlxyXG4gKiBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBET00ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciB0aGF0IGZvbGxvd3MgdGhlIGV2ZW50IGRlbGVnYXRpb24gcGF0dGVybi4gVGhlIGFkdmFudGFnZSBpcyB0aGF0IHlvdSBjYW4gYWRkIFxyXG4gICAgICogZWxlbWVudHMgYXQgYW55IGRlcHRoIGluc2lkZSB0aGUgcGFyZW50IGNvbnRhaW5lciB3aXRob3V0IGhhdmluZyB0byB3b3JyeSBhYm91dCB0aGUgZXZlbnQgYmVpbmcgXHJcbiAgICAgKiBhcHBsaWVkLiBUaGlzIHNvbHZlcyBoYXZpbmcgdG8gYWRkLCByZW1vdmUsIGFuZCBtYW5hZ2UgZXZlbnRzIHBlciBlbGVtZW50LlxyXG4gICAgICogQHBhcmFtIHR5cGUgLSBFdmVudCB0eXBlLCBleGFtcGxlOiBjbGljaywgZGJsY2xpY2ssIG1vdXNlb3ZlciwgZWN0Li5cclxuICAgICAqIEBwYXJhbSBzZWxlY3RvciAtIFNhbWUgYXMgcXVlcnkgc2VsZWN0b3IuIEVsZW1lbnQgY2xhc3MgZGVub3RlZCB3aXRoIHBlcmlvZCwgaWQgZGVub3RlZCB3aXRoICMsIG9yIGVsZW1lbnQgbmFtZS5cclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayAtIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gcGVyZm9ybSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuXHJcbiAgICAgKiBAcGFyYW0gdXNlQ2FwdHVyZSAtIE9wdGlvbmFsbHkgdXNlIGNhcHR1cmUgaW5zdGVhZCBvZiBldmVudCBidWJibGluZy5cclxuICAgICAqIEBwYXJhbSBwYXJlbnQgLSBPcHRpb25hbGx5IHdoZXJlIHRvIGFkZCB0aGUgbGlzdGVuZXIuIERlZmF1bHRzIHRvIHRoZSBkb2N1bWVudC5cclxuICAgICAqIFxyXG4gICAgICogYGBgamF2YXNjcmlwdFxyXG4gICAgICogXHJcbiAgICAgKiAvLyBFeGFtcGxlIDEgLSBBZGRzIGNsaWNrIHRvIElEIHVuaXF1ZS1pZCBpbnNpZGUgb2YgZG9jdW1lbnQuXHJcbiAgICAgKiBET00uYWRkRXZlbnREZWxlZ2F0ZSgnY2xpY2snLCBcIiN1bmlxdWUtaWRcIiwgKCkgPT4geyBjb25zb2xlLmxvZyhcIkZJUkUhXCIpIH0pO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBFeGFtcGxlIDIgLSBBZGRzIGNsaWNrIHRvIGNsYXNzIC5idG4gaW5zaWRlIG9mIGRvY3VtZW50LlxyXG4gICAgICogRE9NLmFkZEV2ZW50RGVsZWdhdGUoJ2NsaWNrJywgXCIuYnRuXCIsICgpID0+IHsgY29uc29sZS5sb2coXCJGSVJFIVwiKSB9KTtcclxuICAgICAqIFxyXG4gICAgICogLy8gRXhhbXBsZSAzIC0gQWRkcyBjbGljayB0byBidXR0b24gZWxlbWVudHMgaW5zaWRlIHdpbmRvdyB2aWEgY2FwdHVyZS5cclxuICAgICAqIERPTS5hZGRFdmVudERlbGVnYXRlKCdjbGljaycsIFwiYnV0dG9uXCIsICgpID0+IHsgY29uc29sZS5sb2coXCJGSVJFIVwiKSB9LCB0cnVlLCB3aW5kb3cpO1xyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIGBgYFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZEV2ZW50RGVsZWdhdGUodHlwZTogSlNFdmVudHNFbnVtIHwgc3RyaW5nLCBzZWxlY3Rvcjogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIHVzZUNhcHR1cmU6IGJvb2xlYW4gPSBmYWxzZSwgcGFyZW50OiBhbnkgPSBkb2N1bWVudCkge1xyXG4gICAgICAgIHBhcmVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsXHJcbiAgICAgICAgICAgIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0Lm1hdGNoZXMoc2VsZWN0b3IpKSBjYWxsYmFjayhlKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1c2VDYXB0dXJlXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgY29tcGxleCBET00gZWxlbWVudCB3aXRoIGEgc2luZ2xlIGZ1bmNpdG9uLlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgLSBTdGFuZGFyZCBIVE1MIGVsZW1lbnQuIEV4YW1wbGU6IGRpdiwgc3BhbiwgaW5wdXQsIGJ1dHRvbiwgZWN0Li4uXHJcbiAgICAgKiBAcGFyYW0gYXR0cmlidXRlcyAtIFBhc3MgYW4gb2JqZWN0IHVzaW5nIHRoaXMgcGF0dGVybi4gKip7IGF0dHJpYnV0ZU5hbWUgOiB2YWx1ZSB9KiouIFxyXG4gICAgICogLSBgYGB0ZXh0YGBgIFlvdSBhcmUgYWJsZSB0byBwYXNzIGEgc3RyaW5nIGFzIHRleHRDb250ZW50IG9yIHBhc3MgYW4gRWxlbWVudC9ub2RlIHRvIGFwcGVuZC5cclxuICAgICAqIC0gYGBgY2xhc3NgYGAgWW91IGFyZSBhYmxlIHRvIHBhc3MgbXVsdGlwbGUgY2xhc3NlcyB1c2luZyBhIHNwYWNlIGFzIHRoZSBkZWxpbWl0ZXIuXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRzIC0gT3B0aW9uYWxseSBwYXNzIGFuIG9iamVjdCB1c2luZyB0aGlzIHBhdHRlcm4gdG8gYWRkIGV2ZW50cy4gKip7IGV2ZW50VHlwZTogY2FsbGJhY2sgfSoqLiBUaGUgZXZlbnRUeXBlIGNvbnNpc3RzIG9mIHN0YW5kYXJkIGphdmFzY3JpcHQgZXZlbnRzLlxyXG4gICAgICogQHJldHVybnMgVGhlIG5ldyBjcmVhdGVkIGVsZW1lbnQgaW5mZXJyZWQgZnJvbSB0aGUgYGBgZWxlbWVudGBgYCBwYXJhbS5cclxuICAgICAqIGBgYGphdmFzY3JpcHRcclxuICAgICAqIFxyXG4gICAgICogLy8gRXhhbXBsZSAxIC0gPGRpdiBpZD1cInVuaXF1ZS1pZFwiIGNsYXNzPVwidGV4dC1jbGFzc1wiPiBTb21lIGNhbGwgdG8gYWN0aW9uIHRleHQhIDwvZGl2PlxyXG4gICAgICogbGV0IG5ld0VsZW1lbnQgPSBET00uY3JlYXRlKFwiZGl2XCIsIHsgaWQ6IFwidW5pcXVlLWlkXCIsIGNsYXNzOiBcInRleHQtY2xhc3NcIiwgdGV4dDogXCJTb21lIGNhbGwgdG8gYWN0aW9uIHRleHQhXCJ9KTtcclxuICAgICAqXHJcbiAgICAgKiAvLyBFeGFtcGxlIDIgLSBXaGVuIGNsaWNrZWQgaXQgcHJpbnRzIG91dCBcIkNsaWNrZWQhXCIgdG8gdGhlIGNvbnNvbGUuXHJcbiAgICAgKiAvLyA8YnV0dG9uIGlkPVwidW5pcXVlLWlkLTJcIiBjbGFzcz1cImJ1dHRvbi1jbGFzc1wiPlxyXG4gICAgICogLy8gIDxkaXYgaWQ9XCJ1bmlxdWUtaWRcIiBjbGFzcz1cInRleHQtY2xhc3NcIj4gU29tZSBjYWxsIHRvIGFjdGlvbiB0ZXh0ISA8L2Rpdj5cclxuICAgICAqIC8vIDwvYnV0dG9uPlxyXG4gICAgICogRE9NLmNyZWF0ZShcImJ1dHRvblwiLCB7IGlkOiBcInVuaXF1ZS1pZC0yXCIsIGNsYXNzOiBcImJ1dHRvbi1jbGFzc1wiLCB0ZXh0OiBuZXdFbGVtZW50fSwgeyBjbGljazogKCkgPT4gY29uc29sZS5sb2coJ0NsaWNrZWQhJykgfSk7XHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIGBgYFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShlbGVtZW50OiBzdHJpbmcsIGF0dHJpYnV0ZXM6IGFueSA9IG51bGwsIGV2ZW50czogSlNFdmVudHMgPSBudWxsKTogYW55IHtcclxuXHJcbiAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xyXG5cclxuICAgICAgICBpZiAoYXR0cmlidXRlcyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHJpYnV0ZU5hbWUgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYXR0cmlidXRlTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjbGFzc1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXS50cmltKCkuc3BsaXQoL1xccysvKSkuZm9yRWFjaChhdHRyQ2xhc3MgPT4geyBlbGVtLmNsYXNzTGlzdC5hZGQoYXR0ckNsYXNzKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRleHRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnRleHRDb250ZW50ID0gYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uYXBwZW5kKGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkYXRhc2V0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0pLmZvckVhY2goKFtkYXRhS2V5LCBkYXRhVmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmRhdGFzZXRbZGF0YUtleV0gPSBkYXRhVmFsdWUgYXMgc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiBlbGVtLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGV2ZW50cyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgZXZlbnRMaXN0OiBBcnJheTxzdHJpbmc+ID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcclxuICAgICAgICAgICAgZXZlbnRMaXN0LmZvckVhY2goZXZlbnQgPT4gZWxlbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBldmVudHNbZXZlbnRdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZWxlbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3J0aGFuZCBmb3IgdGhlIHF1ZXJ5IHNlbGVjdG9yXHJcbiAgICAgKiBAcGFyYW0gcXVlcnkgLSBBIHF1ZXJ5IHNlbGVjdG9yIHN0cmluZywgRXhhbXBsZTogYGBgXCIuY2xhc3NcImBgYFxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgLSBEZWZhdWx0cyB0byB0aGUgZG9jdW1lbnQgb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJuIFRoZSBmaXJzdCBvciBvbmx5IGVsZW1lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzZWxlY3QocXVlcnk6IHN0cmluZywgcGFyZW50OiBhbnkgPSBkb2N1bWVudCk6IEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiBwYXJlbnQucXVlcnlTZWxlY3RvcihxdWVyeSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG9ydGhhbmQgZm9yIHRoZSBxdWVyeSBzZWxlY3RvciBhbGwgd2l0aCB0aGUgYWRkZWQgYm9udXMgb2YgcmV0dXJuaW5nIGFuIGFycmF5LlxyXG4gICAgICogQHBhcmFtIHF1ZXJ5IC0gQSBxdWVyeSBzZWxlY3RvciBzdHJpbmcsIEV4YW1wbGU6IGBgYFwiLmNsYXNzXCJgYGBcclxuICAgICAqIEBwYXJhbSBlbGVtZW50IC0gRGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50IG9iamVjdFxyXG4gICAgICogQHJldHVybiBBbiBhcnJheSBvZiBlbGVtZW50c1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNlbGVjdEFsbChxdWVyeTogc3RyaW5nLCBwYXJlbnQ6IGFueSA9IGRvY3VtZW50KTogQXJyYXk8RWxlbWVudD4ge1xyXG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChwYXJlbnQucXVlcnlTZWxlY3RvckFsbChxdWVyeSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWNoIGFuZCByZXR1cm4gYW4gRWxlbWVudCBmcm9tIHRoZSBET01cclxuICAgICAqIEBwYXJhbSByZWZlcmVuY2UgQSBxdWVyeSBzZWxlY3RvciBzdHJpbmcgb3IgZWxlbSByZWZlcmVuY2UgKEVsZW1lbnQsIGVjdC4uLilcclxuICAgICAqIEByZXR1cm4gVGhlIGRldGFjaGVkIGVsZW1lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkZXRhY2gocmVmZXJlbmNlOiBzdHJpbmcgfCBFbGVtZW50KTogRWxlbWVudCB7XHJcbiAgICAgICAgbGV0IGVsZW06IEVsZW1lbnQgPSB0eXBlb2YgcmVmZXJlbmNlID09PSBcInN0cmluZ1wiID8gdGhpcy5zZWxlY3QocmVmZXJlbmNlKSA6IHJlZmVyZW5jZTtcclxuICAgICAgICByZXR1cm4gZWxlbS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGVsZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHdvLXdheSBkYXRhIGJpbmRpbmcgYmV0d2VlbiBhbiBvYmplY3QncyBwcm9wZXJ0eSBhbmQgYW4gRWxlbWVudCdzIGF0dHJpYnV0ZS5cclxuICAgICAqIEBwYXJhbSBvYmplY3QgLSBUaGUgcGFyZW50IG9iamVjdCB3aGVyZSB0aGUgcHJvcGVydHkgd2lsbCBiZSBhZGRlZC5cclxuICAgICAqIEBwYXJhbSBvYmplY3RQcm9wZXJ0eSAtIENyZWF0ZSBhIHByb3BlcnR5IHRoYXQgYmluZHMgd2l0aCBhbiBhdHRyaWJ1dGUuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAtIFRoZSBlbGVtZW50IG9yIHF1ZXJ5IHNlbGVjdG9yIG9mIHRoZSBlbGVtZW50LlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnRBdHRyaWJ1dGUgLSBUaGUgYXR0cmlidXRlIHRvIGJpbmQgdG8gdGhlIG9iamVjdCdzIHByb3BlcnR5LlxyXG4gICAgICogYGBgamF2YXNjcmlwdFxyXG4gICAgICogXHJcbiAgICAgKiAvLyBFeGFtcGxlIC0gQmluZHMgT2JqZWN0IFByb3BlcnR5IFwibmFtZVwiIChkYXRhT2JqZWN0Lm5hbWUpIHRvIGFuIGVsZW1lbnQncyBhdHRyaWJ1dGUgdmFsdWUuIFxyXG4gICAgICogbGV0IGRhdGFPYmplY3QgPSB7fTtcclxuICAgICAqIERPTS5iaW5kQXR0cmlidXRlKGRhdGFPYmplY3QsIFwibmFtZVwiLCBcIiN1bmlxdWUtaWRcIiwgJ3ZhbHVlJyk7XHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIGBgYFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGJpbmRBdHRyaWJ1dGUob2JqZWN0OiBhbnksIG9iamVjdFByb3BlcnR5OiBzdHJpbmcsIGVsZW1lbnQ6IEVsZW1lbnQgfCBzdHJpbmcsIGVsZW1lbnRBdHRyaWJ1dGU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBlbGVtOiBFbGVtZW50ID0gdHlwZW9mIGVsZW1lbnQgPT09IFwic3RyaW5nXCIgPyB0aGlzLnNlbGVjdChlbGVtZW50KSA6IGVsZW1lbnQ7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgb2JqZWN0UHJvcGVydHksIHtcclxuICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKGVsZW1lbnRBdHRyaWJ1dGUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGVsZW1lbnRBdHRyaWJ1dGUsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYSByb3V0ZSBiYXNlZCBvbiBjdXJyZW50IHBhdGguIFRoaXMgaXMgZ3JlYXQgZm9yIG1ha2luZyBhIFNQQSB3aXRoIGRlZXAtbGlua2luZy4gXHJcbiAgICAgKiBAcGFyYW0gaXNBcnJheSAtIFRoaXMgd2lsbCByZXR1cm4gdGhlIHBhdGggYXMgYW4gYXJyYXkgYGBgWydzb21lJywgJ3BhdGgnLCAnZGVmaW5lZCddYGBgIFxyXG4gICAgICogb3RoZXJ3aXNlIGl0IHdpbGwgZGVmYXVsdCB0byBhIHN0cmluZyBgYGAnL3NvbWUvcGF0aC9kZWZpbmVkJ2BgYC5cclxuICAgICAqIEByZXR1cm4gLSBBIHN0cmluZyBvciBhcnJheSByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgZG9jdW1lbnQubG9jYXRpb24ucGF0aE5hbWVcclxuICAgICAqIFxyXG4gICAgICogYGBgamF2YXNjcmlwdFxyXG4gICAgICogXHJcbiAgICAgKiAvLyBFeGFtcGxlIDEgLSBHZXQgcGF0aCBgL3NvbWUvcGF0aC9kZWZpbmVkYFxyXG4gICAgICogbGV0IGN1cnJlbnRSb3V0ZSA9IERPTS5nZXRSb3V0ZSgpO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBFeGFtcGxlIDIgLSBHZXQgcGF0aCBhcyBhcnJheSBbJ3NvbWUnLCAncGF0aCcsICdkZWZpbmVkJ11cclxuICAgICAqIGxldCBjdXJyZW50Um91dGUgPSBET00uZ2V0Um91dGUodHJ1ZSk7XHJcbiAgICAgKiBcclxuICAgICAqIGBgYFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFJvdXRlKGlzQXJyYXkgPSBmYWxzZSkgOiBBcnJheTxzdHJpbmc+IHwgc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gaXNBcnJheSA/IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKS5maWx0ZXIobiA9PiBuKSA6IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGEgcm91dGUgYmFzZWQgb24gcGF0aC4gVGhpcyBpcyBncmVhdCBmb3IgbWFraW5nIGEgU1BBIHdpdGggZGVlcC1saW5raW5nLiBcclxuICAgICAqIEBwYXJhbSByb3V0ZSAtIFRoZSBwYXRoIHlvdSB3YW50IHRvIG5hdmlnYXRlIHdpdGhvdXQgcmVmcmVzaGluZyB0aGUgdmlldy5cclxuICAgICAqIFxyXG4gICAgICogYGBgamF2YXNjcmlwdFxyXG4gICAgICogXHJcbiAgICAgKiAvLyBFeGFtcGxlIDEgLSBTZXQgdXJsIGxvY2FsaG9zdDo0MjAwL3NvbWUvcGF0aC9kZWZpbmVkXHJcbiAgICAgKiBET00uc2V0Um91dGUoJy9zb21lL3BhdGgvZGVmaW5lZCcpO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBFeGFtcGxlIDIgLSBHZXRzIGN1cnJlbnQgcm91dGUgYXMgYXJyYXkgWydzb21lJywgJ3BhdGgnLCAnZGVmaW5lZCddXHJcbiAgICAgKiAvLyAgICAgICAgICAgICBTZXRzIG5ldyByb3V0ZSBsb2NhbGhvc3Q6NDIwMC9zb21lL3BhdGgvbmV3XHJcbiAgICAgKiBsZXQgY3VycmVudFJvdXRlID0gRE9NLmdldFJvdXRlKHRydWUpO1xyXG4gICAgICogRE9NLnNldFJvdXRlKGAvJHtjdXJyZW50Um91dGVbMF19LyR7Y3VycmVudFJvdXRlWzFdfS9uZXdgKTtcclxuICAgICAqIFxyXG4gICAgICogYGBgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0Um91dGUocm91dGUpIDogdm9pZCB7XHJcbiAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCBcIlwiLCByb3V0ZSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgtZXhwb3NlZC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==