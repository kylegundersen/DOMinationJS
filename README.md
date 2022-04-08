

# DOMinateJS ![Build](https://img.shields.io/github/package-json/v/kylegundersen/DOMinateJS/main?label=Stable%20Version) ![coverage](https://img.shields.io/badge/coverage-100%25-green)

This library wasn't created to reimagine a javscript world without the need for complicated and messy frameworks. That being said.. JS frameworks are a paragon of bloat, bugs, performance, and integration issues. This library follows a simple methodology, apply the DRY principle to reduce the amount of code needed to interact with the DOM. This isn't meant to be a fully flushed out framework, just a helper library that helps you DOMinate Javascipt.

Here is an example of how DOMinateJS reduces the code in your application. Less is always more!

#### Code Sample:
```javascript
// Standard way to create an element in vanilla JS
let newElement = document.createElement('div');
newElement.classList.add('class-1');
newElement.classList.add('class-2');
newElement.id = 'guid';
newElement.textContent = 'button name';
newElement.addEventListener('click', () => console.log('clicked'));

// The DOMinateJS way
let newElement = DOM.create("div", { class: "class-1 class-2", id:'guid', text: 'button name' }, { click : () => console.log('clicked') });
```
&nbsp;

# Installation 

You can install via NPM or download from GitHub.
```
npm i @kylegundersen/dominatejs
```

&nbsp;

# Getting Started
Once installed. Then just import the package into your project. This was written in Typescript so that is the recommended way to use it, but it should work for most scenerios.


```javascript

import { DOM } from 'dominatejs';

```

&nbsp;

# DOM API

The DOM module is used for reducing the amount of boiler plate needed for working with the document object model. This is meant to be used along side existing DOM functions, it should not and is not mean't to replace everything.


### **addEventDelegate**
Adds a global event listener that can monitor changes and perform events.
* @param type - Event type, example: click, dblclick, mouseover, ect..
* @param selector - Same as query selector. Element class denoted with period, id denoted with #, or element name.
* @param callback - A callback function to perfom when the event is triggered.
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
* - ```text``` Can pass a string to textContent or append an Element/node.
* - ```class``` Can pass multiple classes which are delimited by spaces.
* @param events - Pass an object using this pattern. **{ [HTML DOM Event Type]: (callback Function) }**. The eventType consists of standard javascript events.
* @returns An element Inferred from the ```element``` param.
#### Code Sample:
```javascript
// Example 1
let newElement = DOM.create("div", ["text-class"], { id: "unique-id" }, "Some call to action text!");

// Example 2
let newEvent = () => { console.log("clicked!") };
DOM.create("button", ["button-class"], { id: "unique-id-2" }, newElement, {click: newEvent});
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
let newElement = DOM.selectAll("div");

// Example 2 - Gets an array of all .someClass inside containerElement
let newElement = DOM.selectAll(".someClass", containerElement);
```

### **detach**
Detach and return an Element from the DOM without destroying it.
* @param referemce A query selector string or elem reference (Element, ect...)
* @return The detached element
#### Code Sample:
```javascript
// Example 1 - Detaches the first class encountered using the select function (querySelector syntax)
DOM.detach(".someClass");

// Example 2 - Detach using a reference
DOM.detach(elementReference);
```