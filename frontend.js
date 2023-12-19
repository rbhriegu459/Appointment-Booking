// const { deleteuser } = require("./database");

var globalobj;

function fetchData(){
    return fetch('/read')
                .then (res=> res.json())
                .then(data=>{
                    globalobj = data;
                })
                .catch(err=>{
                    console.log('Error fetching data:', err)
                })
}

fetchData().then(()=>{

    for(let i=0; i<globalobj.length; i++){

        const myList = document.getElementById("list");
        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.type = "button";
        deleteButton.className = "deletebutton";

        deleteButton.addEventListener('click', ()=>{
            deleteUser(globalobj[i].id);
        })

        editButton.textContent = "Edit";
        editButton.type = "button";
        editButton.className = "editbutton";

        const newLi = document.createElement("li");
        newLi.innerHTML = globalobj[i].username+" "+globalobj[i].email+" "+globalobj[i].number;

        myList.appendChild(newLi);
        myList.appendChild(deleteButton);
        myList.appendChild(editButton);

        //deleteButtonId = deleteButton.id;
        //editButtonId = editButton.id;

    }


    async function deleteUser(id){
        try{
            const res = await fetch(`/deluser/${id}`, {
                method: 'DELETE',
            })

            const data = await response.json();
            console.log(data); //log the response data from the server
            window.location.href = 'http://localhost:3000';

        } catch (err){
            console.log('Error:', err);
        }
    }

    //accessing input data value;

    const username = document.getElementById('name');
    const email = document.getElementById('email');
    const number = document.getElementById('number');

    const buttonid = document.getElementById('button');

    buttonid.addEventListener('click', save);

    function save(e){
        // showing username, email, number when click on save button

        const list = document.getElementById("list");
        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.type = "button";
        deleteButton.className = "deletebutton" // what is the benefit
         const newLi = document.createElement("li");
         newLi.innerHTML = username.value+" "+email.value+" "+number.value;

         myList.appendChild(list, deleteButton, editButton);

         //savind data to backend

         async function saveToDatabase (){
            const data = {
                name: username.value,
                email: email.value,
                number: number.value 
            }

            try { 
                const res = await fetch ('/create', {
                    method:'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                })

                const jdata = await response.json();
                console.log(data);       //log the response data from the server
                //redirecting to homepage
                window.location.href = 'http://localhost:3000';
            } catch(err){
                console.log('Error:', err)
            }

         } 

         saveToDatabase();
        }
    })