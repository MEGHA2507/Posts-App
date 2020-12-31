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
            console.log(post);
            output += `
                <div class="card mb-4">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <div class="card-body">${post.body}</div>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil"></i>
                        </a>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                        <i class="fa fa-remove"></i>
                    </a>
                    </div>   
                </div>
            `;
        });
        
        this.posts.innerHTML = output;

    }

    clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#body').value = '';
    }

    showAlert(message, className){
        this.clearAlert();

        const div = document.createElement('div');
        div.className = className;
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

}
export const ui = new UI();