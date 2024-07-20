/*~~~~~$ Selectors $~~~~~*/
const usersContainer = document.getElementById('users-container');

/*~~~~~$ Global Variables $~~~~~*/

/*~~~~~$ Handlers $~~~~~*/
function displayUserWithPosts(user, posts) {
    const userElement = document.createElement('div');
    userElement.className = 'user';
    userElement.innerHTML = `
        <h2>${user.name}</h2>
        <p>Email: ${user.email}</p>
        <div class="posts">
            <h3>Posts:</h3>
            ${posts.map(post => `
                <div class="post">
                    <p><strong>${post.title}</strong></p>
                    <p>${post.body}</p>
                </div>
            `).join('')}
        </div>
    `;
    usersContainer.appendChild(userElement);
}

/*~~~~~$ Utility $~~~~~*/
function fetchUserPosts(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json());
}

function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                fetchUserPosts(user.id)
                    .then(posts => displayUserWithPosts(user, posts))
                    .catch(error => console.error('Error fetching posts:', error));
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

fetchUsers();