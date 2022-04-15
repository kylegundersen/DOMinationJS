

# DOMinationJS ![Build](https://img.shields.io/github/package-json/v/kylegundersen/DOMinationJS/main?label=Stable%20Version) ![coverage](https://img.shields.io/badge/coverage-100%25-green)

JS frameworks are a paragon of bloat, bugs, performance, and integration issues. Although there are reasons to use a framework, they offer little value to anyone with a working knowledge of javascript. This library follows a simple methodology; less is more. We use the DRY principle and other patterns to reduce the amount of code needed to interact with the DOM. A lightweight purpose-driven library for complete Javascript DOMination.

#### **Check out the [DOMinationJS Samples](https://github.com/kylegundersen/DOMinationJS-Samples) to get started fast.**

Here is an example of how DOMinationJS reduces the code in your application.
#### Code Sample:
```javascript
// Standard way to create an element in vanilla JS
let newElement = document.createElement('div');
newElement.classList.add('class-1');
newElement.classList.add('class-2');
newElement.id = 'guid';
newElement.textContent = 'button name';
newElement.addEventListener('click', () => console.log('clicked'));

// The DOMinationJS way
let newElement = DOM.create("div", { class: "class-1 class-2", id:'guid', text: 'button name' }, { click : () => console.log('clicked') });
```
&nbsp;

# Installation 

You can install via NPM or download from GitHub.
```
npm i domination-js
```

&nbsp;

# Getting Started
Once installed. Then just import the package into your project. This was written in Typescript so that is the recommended way to use it, but it should work for most scenerios.


```javascript

import { DOM } from 'domination-js';

```

&nbsp;

# DOM API

The DOM module reduces the amount of boilerplate needed for working with the document object model. The goal is to use this alongside existing DOM functions; it should not and will not replace everything.

### **addEventDelegate**
Adds an event listener that follows the event delegation pattern. The advantage is that you can add elements at any depth inside the parent container without having to worry about the event being applied. This solves having to add, remove, and manage events per element.
* @param type - Event type, example: click, dblclick, mouseover, ect..
* @param selector - Same as query selector. Element class denoted with period, id denoted with #, or element name.
* @param callback - A callback function to perform when the event is triggered.
* @param useCapture - Optionally use capture instead of event bubbling.
* @param parent - Optionally where to add the listener. Defaults to the document.
#### Code Sample:
```javascript
// Example 1 - Adds click to ID unique-id inside of document.
DOM.addEventDelegate('click', "#unique-id", () => { console.log("FIRE!") });

// Example 2 - Adds click to class .btn inside of document.
DOM.addEventDelegate('click', ".btn", () => { console.log("FIRE!") });

// Example 3 - Adds click to button elements inside window via capture.
DOM.addEventDelegate('click', "button", () => { console.log("FIRE!") }, true, window);
```


### **create**
Create a complex DOM element with a single funciton.
* @param element - Standard HTML element. Example: div, span, input, button, ect...
* @param attributes - Pass an object using this pattern. **{ attributeName : value }**. 
* ```text``` You are able to pass a string as textContent or pass an Element/node to append.
* ```class``` You are able to pass multiple classes using a space as the delimiter.
* @param events - Optionally pass an object using this pattern to add events. **{ eventType: callback }**. The eventType consists of standard javascript events.
* @returns The new created inferred from the ```element``` param.
#### Code Sample:
```javascript
// Example 1 - <div id="unique-id" class="text-class"> Some call to action text! </div>
let newElement = DOM.create("div", { id: "unique-id", class: "text-class", text: "Some call to action text!"});

// Example 2 - When clicked it prints out "Clicked!" to the console.
// <button id="unique-id-2" class="button-class">
//  <div id="unique-id" class="text-class"> Some call to action text! </div>
// </button>
DOM.create("button", { id: "unique-id-2", class: "button-class", text: newElement}, { click: () => console.log('Clicked!') });
```

### **select**
Shorthand for the query selector
* @param query - A query selector string, Example: ```".class"```
* @param element - Defaults to the document object
* @return The first or only element
#### Code Sample:
```javascript
// Example 1 - Gets #SomeId on document
let newElement = DOM.select("#someId");

// Example 2 - Gets first .someClass inside containerElement
let newElement = DOM.select(".someClass", containerElement);
```

### **selectAll**
Shorthand for the query selector all with the added bonus of returning an array.
* @param query - A query selector string, Example: ```".class"```
* @param element - Defaults to the document object
* @return An array of elements
#### Code Sample:
```javascript
// Example 1 - Gets an array of all div elements in document
let newElements = DOM.selectAll("div");

// Example 2 - Gets an array of all .someClass inside containerElement
let newElements = DOM.selectAll(".someClass", containerElement);
```

### **detach**
Detach and return an Element from the DOM without destroying it.
* @param reference A query selector string or elem reference (Element, ect...)
* @return The detached element
#### Code Sample:
```javascript
// Example 1 - Detaches the first class encountered using the select function (querySelector syntax)
DOM.detach(".someClass");

// Example 2 - Detach using a reference
DOM.detach(elementReference);
```

### **bindAttribute**
Two-way data binding between an object's property and an Element's attribute.
* @param object - The parent object where the property will be added.
* @param objectProperty - Create a property that binds with an attribute.
* @param element - The element or query selector of the element.
* @param elementAttribute - The attribute to bind to the object's property.
#### Code Sample:
```javascript
// Example - Binds Object Property "name" (dataObject.name) to an element's attribute value. 
let dataObject = {};
DOM.bindAttribute(dataObject, "name", "#unique-id", 'value');
```

### **getRoute**
Get a route based on current path. This is great for making a SPA with deep-linking. 
* @param isArray - This will return the path as an array ```['some', 'path', 'defined']``` otherwise it will default to a string ```'/some/path/defined'```.
* @return - A string or array representing the current document.location.pathName
#### Code Sample:
```javascript

// Example 1 - Get path `/some/path/defined`
let currentRoute = DOM.getRoute();

// Example 2 - Get path as array ['some', 'path', 'defined']
let currentRoute = DOM.getRoute(true);
```

### **getRouteData**
Get the routes query string as a string or an object
* @param isObject - (Optional) Defaults to true and will return an object by default.
* @return - A string or object representing the current document.location.search
#### Code Sample:
```javascript
 
// Example 1 - Get query string as object ```{ test : 1 }```
let currentRoute = DOM.getRouteData();

// Example 2 - Get query string as string ```"?test=1"```
let currentRoute = DOM.getRouteData(false);
```

### **setRoute**
Set the browser url and update browser history without triggering a full page refresh. 
* @param route - The full url, path, or add query string.
#### Code Sample:
```javascript
 
// Example 1 - Set url localhost:4200/some/path/defined
DOM.setRoute('/some/path/defined');

// Example 2 - Gets current route as array ['some', 'path', 'defined']
//             Sets new route localhost:4200/some/path/new
let currentRoute = DOM.getRoute(true);
 DOM.setRoute(`/${currentRoute[0]}/${currentRoute[1]}/new`);
```