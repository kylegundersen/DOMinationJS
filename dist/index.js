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
     * @param callback - A callback function to perfom when the event is triggered.
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
     * - ```text``` Can pass a string to textContent or append an Element/node.
     * - ```class``` Can pass multiple classes which are delimited by spaces.
     * @param events - Pass an object using this pattern. **{ [HTML DOM Event Type]: (callback Function) }**. The eventType consists of standard javascript events.
     * @returns An element Inferred from the ```element``` param.
     * ```javascript
     *
     * // Example 1
     * let newElement = DOM.create("div", ["text-class"], { id: "unique-id" }, "Some call to action text!");
     *
     * // Example 2
     * let newEvent = () => { console.log("clicked!") };
     * DOM.create("button", ["button-class"], { id: "unique-id-2" }, newElement, {click: newEvent});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZG9taW5hdGVqcy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vZG9taW5hdGVqcy8uL3NyYy9pbmRleC1leHBvc2VkLnRzIiwid2VicGFjazovL2RvbWluYXRlanMvLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0R2xvYmFsVGhpcy5qcyIsIndlYnBhY2s6Ly9kb21pbmF0ZWpzLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2RvbWluYXRlanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZG9taW5hdGVqcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZG9taW5hdGVqcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2RvbWluYXRlanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kb21pbmF0ZWpzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZG9taW5hdGVqcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2RvbWluYXRlanMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2RvbWluYXRlanMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KShzZWxmLCAoKSA9PiB7XG5yZXR1cm4gIiwidmFyIF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fID0gcmVxdWlyZShcIi0hLi4vbm9kZV9tb2R1bGVzL3RzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LnRzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9leHBvc2UtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRHbG9iYWxUaGlzLmpzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX18gPSBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXztcbl9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX19bXCJET01cIl0gPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbm1vZHVsZS5leHBvcnRzID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICByZXR1cm4gZ2xvYmFsVGhpcztcbiAgfVxuXG4gIHZhciBnO1xuXG4gIHRyeSB7XG4gICAgLy8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgZyA9IHRoaXMgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfSAvLyBUaGlzIHdvcmtzIGlmIHRoZSBzZWxmIHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblxuXG4gICAgaWYgKHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9IC8vIFRoaXMgd29ya3MgaWYgdGhlIGdsb2JhbCByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cblxuICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gZ2xvYmFsO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnO1xufSgpOyIsImltcG9ydCB7IGpzRXZlbnRzIH0gZnJvbSBcIi4vbW9kZWxzL2pzLWV2ZW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIERvY3VtZW50IE9iamVjdCBNb2RlbCAtIGhlbHBlciBmdW5jdGlvbnNcclxuICogSGVscHMgeW91IGludGVyYWN0IHdpdGggdGhlIERPTSBzYWZlbHkgYW5kIGVhc2lseS5cclxuICogXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRE9NIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBnbG9iYWwgZXZlbnQgbGlzdGVuZXIgdGhhdCBjYW4gbW9uaXRvciBjaGFuZ2VzIGFuZCBwZXJmb3JtIGV2ZW50c1xyXG4gICAgICogQHBhcmFtIHR5cGUgLSBFdmVudCB0eXBlLCBleGFtcGxlOiBjbGljaywgZGJsY2xpY2ssIG1vdXNlb3ZlciwgZWN0Li5cclxuICAgICAqIEBwYXJhbSBzZWxlY3RvciAtIFNhbWUgYXMgcXVlcnkgc2VsZWN0b3IuIEVsZW1lbnQgY2xhc3MgZGVub3RlZCB3aXRoIHBlcmlvZCwgaWQgZGVub3RlZCB3aXRoICMsIG9yIGVsZW1lbnQgbmFtZS5cclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayAtIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gcGVyZm9tIHdoZW4gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5cclxuICAgICAqIEBwYXJhbSB1c2VDYXB0dXJlIC0gT3B0aW9uYWxseSB1c2UgY2FwdHVyZSBpbnN0ZWFkIG9mIGV2ZW50IGJ1YmJsaW5nLlxyXG4gICAgICogQHBhcmFtIHBhcmVudCAtIE9wdGlvbmFsbHkgd2hlcmUgdG8gYWRkIHRoZSBsaXN0ZW5lci4gRGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50LlxyXG4gICAgICogXHJcbiAgICAgKiBgYGBqYXZhc2NyaXB0XHJcbiAgICAgKiBcclxuICAgICAqIC8vIEV4YW1wbGUgMSAtIEFkZHMgY2xpY2sgdG8gSUQgdW5pcXVlLWlkIGluc2lkZSBvZiBkb2N1bWVudC5cclxuICAgICAqIERPTS5hZGRFdmVudERlbGVnYXRlKCdjbGljaycsIFwiI3VuaXF1ZS1pZFwiLCAoKSA9PiB7IGNvbnNvbGUubG9nKFwiRklSRSFcIikgfSk7XHJcbiAgICAgKiBcclxuICAgICAqIC8vIEV4YW1wbGUgMiAtIEFkZHMgY2xpY2sgdG8gY2xhc3MgLmJ0biBpbnNpZGUgb2YgZG9jdW1lbnQuXHJcbiAgICAgKiBET00uYWRkRXZlbnREZWxlZ2F0ZSgnY2xpY2snLCBcIi5idG5cIiwgKCkgPT4geyBjb25zb2xlLmxvZyhcIkZJUkUhXCIpIH0pO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBFeGFtcGxlIDMgLSBBZGRzIGNsaWNrIHRvIGJ1dHRvbiBlbGVtZW50cyBpbnNpZGUgd2luZG93IHZpYSBjYXB0dXJlLlxyXG4gICAgICogRE9NLmFkZEV2ZW50RGVsZWdhdGUoJ2NsaWNrJywgXCJidXR0b25cIiwgKCkgPT4geyBjb25zb2xlLmxvZyhcIkZJUkUhXCIpIH0sIHRydWUsIHdpbmRvdyk7XHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogYGBgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkRXZlbnREZWxlZ2F0ZSggdHlwZSA6IGFueSwgc2VsZWN0b3IgOiBzdHJpbmcsIGNhbGxiYWNrIDogRnVuY3Rpb24sIHVzZUNhcHR1cmUgOiBib29sZWFuID0gZmFsc2UsIHBhcmVudDogYW55ID0gZG9jdW1lbnQpIHtcclxuICAgICAgICBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lciggdHlwZSxcclxuICAgICAgICAgICAgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQubWF0Y2hlcyhzZWxlY3RvcikpIGNhbGxiYWNrKGUpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVzZUNhcHR1cmVcclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBjb21wbGV4IERPTSBlbGVtZW50IHdpdGggYSBzaW5nbGUgZnVuY2l0b24uXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAtIFN0YW5kYXJkIEhUTUwgZWxlbWVudC4gRXhhbXBsZTogZGl2LCBzcGFuLCBpbnB1dCwgYnV0dG9uLCBlY3QuLi5cclxuICAgICAqIEBwYXJhbSBhdHRyaWJ1dGVzIC0gUGFzcyBhbiBvYmplY3QgdXNpbmcgdGhpcyBwYXR0ZXJuLiAqKnsgYXR0cmlidXRlTmFtZSA6IHZhbHVlIH0qKi4gXHJcbiAgICAgKiAtIGBgYHRleHRgYGAgQ2FuIHBhc3MgYSBzdHJpbmcgdG8gdGV4dENvbnRlbnQgb3IgYXBwZW5kIGFuIEVsZW1lbnQvbm9kZS5cclxuICAgICAqIC0gYGBgY2xhc3NgYGAgQ2FuIHBhc3MgbXVsdGlwbGUgY2xhc3NlcyB3aGljaCBhcmUgZGVsaW1pdGVkIGJ5IHNwYWNlcy5cclxuICAgICAqIEBwYXJhbSBldmVudHMgLSBQYXNzIGFuIG9iamVjdCB1c2luZyB0aGlzIHBhdHRlcm4uICoqeyBbSFRNTCBET00gRXZlbnQgVHlwZV06IChjYWxsYmFjayBGdW5jdGlvbikgfSoqLiBUaGUgZXZlbnRUeXBlIGNvbnNpc3RzIG9mIHN0YW5kYXJkIGphdmFzY3JpcHQgZXZlbnRzLlxyXG4gICAgICogQHJldHVybnMgQW4gZWxlbWVudCBJbmZlcnJlZCBmcm9tIHRoZSBgYGBlbGVtZW50YGBgIHBhcmFtLlxyXG4gICAgICogYGBgamF2YXNjcmlwdFxyXG4gICAgICogXHJcbiAgICAgKiAvLyBFeGFtcGxlIDFcclxuICAgICAqIGxldCBuZXdFbGVtZW50ID0gRE9NLmNyZWF0ZShcImRpdlwiLCBbXCJ0ZXh0LWNsYXNzXCJdLCB7IGlkOiBcInVuaXF1ZS1pZFwiIH0sIFwiU29tZSBjYWxsIHRvIGFjdGlvbiB0ZXh0IVwiKTtcclxuICAgICAqXHJcbiAgICAgKiAvLyBFeGFtcGxlIDJcclxuICAgICAqIGxldCBuZXdFdmVudCA9ICgpID0+IHsgY29uc29sZS5sb2coXCJjbGlja2VkIVwiKSB9O1xyXG4gICAgICogRE9NLmNyZWF0ZShcImJ1dHRvblwiLCBbXCJidXR0b24tY2xhc3NcIl0sIHsgaWQ6IFwidW5pcXVlLWlkLTJcIiB9LCBuZXdFbGVtZW50LCB7Y2xpY2s6IG5ld0V2ZW50fSk7XHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIGBgYFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShlbGVtZW50OiBzdHJpbmcsIGF0dHJpYnV0ZXM6IGFueSA9IG51bGwsIGV2ZW50czoganNFdmVudHMgPSBudWxsKSA6IGFueSB7XHJcblxyXG4gICAgICAgIGxldCBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcclxuXHJcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChhdHRyaWJ1dGVOYW1lID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2goYXR0cmlidXRlTmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNsYXNzXCIgOiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0udHJpbSgpLnNwbGl0KC9cXHMrLykpLmZvckVhY2goIGF0dHJDbGFzcyA9PiB7IGVsZW0uY2xhc3NMaXN0LmFkZChhdHRyQ2xhc3MpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0ZXh0XCIgOiBcclxuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YgYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSA9PT0gXCJzdHJpbmdcIikgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS50ZXh0Q29udGVudCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV07IFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uYXBwZW5kKGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGF0YXNldFwiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSkuZm9yRWFjaCgoW2RhdGFLZXksIGRhdGFWYWx1ZV0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uZGF0YXNldFtkYXRhS2V5XSA9IGRhdGFWYWx1ZSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0IDogZWxlbS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChldmVudHMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IGV2ZW50TGlzdCA6IEFycmF5PHN0cmluZz4gPSBPYmplY3Qua2V5cyhldmVudHMpO1xyXG4gICAgICAgICAgICBldmVudExpc3QuZm9yRWFjaChldmVudCA9PiBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGV2ZW50c1tldmVudF0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvcnRoYW5kIGZvciB0aGUgcXVlcnkgc2VsZWN0b3JcclxuICAgICAqIEBwYXJhbSBxdWVyeSAtIEEgcXVlcnkgc2VsZWN0b3Igc3RyaW5nLCBFeGFtcGxlOiBgYGBcIi5jbGFzc1wiYGBgXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAtIERlZmF1bHRzIHRvIHRoZSBkb2N1bWVudCBvYmplY3RcclxuICAgICAqIEByZXR1cm4gVGhlIGZpcnN0IG9yIG9ubHkgZWxlbWVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNlbGVjdChxdWVyeTogc3RyaW5nLCBwYXJlbnQgOiBhbnkgPSBkb2N1bWVudCk6IEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiBwYXJlbnQucXVlcnlTZWxlY3RvcihxdWVyeSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG9ydGhhbmQgZm9yIHRoZSBxdWVyeSBzZWxlY3RvciBhbGwgd2l0aCB0aGUgYWRkZWQgYm9udXMgb2YgcmV0dXJuaW5nIGFuIGFycmF5LlxyXG4gICAgICogQHBhcmFtIHF1ZXJ5IC0gQSBxdWVyeSBzZWxlY3RvciBzdHJpbmcsIEV4YW1wbGU6IGBgYFwiLmNsYXNzXCJgYGBcclxuICAgICAqIEBwYXJhbSBlbGVtZW50IC0gRGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50IG9iamVjdFxyXG4gICAgICogQHJldHVybiBBbiBhcnJheSBvZiBlbGVtZW50c1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNlbGVjdEFsbChxdWVyeTogc3RyaW5nLCBwYXJlbnQgOiBhbnkgPSBkb2N1bWVudCk6IEFycmF5PEVsZW1lbnQ+IHtcclxuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFjaCBhbmQgcmV0dXJuIGFuIEVsZW1lbnQgZnJvbSB0aGUgRE9NXHJcbiAgICAgKiBAcGFyYW0gcmVmZXJlbWNlIEEgcXVlcnkgc2VsZWN0b3Igc3RyaW5nIG9yIGVsZW0gcmVmZXJlbmNlIChFbGVtZW50LCBlY3QuLi4pXHJcbiAgICAgKiBAcmV0dXJuIFRoZSBkZXRhY2hlZCBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZGV0YWNoKHJlZmVyZW1jZTogc3RyaW5nIHwgRWxlbWVudCk6IEVsZW1lbnQge1xyXG4gICAgICAgIGxldCBlbGVtOiBFbGVtZW50ID0gdHlwZW9mIHJlZmVyZW1jZSA9PT0gXCJzdHJpbmdcIiA/IHRoaXMuc2VsZWN0KHJlZmVyZW1jZSkgOiByZWZlcmVtY2U7XHJcbiAgICAgICAgcmV0dXJuIGVsZW0ucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbGVtKTtcclxuICAgIH1cclxuXHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgtZXhwb3NlZC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==