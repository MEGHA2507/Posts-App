// const greeting = 'Hello World';
// console.log(greeting);

// const person = require('./myModule1');
// console.log(person.name, person.age);

// // import {persons, sayHello} from './mymodule2';
// import * as mod from './mymodule2';

// console.log(mod.persons.name, mod.persons.age);

// console.log(mod.sayHello());

// import { greeting } from './mymodule2';
// console.log(greeting);

import { http } from './http';
import { ui } from './ui';

document.addEventListener('DOMContentLoaded', getPosts);

function getPosts(){
    http.get('http://localhost:3000/posts')
    .then(data => {
        ui.showPosts(data);
    })
    .catch(err => {
        console.log(err);
    })
}

document.querySelector('.post-submit').addEventListener('click', addPost);

function addPost(){
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

    const data = {
        title,
        body
    }

    if(title === '' && body === ''){
        ui.showAlert('Please fill all the fields.', 'alert alert-danger');    
    }else{
        if(id === ''){
            http.post('http://localhost:3000/posts', data)
            .then(data => {
                ui.showAlert('Post added', 'alert alert-success');
                ui.clearFields();
                getPosts(data);
            })
            .catch(err => {
                console.log(err);
            })
        }else{
            http.put(`http://localhost:3000/posts/${id}`, data)
            .then(data => {
                ui.showAlert('Post updated', 'alert alert-success');
                ui.changeForm('add');
                getPosts(data);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}

document.querySelector('#posts').addEventListener('click', removePost);

function removePost(e){
    if(e.target.parentElement.classList.contains('delete')){
        const id = e.target.parentElement.dataset.id;
        if(confirm('Are you sure ?')){
            http.delete(`http://localhost:3000/posts/${id}`)
            .then((data) => {
                ui.showAlert('Post Deleted', 'alert alert-danger');
                getPosts();
            })
            .catch((err) => console.log(err));
        }
    }
    e.preventDefault();
}

document.querySelector('#posts').addEventListener('click', updatePost);

function updatePost(e){
    if(e.target.parentElement.classList.contains('edit')){
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;
        

        const data = {
            id,
            title,
            body
        }

        ui.fillForm(data);
        e.preventDefault();
    }

}

document.querySelector('.card-form').addEventListener('click', cancelEdit);

function cancelEdit(e){
    if(e.target.classList.contains('post-cancel')){
        ui.changeForm('add');
    }
}
