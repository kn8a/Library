let myLibrary = [ //array of book objects
    {title:"I, Robot", author:"Isaac Asimov", pages:304, read:false},
    {title:"Fight Club", author:"Chuck Palahniuk", pages:204, read:true},
];

function addBook(title, author, pages, read) { //book object constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//TABLE
let delBtns = []; //array for table Delete buttons
let checkBoxes = []; //array for table checkboxes
function tableLoad(myLibrary) { //load the table
  const tableBody = document.getElementById('books'); //HTML table to variable
  let tableData = ''; //empty variable to be filled with HTML to inject
  let i=0;
  for (let book of myLibrary) { 
    let checkState='' //variable for injecting checke/unchecked checkbox into tableData
    if (book.read==true) { //checked
      checkState = `<input type="checkbox" class="cbx" data-cbx=${i} id='read' name='read' checked>`
    }
    else if (book.read==false) { //unchecked
      checkState = `<input type="checkbox" class="cbx" data-cbx=${i} id='read' name='read'>`
    }
    tableData += `<tr><td>${book.title}</td><td>${book.author}</td><td class="pagesCol">${book.pages}</td><td class="readCol">${checkState}</td><td class="delCol"><button class="delBtn" data-del=${i}>X</button></td></tr>`; //append HTML into tableData
    i++;
  } //end loop
  tableBody.innerHTML = tableData; //insert HTML into table
  //DELETE BUTTONS
  delBtns = document.querySelectorAll('.delBtn'); //created delete buttons into array
  delBtns.forEach((button) => { 
    button.addEventListener('click', () => { 
      let delIndex = button.getAttribute('data-del'); //get unique number corresponding to ebject in array
      myLibrary.splice(delIndex,1); //remove item from array
      tableLoad(myLibrary); 
    })
  });
  //CHECKBOXES
  checkBoxes = document.querySelectorAll('.cbx'); //created checkboxes into array
  checkBoxes.forEach((button) => { 
    button.addEventListener('click', () => { 
      let checkIndex = button.getAttribute('data-cbx'); //get unique number corresponding to object in array
      if (myLibrary[checkIndex].read == true) { 
        myLibrary[checkIndex].read = false; 
      }
      else if (myLibrary[checkIndex].read == false) { 
        myLibrary[checkIndex].read = true; 
      }	  
      tableLoad(myLibrary); 
    })
  });
} //END TABLE

window.onload = () => {
  tableLoad(myLibrary); //load myLibrary once page loaded
}

let form = document.getElementById('entryForm');
  form.onsubmit = function(form) { 
    let newTitle = document.getElementById('title').value; 
    let newAuthor = document.getElementById('author').value;
    let newPages = document.getElementById('pages').value;
    let newRead = document.getElementById('read').checked;
    bookObject = new addBook(newTitle, newAuthor, newPages, newRead)
    myLibrary.push(bookObject); 
    tableLoad(myLibrary); 
    closeForm(); 
    form.preventDefault() //prevents from defaulting to original state
    form.reset(); 
  }

const showForm = document.getElementById('showForm'); //new book button to variable
showForm.onclick = function() { 
  document.getElementById('popupForm').style.display = "block"; //show form
  showForm.style.backgroundColor="transparent";//hide + button
  showForm.style.color="transparent";
  showForm.style.cursor="default" 
}
function closeForm() {
  document.getElementById("popupForm").style.display = "none"; //close form
  document.getElementById("entryForm").reset();  //reset form fields
  showForm.style.backgroundColor="#EB5E28"; //restor + button
  showForm.style.color="#FFFCF2";
  showForm.style.cursor="pointer";
}