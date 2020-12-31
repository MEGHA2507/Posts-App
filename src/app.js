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
        // console.log(data);
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

    const data = {
        title,
        body
    }

    // console.log(data);

    http.post('http://localhost:3000/posts', data)
    .then(data => {
        ui.showAlert('Error', 'remove');
        ui.clearFields();
        getPosts(data);
    })
    .catch(err => {
        console.log(err);
    })
}
