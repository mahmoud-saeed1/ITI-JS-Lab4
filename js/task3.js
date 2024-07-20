/*~~~~~$ Selectors $~~~~~*/
const postsContainer = document.getElementById('posts-container');

/*~~~~~$ Renders $~~~~~*/
function displayPostWithComments(post, comments) {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <div class="comments">
            <h3>Comments:</h3>
            ${comments.map(comment => `
                <div class="comment">
                    <p><strong>${comment.name}:</strong> ${comment.body}</p>
                </div>
            `).join('')}
        </div>
    `;
    postsContainer.appendChild(postElement);
}

/*~~~~~$ Utility $~~~~~*/
function fetchPostComments(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json());
}

function fetchPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                fetchPostComments(post.id)
                    .then(comments => displayPostWithComments(post, comments))
                    .catch(error => console.error('Error fetching comments:', error));
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
}

fetchPosts();
