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
        parent.addEventListener(type, e => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2RvbWluYXRpb24tanMvLi9zcmMvaW5kZXgtZXhwb3NlZC50cyIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzLy4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXIvZGlzdC9ydW50aW1lL2dldEdsb2JhbFRoaXMuanMiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkoc2VsZiwgKCkgPT4ge1xucmV0dXJuICIsInZhciBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCItIS4uL25vZGVfbW9kdWxlcy90cy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC50c1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0R2xvYmFsVGhpcy5qc1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fID0gX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX187XG5fX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fW1wiRE9NXCJdID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG5tb2R1bGUuZXhwb3J0cyA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgcmV0dXJuIGdsb2JhbFRoaXM7XG4gIH1cblxuICB2YXIgZztcblxuICB0cnkge1xuICAgIC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgIGcgPSB0aGlzIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gd2luZG93O1xuICAgIH0gLy8gVGhpcyB3b3JrcyBpZiB0aGUgc2VsZiByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cblxuICAgIGlmICh0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSAvLyBUaGlzIHdvcmtzIGlmIHRoZSBnbG9iYWwgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXG5cbiAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuIGdsb2JhbDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZztcbn0oKTsiLCJpbXBvcnQgeyBKU0V2ZW50cyB9IGZyb20gXCIuL21vZGVscy9qcy1ldmVudHNcIjtcclxuaW1wb3J0IHsgSlNFdmVudHNFbnVtIH0gZnJvbSBcIi4vZW51bS9qcy1ldmVudHNcIjtcclxuLyoqXHJcbiAqIERvY3VtZW50IE9iamVjdCBNb2RlbCAtIGhlbHBlciBmdW5jdGlvbnNcclxuICogSGVscHMgeW91IGludGVyYWN0IHdpdGggdGhlIERPTSBzYWZlbHkgYW5kIGVhc2lseS5cclxuICogXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRE9NIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCBmb2xsb3dzIHRoZSBldmVudCBkZWxlZ2F0aW9uIHBhdHRlcm4uIFRoZSBhZHZhbnRhZ2UgaXMgdGhhdCB5b3UgY2FuIGFkZCBcclxuICAgICAqIGVsZW1lbnRzIGF0IGFueSBkZXB0aCBpbnNpZGUgdGhlIHBhcmVudCBjb250YWluZXIgd2l0aG91dCBoYXZpbmcgdG8gd29ycnkgYWJvdXQgdGhlIGV2ZW50IGJlaW5nIFxyXG4gICAgICogYXBwbGllZC4gVGhpcyBzb2x2ZXMgaGF2aW5nIHRvIGFkZCwgcmVtb3ZlLCBhbmQgbWFuYWdlIGV2ZW50cyBwZXIgZWxlbWVudC5cclxuICAgICAqIEBwYXJhbSB0eXBlIC0gRXZlbnQgdHlwZSwgZXhhbXBsZTogY2xpY2ssIGRibGNsaWNrLCBtb3VzZW92ZXIsIGVjdC4uXHJcbiAgICAgKiBAcGFyYW0gc2VsZWN0b3IgLSBTYW1lIGFzIHF1ZXJ5IHNlbGVjdG9yLiBFbGVtZW50IGNsYXNzIGRlbm90ZWQgd2l0aCBwZXJpb2QsIGlkIGRlbm90ZWQgd2l0aCAjLCBvciBlbGVtZW50IG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgLSBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHBlcmZvcm0gd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLlxyXG4gICAgICogQHBhcmFtIHVzZUNhcHR1cmUgLSBPcHRpb25hbGx5IHVzZSBjYXB0dXJlIGluc3RlYWQgb2YgZXZlbnQgYnViYmxpbmcuXHJcbiAgICAgKiBAcGFyYW0gcGFyZW50IC0gT3B0aW9uYWxseSB3aGVyZSB0byBhZGQgdGhlIGxpc3RlbmVyLiBEZWZhdWx0cyB0byB0aGUgZG9jdW1lbnQuXHJcbiAgICAgKiBcclxuICAgICAqIGBgYGphdmFzY3JpcHRcclxuICAgICAqIFxyXG4gICAgICogLy8gRXhhbXBsZSAxIC0gQWRkcyBjbGljayB0byBJRCB1bmlxdWUtaWQgaW5zaWRlIG9mIGRvY3VtZW50LlxyXG4gICAgICogRE9NLmFkZEV2ZW50RGVsZWdhdGUoJ2NsaWNrJywgXCIjdW5pcXVlLWlkXCIsICgpID0+IHsgY29uc29sZS5sb2coXCJGSVJFIVwiKSB9KTtcclxuICAgICAqIFxyXG4gICAgICogLy8gRXhhbXBsZSAyIC0gQWRkcyBjbGljayB0byBjbGFzcyAuYnRuIGluc2lkZSBvZiBkb2N1bWVudC5cclxuICAgICAqIERPTS5hZGRFdmVudERlbGVnYXRlKCdjbGljaycsIFwiLmJ0blwiLCAoKSA9PiB7IGNvbnNvbGUubG9nKFwiRklSRSFcIikgfSk7XHJcbiAgICAgKiBcclxuICAgICAqIC8vIEV4YW1wbGUgMyAtIEFkZHMgY2xpY2sgdG8gYnV0dG9uIGVsZW1lbnRzIGluc2lkZSB3aW5kb3cgdmlhIGNhcHR1cmUuXHJcbiAgICAgKiBET00uYWRkRXZlbnREZWxlZ2F0ZSgnY2xpY2snLCBcImJ1dHRvblwiLCAoKSA9PiB7IGNvbnNvbGUubG9nKFwiRklSRSFcIikgfSwgdHJ1ZSwgd2luZG93KTtcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhZGRFdmVudERlbGVnYXRlKHR5cGU6IEpTRXZlbnRzRW51bSB8IHN0cmluZywgc2VsZWN0b3I6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uLCB1c2VDYXB0dXJlOiBib29sZWFuID0gZmFsc2UsIHBhcmVudDogYW55ID0gZG9jdW1lbnQpIHtcclxuICAgICAgICBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLFxyXG4gICAgICAgICAgICBlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5tYXRjaGVzKHNlbGVjdG9yKSkgY2FsbGJhY2soZSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXNlQ2FwdHVyZVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIGNvbXBsZXggRE9NIGVsZW1lbnQgd2l0aCBhIHNpbmdsZSBmdW5jaXRvbi5cclxuICAgICAqIEBwYXJhbSBlbGVtZW50IC0gU3RhbmRhcmQgSFRNTCBlbGVtZW50LiBFeGFtcGxlOiBkaXYsIHNwYW4sIGlucHV0LCBidXR0b24sIGVjdC4uLlxyXG4gICAgICogQHBhcmFtIGF0dHJpYnV0ZXMgLSBQYXNzIGFuIG9iamVjdCB1c2luZyB0aGlzIHBhdHRlcm4uICoqeyBhdHRyaWJ1dGVOYW1lIDogdmFsdWUgfSoqLiBcclxuICAgICAqIC0gYGBgdGV4dGBgYCBZb3UgYXJlIGFibGUgdG8gcGFzcyBhIHN0cmluZyBhcyB0ZXh0Q29udGVudCBvciBwYXNzIGFuIEVsZW1lbnQvbm9kZSB0byBhcHBlbmQuXHJcbiAgICAgKiAtIGBgYGNsYXNzYGBgIFlvdSBhcmUgYWJsZSB0byBwYXNzIG11bHRpcGxlIGNsYXNzZXMgdXNpbmcgYSBzcGFjZSBhcyB0aGUgZGVsaW1pdGVyLlxyXG4gICAgICogQHBhcmFtIGV2ZW50cyAtIE9wdGlvbmFsbHkgcGFzcyBhbiBvYmplY3QgdXNpbmcgdGhpcyBwYXR0ZXJuIHRvIGFkZCBldmVudHMuICoqeyBldmVudFR5cGU6IGNhbGxiYWNrIH0qKi4gVGhlIGV2ZW50VHlwZSBjb25zaXN0cyBvZiBzdGFuZGFyZCBqYXZhc2NyaXB0IGV2ZW50cy5cclxuICAgICAqIEByZXR1cm5zIFRoZSBuZXcgY3JlYXRlZCBlbGVtZW50IGluZmVycmVkIGZyb20gdGhlIGBgYGVsZW1lbnRgYGAgcGFyYW0uXHJcbiAgICAgKiBgYGBqYXZhc2NyaXB0XHJcbiAgICAgKiBcclxuICAgICAqIC8vIEV4YW1wbGUgMSAtIDxkaXYgaWQ9XCJ1bmlxdWUtaWRcIiBjbGFzcz1cInRleHQtY2xhc3NcIj4gU29tZSBjYWxsIHRvIGFjdGlvbiB0ZXh0ISA8L2Rpdj5cclxuICAgICAqIGxldCBuZXdFbGVtZW50ID0gRE9NLmNyZWF0ZShcImRpdlwiLCB7IGlkOiBcInVuaXF1ZS1pZFwiLCBjbGFzczogXCJ0ZXh0LWNsYXNzXCIsIHRleHQ6IFwiU29tZSBjYWxsIHRvIGFjdGlvbiB0ZXh0IVwifSk7XHJcbiAgICAgKlxyXG4gICAgICogLy8gRXhhbXBsZSAyIC0gV2hlbiBjbGlja2VkIGl0IHByaW50cyBvdXQgXCJDbGlja2VkIVwiIHRvIHRoZSBjb25zb2xlLlxyXG4gICAgICogLy8gPGJ1dHRvbiBpZD1cInVuaXF1ZS1pZC0yXCIgY2xhc3M9XCJidXR0b24tY2xhc3NcIj5cclxuICAgICAqIC8vICA8ZGl2IGlkPVwidW5pcXVlLWlkXCIgY2xhc3M9XCJ0ZXh0LWNsYXNzXCI+IFNvbWUgY2FsbCB0byBhY3Rpb24gdGV4dCEgPC9kaXY+XHJcbiAgICAgKiAvLyA8L2J1dHRvbj5cclxuICAgICAqIERPTS5jcmVhdGUoXCJidXR0b25cIiwgeyBpZDogXCJ1bmlxdWUtaWQtMlwiLCBjbGFzczogXCJidXR0b24tY2xhc3NcIiwgdGV4dDogbmV3RWxlbWVudH0sIHsgY2xpY2s6ICgpID0+IGNvbnNvbGUubG9nKCdDbGlja2VkIScpIH0pO1xyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoZWxlbWVudDogc3RyaW5nLCBhdHRyaWJ1dGVzOiBhbnkgPSBudWxsLCBldmVudHM6IEpTRXZlbnRzID0gbnVsbCk6IGFueSB7XHJcblxyXG4gICAgICAgIGxldCBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcclxuXHJcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChhdHRyaWJ1dGVOYW1lID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGF0dHJpYnV0ZU5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY2xhc3NcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0udHJpbSgpLnNwbGl0KC9cXHMrLykpLmZvckVhY2goYXR0ckNsYXNzID0+IHsgZWxlbS5jbGFzc0xpc3QuYWRkKGF0dHJDbGFzcykgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0ZXh0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS50ZXh0Q29udGVudCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmFwcGVuZChhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGF0YXNldFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyhhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdKS5mb3JFYWNoKChbZGF0YUtleSwgZGF0YVZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5kYXRhc2V0W2RhdGFLZXldID0gZGF0YVZhbHVlIGFzIHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogZWxlbS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChldmVudHMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IGV2ZW50TGlzdDogQXJyYXk8c3RyaW5nPiA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XHJcbiAgICAgICAgICAgIGV2ZW50TGlzdC5mb3JFYWNoKGV2ZW50ID0+IGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZXZlbnRzW2V2ZW50XSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG9ydGhhbmQgZm9yIHRoZSBxdWVyeSBzZWxlY3RvclxyXG4gICAgICogQHBhcmFtIHF1ZXJ5IC0gQSBxdWVyeSBzZWxlY3RvciBzdHJpbmcsIEV4YW1wbGU6IGBgYFwiLmNsYXNzXCJgYGBcclxuICAgICAqIEBwYXJhbSBlbGVtZW50IC0gRGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50IG9iamVjdFxyXG4gICAgICogQHJldHVybiBUaGUgZmlyc3Qgb3Igb25seSBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2VsZWN0KHF1ZXJ5OiBzdHJpbmcsIHBhcmVudDogYW55ID0gZG9jdW1lbnQpOiBFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gcGFyZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvcnRoYW5kIGZvciB0aGUgcXVlcnkgc2VsZWN0b3IgYWxsIHdpdGggdGhlIGFkZGVkIGJvbnVzIG9mIHJldHVybmluZyBhbiBhcnJheS5cclxuICAgICAqIEBwYXJhbSBxdWVyeSAtIEEgcXVlcnkgc2VsZWN0b3Igc3RyaW5nLCBFeGFtcGxlOiBgYGBcIi5jbGFzc1wiYGBgXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAtIERlZmF1bHRzIHRvIHRoZSBkb2N1bWVudCBvYmplY3RcclxuICAgICAqIEByZXR1cm4gQW4gYXJyYXkgb2YgZWxlbWVudHNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzZWxlY3RBbGwocXVlcnk6IHN0cmluZywgcGFyZW50OiBhbnkgPSBkb2N1bWVudCk6IEFycmF5PEVsZW1lbnQ+IHtcclxuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFjaCBhbmQgcmV0dXJuIGFuIEVsZW1lbnQgZnJvbSB0aGUgRE9NXHJcbiAgICAgKiBAcGFyYW0gcmVmZXJlbmNlIEEgcXVlcnkgc2VsZWN0b3Igc3RyaW5nIG9yIGVsZW0gcmVmZXJlbmNlIChFbGVtZW50LCBlY3QuLi4pXHJcbiAgICAgKiBAcmV0dXJuIFRoZSBkZXRhY2hlZCBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZGV0YWNoKHJlZmVyZW5jZTogc3RyaW5nIHwgRWxlbWVudCk6IEVsZW1lbnQge1xyXG4gICAgICAgIGxldCBlbGVtOiBFbGVtZW50ID0gdHlwZW9mIHJlZmVyZW5jZSA9PT0gXCJzdHJpbmdcIiA/IHRoaXMuc2VsZWN0KHJlZmVyZW5jZSkgOiByZWZlcmVuY2U7XHJcbiAgICAgICAgcmV0dXJuIGVsZW0ucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbGVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFR3by13YXkgZGF0YSBiaW5kaW5nIGJldHdlZW4gYW4gb2JqZWN0J3MgcHJvcGVydHkgYW5kIGFuIEVsZW1lbnQncyBhdHRyaWJ1dGUuXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0IC0gVGhlIHBhcmVudCBvYmplY3Qgd2hlcmUgdGhlIHByb3BlcnR5IHdpbGwgYmUgYWRkZWQuXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0UHJvcGVydHkgLSBDcmVhdGUgYSBwcm9wZXJ0eSB0aGF0IGJpbmRzIHdpdGggYW4gYXR0cmlidXRlLlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgLSBUaGUgZWxlbWVudCBvciBxdWVyeSBzZWxlY3RvciBvZiB0aGUgZWxlbWVudC5cclxuICAgICAqIEBwYXJhbSBlbGVtZW50QXR0cmlidXRlIC0gVGhlIGF0dHJpYnV0ZSB0byBiaW5kIHRvIHRoZSBvYmplY3QncyBwcm9wZXJ0eS5cclxuICAgICAqIGBgYGphdmFzY3JpcHRcclxuICAgICAqIFxyXG4gICAgICogLy8gRXhhbXBsZSAtIEJpbmRzIE9iamVjdCBQcm9wZXJ0eSBcIm5hbWVcIiAoZGF0YU9iamVjdC5uYW1lKSB0byBhbiBlbGVtZW50J3MgYXR0cmlidXRlIHZhbHVlLiBcclxuICAgICAqIGxldCBkYXRhT2JqZWN0ID0ge307XHJcbiAgICAgKiBET00uYmluZEF0dHJpYnV0ZShkYXRhT2JqZWN0LCBcIm5hbWVcIiwgXCIjdW5pcXVlLWlkXCIsICd2YWx1ZScpO1xyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBiaW5kQXR0cmlidXRlKG9iamVjdDogYW55LCBvYmplY3RQcm9wZXJ0eTogc3RyaW5nLCBlbGVtZW50OiBFbGVtZW50IHwgc3RyaW5nLCBlbGVtZW50QXR0cmlidXRlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBsZXQgZWxlbTogRWxlbWVudCA9IHR5cGVvZiBlbGVtZW50ID09PSBcInN0cmluZ1wiID8gdGhpcy5zZWxlY3QoZWxlbWVudCkgOiBlbGVtZW50O1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIG9iamVjdFByb3BlcnR5LCB7XHJcbiAgICAgICAgICAgIGdldCgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZShlbGVtZW50QXR0cmlidXRlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZShlbGVtZW50QXR0cmlidXRlLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGEgcm91dGUgYmFzZWQgb24gY3VycmVudCBwYXRoLiBUaGlzIGlzIGdyZWF0IGZvciBtYWtpbmcgYSBTUEEgd2l0aCBkZWVwLWxpbmtpbmcuIFxyXG4gICAgICogQHBhcmFtIGlzQXJyYXkgLSBUaGlzIHdpbGwgcmV0dXJuIHRoZSBwYXRoIGFzIGFuIGFycmF5IGBgYFsnc29tZScsICdwYXRoJywgJ2RlZmluZWQnXWBgYCBcclxuICAgICAqIG90aGVyd2lzZSBpdCB3aWxsIGRlZmF1bHQgdG8gYSBzdHJpbmcgYGBgJy9zb21lL3BhdGgvZGVmaW5lZCdgYGAuXHJcbiAgICAgKiBAcmV0dXJuIC0gQSBzdHJpbmcgb3IgYXJyYXkgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhOYW1lXHJcbiAgICAgKiBcclxuICAgICAqIGBgYGphdmFzY3JpcHRcclxuICAgICAqIFxyXG4gICAgICogLy8gRXhhbXBsZSAxIC0gR2V0IHBhdGggYC9zb21lL3BhdGgvZGVmaW5lZGBcclxuICAgICAqIGxldCBjdXJyZW50Um91dGUgPSBET00uZ2V0Um91dGUoKTtcclxuICAgICAqIFxyXG4gICAgICogLy8gRXhhbXBsZSAyIC0gR2V0IHBhdGggYXMgYXJyYXkgWydzb21lJywgJ3BhdGgnLCAnZGVmaW5lZCddXHJcbiAgICAgKiBsZXQgY3VycmVudFJvdXRlID0gRE9NLmdldFJvdXRlKHRydWUpO1xyXG4gICAgICogXHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRSb3V0ZShpc0FycmF5ID0gZmFsc2UpIDogQXJyYXk8c3RyaW5nPiB8IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGlzQXJyYXkgPyBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdChcIi9cIikuZmlsdGVyKG4gPT4gbikgOiBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBhIHJvdXRlIGJhc2VkIG9uIHBhdGguIFRoaXMgaXMgZ3JlYXQgZm9yIG1ha2luZyBhIFNQQSB3aXRoIGRlZXAtbGlua2luZy4gXHJcbiAgICAgKiBAcGFyYW0gcm91dGUgLSBUaGUgcGF0aCB5b3Ugd2FudCB0byBuYXZpZ2F0ZSB3aXRob3V0IHJlZnJlc2hpbmcgdGhlIHZpZXcuXHJcbiAgICAgKiBcclxuICAgICAqIGBgYGphdmFzY3JpcHRcclxuICAgICAqIFxyXG4gICAgICogLy8gRXhhbXBsZSAxIC0gU2V0IHVybCBsb2NhbGhvc3Q6NDIwMC9zb21lL3BhdGgvZGVmaW5lZFxyXG4gICAgICogRE9NLnNldFJvdXRlKCcvc29tZS9wYXRoL2RlZmluZWQnKTtcclxuICAgICAqIFxyXG4gICAgICogLy8gRXhhbXBsZSAyIC0gR2V0cyBjdXJyZW50IHJvdXRlIGFzIGFycmF5IFsnc29tZScsICdwYXRoJywgJ2RlZmluZWQnXVxyXG4gICAgICogLy8gICAgICAgICAgICAgU2V0cyBuZXcgcm91dGUgbG9jYWxob3N0OjQyMDAvc29tZS9wYXRoL25ld1xyXG4gICAgICogbGV0IGN1cnJlbnRSb3V0ZSA9IERPTS5nZXRSb3V0ZSh0cnVlKTtcclxuICAgICAqIERPTS5zZXRSb3V0ZShgLyR7Y3VycmVudFJvdXRlWzBdfS8ke2N1cnJlbnRSb3V0ZVsxXX0vbmV3YCk7XHJcbiAgICAgKiBcclxuICAgICAqIGBgYFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldFJvdXRlKHJvdXRlKSA6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgXCJcIiwgcm91dGUpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LWV4cG9zZWQudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=