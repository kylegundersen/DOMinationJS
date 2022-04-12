import { DOM } from '../src/index';

beforeEach(() => {
    return document.body.innerHTML = "";
});

test("Add event delegate to the page.", () => {
    var eventToggle = 0;
    DOM.addEventDelegate('click', "#unique-id", () => { eventToggle += 1 });
    let domElement : Element = DOM.create("button", { id: "unique-id", class: "button" } );
    document.body.append(domElement);
    let getElementByID = document.getElementById('unique-id');
    getElementByID.click();
    expect(eventToggle).toBe(1);
});

test("Created element with a string.", () => {
    let domElement : Element = DOM.create("div", { id: "unique-id", class: "text-class", text: "Test Content", dataset: { test : 'test1' } });
    document.body.append(domElement);
    let getElementByID = document.getElementById('unique-id');
    expect(getElementByID.tagName).toBe("DIV");
    expect(getElementByID.classList[0]).toBe("text-class");
    expect(getElementByID.id).toBe("unique-id");
    expect(getElementByID.dataset.test).toBe("test1");
    expect(getElementByID.innerHTML).toBe("Test Content");
});

test("Created element with a node.", () => {
    let domInnerElement : Element = DOM.create("p");
    domInnerElement.append(document.createTextNode("Test Content"));
    let domElement : Element = DOM.create("div", { id: "unique-id", class: "text-class", text: domInnerElement });
    document.body.append(domElement);
    let getElementByID = document.getElementById('unique-id');
    expect(getElementByID.children[0].innerHTML).toBe("Test Content");
}); 

test("Create an input element.", () => {
    let domElement = DOM.create("input", { id: "unique-id", class: "text-class", value: "test" });
    expect(domElement.value).toBe("test");
}); 

test("Created element events.", () => {
    var eventToggle = 0;
    let domElement : Element = DOM.create("div", { id: "unique-id", text: "test button" }, {click: () => { eventToggle += 1 }});
    document.body.append(domElement);
    let getElementByID = document.getElementById('unique-id');
    getElementByID.click();
    expect(eventToggle).toBe(1);
});

test("Detaching an element with reference and string parameter.", () => {
    let domElement : Element = DOM.create("div", { id: "unique-id", text: "test content" });
    document.body.append(domElement);
    DOM.detach(domElement);
    expect(document.getElementById('unique-id')).toBe(null);
    expect(domElement.id).toBe("unique-id");
    document.body.append(domElement);
    let domElement2 = DOM.detach("#unique-id");
    expect(document.getElementById('unique-id')).toBe(null);
    expect(domElement2.id).toBe("unique-id");
});

test("Select a single element.", () => {
    let containerElement : Element = DOM.create("div", { id: "unique-id", text: "test content" });
    document.body.append(containerElement);
    let getElements = DOM.select("#unique-id");
    expect(getElements.innerHTML).toBe("test content");
});

test("Select All elements.", () => {
    let containerElement : Element = DOM.create("div");
    containerElement.append( 
        DOM.create("div", {class: "text-class"}),
        DOM.create("div", {class: "text-class"}),
        DOM.create("div", {class: "text-class"})
        );
    document.body.append(containerElement);
    let getElements = DOM.selectAll(".text-class");
    expect(getElements.length).toBe(3);
    expect(getElements[0].classList[0]).toBe("text-class");
}); 

test("Two-way data binding with an HTML attribute using reference.", () => {
    let element : HTMLInputElement = DOM.create("input");
    let dataObject : any = {};
    DOM.bindAttribute(dataObject, "name", element, 'value');
    element.setAttribute("value", "test");
    expect(dataObject.name).toBe("test");
    dataObject.name = "test other way";
    expect(element.value).toBe("test other way");
});
    
test("Two-way data binding with an HTML attribute using selector.", () => {
    let element2 : HTMLInputElement = DOM.create("input", { id: "unique-id" });
    let dataObject : any = {};
    document.body.append(element2);
    DOM.bindAttribute(dataObject, "dataCustom", "#unique-id", 'data-custom');
    element2.setAttribute("data-custom", "test");
    expect(dataObject.dataCustom).toBe("test");
    dataObject.dataCustom = "test other way";
    expect(element2.getAttribute('data-custom')).toBe("test other way");
});