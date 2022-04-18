import { JSEvents } from "./models/js-events";
import { JSEventsEnum } from "./enum/js-events";
/**
 * Document Object Model - helper functions
 * Helps you interact with the DOM safely and easily.
 * 
 */
export class DOM {

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
    public static addEventDelegate(type: JSEventsEnum | string, selector: string, callback: Function, useCapture: boolean = false, parent: any = document) {
        parent.addEventListener(type,
            (e) => {
                if (e.target.matches(selector)) callback(e)
            },
            useCapture
        )
    }

    /**
     * Create a complex DOM element with a single funciton.
     * @param element - Standard HTML element. Example: div, span, input, button, ect...
     * @param attributes - (Optional) Pass an object using this pattern. **{ attributeName : value }**. 
     * - ```text``` You are able to pass a string as textContent.
     * - ```append``` Pass an element/node, or an array of elements/nodes to append.
     * - ```html``` You are able to pass a string as HTML. **Do not pass user changable data for obvious security reasons!**
     * - ```class``` You are able to pass multiple classes using a space as the delimiter.
     * @param events - (Optional) Pass an object using this pattern to add events. **{ eventType: callback }**. The eventType consists of standard javascript events.
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
    public static create(element: string, attributes: any = null, events: JSEvents = null): any {

        let elem = document.createElement(element);

        if (attributes !== null) {
            Object.keys(attributes).forEach(attributeName => {

                switch (attributeName) {
                    case "class":
                        (attributes[attributeName].trim().split(/\s+/)).forEach(attrClass => { elem.classList.add(attrClass) });
                        break;
                    case "text":
                    case "append":
                        if (typeof attributes[attributeName] === "string") {
                            elem.textContent = attributes[attributeName];
                        } else {
                            if(attributes[attributeName].length){
                                elem.append(...attributes[attributeName]);
                            } else {
                                elem.append(attributes[attributeName]);
                            }
                        }
                        break;
                    case "html":
                        elem.innerHTML = attributes[attributeName];
                        break;
                    case "dataset":
                        Object.entries(attributes[attributeName]).forEach(([dataKey, dataValue]) => {
                            elem.dataset[dataKey] = dataValue as string;
                        })
                        break;
                    default: elem.setAttribute(attributeName, attributes[attributeName]);
                }

            });
        }

        if (events !== null) {
            let eventList: Array<string> = Object.keys(events);
            eventList.forEach(event => elem.addEventListener(event, events[event]));
        }

        return elem;
    }

    /**
     * Shorthand for the query selector
     * @param query - A query selector string, Example: ```".class"```
     * @param element - (Optional) Defaults to the document object
     * @return The first or only element
     */
    public static select(query: string, parent: any = document): Element {
        return parent.querySelector(query);
    }

    /**
     * Shorthand for the query selector all with the added bonus of returning an array.
     * @param query - A query selector string, Example: ```".class"```
     * @param element - (Optional) Defaults to the document object
     * @return An array of elements
     */
    public static selectAll(query: string, parent: any = document): Array<Element> {
        return Array.prototype.slice.call(parent.querySelectorAll(query));
    }

    /**
     * Detach and return an Element from the DOM
     * @param reference A query selector string or elem reference (Element, ect...)
     * @return The detached element
     */
    public static detach(reference: string | Element): Element {
        let elem: Element = typeof reference === "string" ? this.select(reference) : reference;
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
    public static bindAttribute(object: any, objectProperty: string, element: Element | string, elementAttribute: string): void {
        let elem: Element = typeof element === "string" ? this.select(element) : element;
        Object.defineProperty(object, objectProperty, {
            get() {
                return elem.getAttribute(elementAttribute);
            },
            set(value) {
                elem.setAttribute(elementAttribute, value);
            }
        })
    }

    /**
     * Get a route based on current location path name.
     * @param isArray - (Optional) This will return the path as an array ```['some', 'path', 'defined']``` 
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
    public static getRoute(isArray:boolean = false) : Array<string> | string {
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
    public static getRouteData(isObject:boolean = true) : any | string {
        return isObject ? Object.fromEntries(new URLSearchParams(document.location.search) as any) : document.location.search;
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
    public static setRoute(route) : void {
        window.history.pushState({}, "", route);
    }

}

