const containerElement = document.getElementById("container");
const btnAdd = document.getElementsByClassName("btn-add")[0];


function getAppStorage() {
    return JSON.parse(localStorage.getItem("abdur_app") || "[]");
}

getAppStorage().forEach(element => {
    const textElement = createTextElement(element.id, element.name);
    containerElement.insertBefore(textElement, btnAdd);
});

function createTextElement(id, content) {
    const textElement = document.createElement('textarea');
    textElement.classList.add('sticky');
    textElement.value = content;
    textElement.placeholder = 'Enter Your Notes';


    textElement.addEventListener("change", () => {
        updatesticky(id, textElement.value);


    })
    textElement.addEventListener("dblclick", () => {
        const check = confirm("Are You Sure to Delete ?");
        if (check) {
            deleteNotes(id, textElement);
        }
    });
    return textElement;

}
//new sticky
function addsticky() {
    const notes = getAppStorage();
    const notesObjects = {
        id: Math.floor(Math.random() * 1000000),
        name: ""
    }
    const textElement = createTextElement(notesObjects.id, notesObjects.name);
    containerElement.insertBefore(textElement, btnAdd);
    notes.push(notesObjects);
    saveNote(notes);

}
btnAdd.addEventListener("click", () => addsticky());

function saveNote(notes) {
    localStorage.setItem("abdur_app", JSON.stringify(notes));
} //update sticky 
function updatesticky(id, name) {
    const notes = getAppStorage();
    const updateElement = notes.filter((note) =>
        note.id == id)[0];
    updateElement.name = name;
    saveNote(notes);

}

function deleteNotes(id, textElement) {
    const notes = getAppStorage().filter((note) => note.id != id);
    saveNote(notes);
    containerElement.removeChild(textElement);
}