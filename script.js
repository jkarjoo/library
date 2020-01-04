const openModal = document.getElementById("add-book");
const cancelBtn = document.getElementById("cancel");
const modal = document.querySelector(".modal-container");
let bookContainer = document.querySelector(".library-container");
let isEdited = false;

openModal.addEventListener("click", toggleModal);
cancelBtn.addEventListener("click", toggleModal);

function toggleModal() {
    resetModalFields();
    modal.classList.toggle("active");
    isEdited = false;
}

function resetModalFields() {
    let modal = document.querySelector("form");
    modal.reset();
}

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

let startingBook = new Book("Harry Potter and the Chamber of Secrets", "J.K. Rowling", "1998", "This book follows Harry Potter's second year at Hogwarts as he opens the Chamber of Secrets to unleash a monster that petrifies the school's residents.", "https://www.familyeducation.com/sites/default/files/fe_slideshow/2007_07/HPusa2_TV.gif");
addBookToLibrary(startingBook);

function render() {
    bookContainer.innerHTML = "";
    for (book of myLibrary) {
        bookContainer.innerHTML += template(book);
    }

    let readBtn = document.querySelectorAll(".read");
    readBtn.forEach(button => {
    button.addEventListener("click", function() {
        toggleReadStatus(button.dataset.bookid)
    });
})
    let editBtn = document.querySelectorAll(".edit");
    editBtn.forEach(button => {
        button.addEventListener("click", function() {
            toggleModal();
            isEdited = true;
            let bookIndex = button.dataset.editid;
            populateModal(bookIndex);
            editBook(bookIndex);
        })
    })
}

function template(book) {
    if (!book.image) {
        book.image = "https://svgsilh.com/svg/152671.svg";
    }
    if (!book.image.includes("https://")) {
        book.image = `https://${book.image}`;
    }
    return `<div class="book-item" id="${book.id}"><div class="book-cover"><img src="${book.image}"></div><div class="book-details"><div class="book-title">${book.title}</div><span class="year">${book.year}</span><div class="author">${book.author}</div><div class="description">${book.description}</div></div><div class="buttons"><button id="read-${book.id}" data-bookid=${book.id} class="read">Unread</button><button data-editid="${book.id}" class="edit">Edit</button><button class="delete">Delete</button></div></div>` 
}

function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    let button = document.getElementById(`read-${index}`)
    button.classList.toggle("true");
    button.classList.contains("true") ? button.textContent = "Read ✓" : button.textContent = "Unread";
}


function populateModal(index) {
    let title = document.querySelector("input[name=title]");
    let author = document.querySelector("input[name=author]");
    let year = document.querySelector("input[name=year]");
    let description = document.querySelector("input[name=description]");
    let img = document.querySelector("input[name=image]");
    title.value = myLibrary[index].title;
    author.value = myLibrary[index].author;
    year.value = myLibrary[index].year;
    description.value = myLibrary[index].description;
    img.value = myLibrary[index].image;
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

function editBook(index) {
    if (isEdited) {
       myLibrary.splice(index, 1);
        --id; 
    }
}

