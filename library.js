let myLibrary = [
    {title:"I, Robot", author:"Isaac Asimov", pages:304, read:false},
    {title:"Fight Club", author:"Chuck Palahniuk", pages:208, read:true},
];

function addBook(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//function addBookToLibrary() {
    
//    myLibrary.push()
//}
let delBtns = [];
let checkBoxes = [];
function tableLoad(myLibrary) {
  const tableBody = document.getElementById('books');
  let tableData = '';
  let i=0;
  for (let book of myLibrary) {
    let checkState=''
    if (book.read==true) {
      checkState = `<input type="checkbox" class="cbx" data-cbx=${i} id='read' name='read' checked>`
    }
    else if (book.read==false) {
      checkState = `<input type="checkbox" class="cbx" data-cbx=${i} id='read' name='read'>`
    }

    tableData += `<tr><td>${book.title}</td><td>${book.author}</td><td>${book.pages}</td><td>${checkState}</td><td><button class="delBtn" data-del=${i}>❌</button></td></tr>`;
    i++;
  }
  tableBody.innerHTML = tableData;
  //delete buttons
  delBtns = document.querySelectorAll('.delBtn');
  delBtns.forEach((button) => {
    button.addEventListener('click', () => {
      let delIndex = button.getAttribute('data-del');
      myLibrary.splice(delIndex,1);
      tableLoad(myLibrary);
    })
       
  });
  checkBoxes = document.querySelectorAll('.cbx');
  checkBoxes.forEach((button) => {
    button.addEventListener('click', () => {
      let checkIndex = button.getAttribute('data-cbx');
      if (myLibrary[checkIndex].read == true) {
        myLibrary[checkIndex].read = false;
      }
      else if (myLibrary[checkIndex].read == false) {
        myLibrary[checkIndex].read = true;
      }
	  
      tableLoad(myLibrary);
    })
  });
}

window.onload = () => {
  tableLoad(myLibrary);
}

let form = document.getElementById('entryForm');
  form.onsubmit = function(form) {
    console.table(form);
    let newTitle = document.getElementById('title').value;
    let newAuthor = document.getElementById('title').value;
    let newPages = document.getElementById('pages').value;
    let newRead = document.getElementById('read').checked;
    console.log(document.getElementById('read'))
    console.log(newTitle, newAuthor, newPages, newRead);
    bookObject = new addBook(newTitle, newAuthor, newPages, newRead)
    myLibrary.push(bookObject);
    tableLoad(myLibrary);
    closeForm();

    form.preventDefault()
  }


const showForm = document.getElementById('showForm');
showForm.onclick = function() {
  document.getElementById('popupForm').style.display = "block"
}
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}


//function addBook(form) {
 // console.table(form);
//  grocery_list[form.item.value] = {category: form.category.value, price: form.price.value};
//  return false;
//}

//delete


  