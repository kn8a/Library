let myLibrary = [ //array of book objects
    {title:"I, Robot", author:"Isaac Asimov", pages:304, read:false},
    {title:"Fight Club", author:"Chuck Palahniuk", pages:208, read:true},
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
  let i=0; //variable for loop iterations
  for (let book of myLibrary) { //loop 
    let checkState='' //variable for injecting checke/unchecked checkbox into tableData
    if (book.read==true) { //checked
      checkState = `<input type="checkbox" class="cbx" data-cbx=${i} id='read' name='read' checked>`
    }
    else if (book.read==false) { //unchecked
      checkState = `<input type="checkbox" class="cbx" data-cbx=${i} id='read' name='read'>`
    }
    tableData += `<tr><td>${book.title}</td><td>${book.author}</td><td>${book.pages}</td><td>${checkState}</td><td><button class="delBtn" data-del=${i}>❌</button></td></tr>`; //append HTML into tableData
    i++;
  } //end loop
  tableBody.innerHTML = tableData; //insert HTML into table
  //delete buttons
  delBtns = document.querySelectorAll('.delBtn'); //created delete buttons into array
  delBtns.forEach((button) => { //for each del button
    button.addEventListener('click', () => { //on click
      let delIndex = button.getAttribute('data-del'); //get unique number corresponding to ebject in array
      myLibrary.splice(delIndex,1); //remove item from array
      tableLoad(myLibrary); //reload table
    })
  });
  checkBoxes = document.querySelectorAll('.cbx'); //created checkboxes into array
  checkBoxes.forEach((button) => { //for each checkbox
    button.addEventListener('click', () => { //on click
      let checkIndex = button.getAttribute('data-cbx'); //get unique number corresponding to object in array
      if (myLibrary[checkIndex].read == true) { //if current state true
        myLibrary[checkIndex].read = false; //change to false
      }
      else if (myLibrary[checkIndex].read == false) { //if currently false
        myLibrary[checkIndex].read = true; //change to true
      }	  
      tableLoad(myLibrary); //reload table
    })
  });
} //END TABLE

window.onload = () => {
  tableLoad(myLibrary); //load myLibrary once page loaded
}

let form = document.getElementById('entryForm'); //vartiable for entry form
  form.onsubmit = function(form) { //on submit
    let newTitle = document.getElementById('title').value; 
    let newAuthor = document.getElementById('author').value;
    let newPages = document.getElementById('pages').value;
    let newRead = document.getElementById('read').checked;
    bookObject = new addBook(newTitle, newAuthor, newPages, newRead) //call book constructor into variable
    myLibrary.push(bookObject); //add new object to array
    tableLoad(myLibrary); //reload table
    closeForm(); //close entry form
    form.preventDefault() //prevents from defaulting to original state
    form.reset(); //reset form firlds
  }

const showForm = document.getElementById('showForm'); //new book button to variable
showForm.onclick = function() { 
  document.getElementById('popupForm').style.display = "block" //open form 
}
function closeForm() {//close form
  document.getElementById("popupForm").style.display = "none";
  document.getElementById("entryForm").reset();  //reset form fields
}