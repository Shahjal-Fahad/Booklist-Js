//Get the Ui
let form=document.querySelector('#book_form');
let booklist=document.querySelector("#book_list")


//Book Class

class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

//Ui Class
class Ui{
    
    static addToBookList(book){
        let list=document.querySelector('#book_list');
        let row=document.createElement('tr');
        row.innerHTML=`<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>`
        list.appendChild(row);
    }
    static clearField(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }
    static showAlert(message,className){
        let div=document.createElement('div');
        div.className=`alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container=document.querySelector('.container');
        let form=document.querySelector('#book_form');
        container.insertBefore(div,form);
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000);
    }
    static deleteFromBook(target){
        if(target.hasAttribute('href')){
            target.parentElement.parentElement.remove();
            Store.removeBooks(target.parentElement.previousElementSibling.textContent.trim());
            Ui.showAlert("Book Remove!",'success');
            
        }
    }
}

//LOcal Storage

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        let books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static displayBooks(){
        let books=Store.getBooks();
        books.forEach(book =>{
            Ui.addToBookList(book);
        });
    }
    static removeBooks(isbn){
        let books=Store.getBooks();
        books.forEach((book,index) =>{
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Add Event listener

form.addEventListener('submit',newBook);
booklist.addEventListener('click',removeBook);
document.addEventListener('DOMContentLoaded',Store.displayBooks());

//define Functions

function newBook(e){
    let title=document.querySelector('#title').value,
    author=document.querySelector('#author').value,
    isbn=document.querySelector('#isbn').value;
    // let ui= new Ui();

    if(title==='' || author==='' || isbn==='' ){
        Ui.showAlert("Plese fill up all the fields",'error');

    }
    else{

        let book=new Book(title,author,isbn);
        Ui.addToBookList(book);
        Ui.clearField();
        Store.addBook(book);
        Ui.showAlert("Added Successfully!",'success');

    }
    e.preventDefault();
}

function removeBook(e){
    Ui.deleteFromBook(e.target);
    e.preventDefault();
}