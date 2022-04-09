import { jsEvents } from "./models/js-events";

/**
 * Document Object Model - helper functions
 * Helps you interact with the DOM safely and easily.
 * 
 */
export class DOM {

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
    public static addEventDelegate( type : any, selector : string, callback : Function, useCapture : boolean = false, parent: any = document) {
        parent.addEventListener( type,
            e => {
                if (e.target.matches(selector)) callback(e)
            },
            useCapture
        )
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
    public static create(element: string, attributes: any = null, events: jsEvents = null) : any {

        let elem = document.createElement(element);

        if (attributes !== null) {
            Object.keys(attributes).forEach(attributeName => {

                switch(attributeName){
                    case "class" : 
                        (attributes[attributeName].trim().split(/\s+/)).forEach( attrClass => { elem.classList.add(attrClass) });
                    break;
                    case "text" : 
                    if(typeof attributes[attributeName] === "string") { 
                        elem.textContent = attributes[attributeName]; 
                    } else {
                        elem.append(attributes[attributeName]);
                    }
                    break;
                    case "dataset" :
                        Object.entries(attributes[attributeName]).forEach(([dataKey, dataValue]) => {
                            elem.dataset[dataKey] = dataValue as string;
                        })                          
                    break;
                    default : elem.setAttribute(attributeName, attributes[attributeName]);
                }

            });
        }

        if (events !== null) {
            let eventList : Array<string> = Object.keys(events);
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
    public static select(query: string, parent : any = document): Element {
        return parent.querySelector(query);
    }

    /**
     * Shorthand for the query selector all with the added bonus of returning an array.
     * @param query - A query selector string, Example: ```".class"```
     * @param element - Defaults to the document object
     * @return An array of elements
     */
    public static selectAll(query: string, parent : any = document): Array<Element> {
        return Array.prototype.slice.call(parent.querySelectorAll(query));
    }

    /**
     * Detach and return an Element from the DOM
     * @param referemce A query selector string or elem reference (Element, ect...)
     * @return The detached element
     */
    public static detach(referemce: string | Element): Element {
        let elem: Element = typeof referemce === "string" ? this.select(referemce) : referemce;
        return elem.parentElement.removeChild(elem);
    }

}