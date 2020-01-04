const addBookBtn = document.getElementById("add-book");
const cancelBtn = document.getElementById("cancel");
const modal = document.querySelector(".modal-container");

addBookBtn.addEventListener("click", toggleModal);
cancelBtn.addEventListener("click", toggleModal);

function toggleModal() {
    resetModalFields();
    modal.classList.toggle("active");
}

function resetModalFields() {
    let modal = document.querySelector("form");
    modal.reset();
}

function updateRead(index) {
    myLibrary[index].read = !myLibrary[index].read;
    let button = document.querySelector("value=0");
    console.log(button);
    /*button.classList.toggle("true");
    button.classList.contains("true") ? button.textContent = "Read ✓" : button.textContent = "Unread";*/
}

let bookContainer = document.querySelector(".library-container");

let myLibrary = [];
let id = 0;

function Book(title, author, year, description, image) {
    this.id = id++,
    this.title = title, 
    this.author = author, 
    this.year = year,
    this.description = description,
    this.image = image,
    this.read = false
};


function addBookToLibrary(obj) {
    myLibrary.push(obj);
    render();
}

function render() {
    bookContainer.innerHTML = "";
    for (book of myLibrary) {
        bookContainer.innerHTML += template(book);
    }
}

let startingBook = new Book("Harry Potter and the Chamber of Secrets", "J.K. Rowling", "1998", "This book follows Harry Potter's second year at Hogwarts as he opens the Chamber of Secrets to unleash a monster that petrifies the school's residents.", "https://www.familyeducation.com/sites/default/files/fe_slideshow/2007_07/HPusa2_TV.gif");
addBookToLibrary(startingBook);

function template(book) {
    if (!book.image) {
        book.image = "https://svgsilh.com/svg/152671.svg";
    }
    if (!book.image.includes("https://")) {
        book.image = `https://${book.image}`;
    }
    return `<div class="book-item" id="${book.id}"><div class="book-cover"><img src="${book.image}"></div><div class="book-details"><div class="book-title">${book.title}</div><span class="year">${book.year}</span><div class="author">${book.author}</div><div class="description">${book.description}</div></div><div class="buttons"><button value=${book.id} class="read">Unread</button><button class="edit">Edit</button><button class="delete">Delete</button></div></div>` 
}

const submitNewBook = document.getElementById("submit");
submitNewBook.addEventListener("click", function() {
    let title = document.querySelector("input[name=title]").value;
    let author = document.querySelector("input[name=author]").value;
    let year = document.querySelector("input[name=year]").value;
    let description = document.querySelector("input[name=description]").value;
    let img = document.querySelector("input[name=image]").value;
    let upcomingBook = new Book(title, author, year, description, img);
    addBookToLibrary(upcomingBook);
    toggleModal();
})

let readBtn = document.querySelectorAll(".read");
readBtn.forEach(button => {
    button.addEventListener("click", function() {
        console.log(button.value);
        updateRead(button.value)
    });
})