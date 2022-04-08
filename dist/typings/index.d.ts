import { jsEvents } from "./models/js-events";
/**
 * Document Object Model - helper functions
 * Helps you interact with the DOM safely and easily.
 *
 */
export declare class DOM {
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
    static addEventDelegate(type: any, selector: string, callback: Function, useCapture?: boolean, parent?: any): void;
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
    static create(element: string, attributes?: any, events?: jsEvents): any;
    /**
     * Shorthand for the query selector
     * @param query - A query selector string, Example: ```".class"```
     * @param element - Defaults to the document object
     * @return The first or only element
     */
    static select(query: string, parent?: any): Element;
    /**
     * Shorthand for the query selector all with the added bonus of returning an array.
     * @param query - A query selector string, Example: ```".class"```
     * @param element - Defaults to the document object
     * @return An array of elements
     */
    static selectAll(query: string, parent?: any): Array<Element>;
    /**
     * Detach and return an Element from the DOM
     * @param referemce A query selector string or elem reference (Element, ect...)
     * @return The detached element
     */
    static detach(referemce: string | Element): Element;
}
