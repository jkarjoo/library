const openModal = document.getElementById("add-book");
const cancelBtn = document.getElementById("cancel");
const modal = document.querySelector(".modal-container");
const bookContainer = document.querySelector(".library-container");
const submitNewBook = document.getElementById("submit");
let currentIndex;
let edited = false;
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

let startingBook = new Book("Harry Potter and the Chamber of Secrets", "J.K. Rowling", "1998", "This book follows Harry Potter's second year at Hogwarts as he opens the Chamber of Secrets to unleash a monster that petrifies the school's residents.", "https://www.familyeducation.com/sites/default/files/fe_slideshow/2007_07/HPusa2_TV.gif");
addBookToLibrary(startingBook);

function addBookToLibrary(obj) {
    myLibrary.push(obj);
    render();
}

function render() {
    bookContainer.innerHTML = "";
    for (book of myLibrary) {
        bookContainer.innerHTML += template(book);
        if (book && book.read) {
            let button = document.getElementById(`read-${book.id}`)
            button.classList.toggle("true");
            button.classList.contains("true") ? button.textContent = "Read ✓" : button.textContent = "Unread";
        }
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
            editMode();
            toggleModal();
            currentIndex = button.dataset.editid;
            populateModal(currentIndex);
        })
    })

    let deleteBtn = document.querySelectorAll(".delete");
    deleteBtn.forEach(button => {
        button.addEventListener("click", function() {
            currentIndex = button.dataset.deleteid;
            delete myLibrary[currentIndex];
            render();
        })
    })
}

openModal.addEventListener("click", function() {
    addBookMode();
    toggleModal();
});

cancelBtn.addEventListener("click", toggleModal);

function toggleModal() {
    resetModalFields();
    modal.classList.toggle("active");
    
    // If modal is NOT active and not edited, remove newBookHandler
    if (!modal.classList.contains("active") && !edited) {
        submitNewBook.removeEventListener("click", newBookHandler);
        console.log("removed newBookHandler");
    }
    // If modal is NOT active and has been edited, remove editBookHandler
    else if (!modal.classList.contains("active") && edited) {
        submitNewBook.removeEventListener("click", editBook);
        edited = false;
        console.log("removed editBook");
    }
    // If modal is active and currently edited, add editBookHandler
    else if (edited){
        submitNewBook.addEventListener("click", editBook);
        console.log("added editBook");
    }
    // Else add newBookHandler
    else {
        submitNewBook.addEventListener("click", newBookHandler);
        console.log("added newBookHandler");
    }
}
// Inputs from modal //
let titleFromModal = document.querySelector("input[name=title]");
let authorFromModal = document.querySelector("input[name=author]");
let yearFromModal = document.querySelector("input[name=year]");
let descriptionFromModal = document.querySelector("input[name=description]");
let imgFromModal = document.querySelector("input[name=image]");

function getBookFromModal() {
    return {
        title: titleFromModal.value,
        author: authorFromModal.value,
        year: yearFromModal.value,
        description: descriptionFromModal.value,
        img: imgFromModal.value
    }
}

function newBookHandler() {
    const { title, author, year, description, img } = getBookFromModal();
    let upcomingBook = new Book(title, author, year, description, img);
    addBookToLibrary(upcomingBook);
    toggleModal();
}

function editBook() {
    const { title, author, year, description, img } = getBookFromModal();
    myLibrary[currentIndex].title = title;
    myLibrary[currentIndex].author = author;
    myLibrary[currentIndex].year = year;
    myLibrary[currentIndex].description = description;
    myLibrary[currentIndex].image = img;
    render();
    toggleModal();
}

function resetModalFields() {
    let modal = document.querySelector("form");
    modal.reset();
}

function editMode() {
    edited = true;
    submitNewBook.innerHTML = "Edit Book";
}

function addBookMode() {
    edited = false;
    submitNewBook.innerHTML = "Add Book";
}

function template(book) {
    // If no book (IE: Deleted)
    if (!book) {
        return "";
    }
    // If no book image set, then display stock picture
    if (!book.image) {
        book.image = "https://svgsilh.com/svg/152671.svg";
    }
    // If link does not include https://, then add it to grab image properly
    if (!book.image.includes("https://")) {
        book.image = `https://${book.image}`;
    }
    return `<div class="book-item" id="${book.id}"><div class="book-cover"><img src="${book.image}"></div><div class="book-details"><div class="book-title">${book.title}</div><span class="year">${book.year}</span><div class="author">${book.author}</div><div class="description">${book.description}</div></div><div class="buttons"><button id="read-${book.id}" data-bookid=${book.id} class="read">Unread</button><button data-editid="${book.id}" class="edit">Edit</button><button data-deleteid=${book.id} class="delete">Delete</button></div></div>` 
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


