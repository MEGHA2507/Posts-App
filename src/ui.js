class UI{
    constructor(){
        this.titleInput = document.getElementById('title');
        this.bodyInput = document.getElementById('body');
        this.posts = document.querySelector('#posts');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }

    showPosts(posts){
        let output = '';

        posts.forEach((post) => {
            // console.log(post);
            output += `
                <div class="card mb-4">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <div class="card-body">${post.body}</div>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id="${post.id}">
                        <i class="fa fa-remove"></i>
                    </a>
                    </div>   
                </div>
            `;
        });
        
        this.posts.innerHTML = output;

    }

    showAlert(message, className){
        this.clearAlert();

        const div = document.createElement('div');
        div.className = `${className} p-3 mb-4`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.postsContainer');
        const post = document.querySelector('#posts');
        container.insertBefore(div, posts);

        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert(){
        const currentAlert = document.querySelector('.alert');

        if(currentAlert){
            currentAlert.remove();
        }
    }

    fillForm(data){
        document.getElementById('title').value = data.title;
        document.getElementById('body').value = data.body;
        document.querySelector('#id').value = data.id;

        this.changeForm('edit');
    }

    changeForm(type){
        if(type === 'edit'){
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.className = 'post-submit btn btn-warning btn-block';

            //Create cancel button
            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-danger btn-block';
            button.appendChild(document.createTextNode('Cancel Edit'));

            const cardForm = document.querySelector('.card-form');
            const formEnd = document.querySelector('.form-end');

            cardForm.insertBefore(button, formEnd);
        }else{
            this.postSubmit.textContent = 'Post It';
            this.postSubmit.className = 'post-submit btn btn-primary btn-block';

            if(document.querySelector('.post-cancel')){
                document.querySelector('.post-cancel').remove();
            }

            this.clearIdInput();
            this.clearFields();

        }
    }

    clearIdInput(){
        this.idInput.value = '';
    }

    clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#body').value = '';
    }
    
}
export const ui = new UI();