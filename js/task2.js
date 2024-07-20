/*~~~~~$ Selectors $~~~~~*/
const usernameInput = document.getElementById('username');
const searchButton = document.getElementById('search');
const userInfo = document.getElementById('user-info');

/*~~~~~$ Renders $~~~~~*/
function displayUser(data) {
    userInfo.innerHTML = `
        <h2>${data.name}</h2>
        <p>Username: ${data.login}</p>
        <p>Followers: ${data.followers}</p>
        <p>Following: ${data.following}</p>
        <p>Public Repos: ${data.public_repos}</p>
    `;
}

/*~~~~~$ Utility $~~~~~*/
function fetchGitHubUser(username) {
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => displayUser(data))
        .catch(error => console.error('Error fetching GitHub user data:', error));
}

searchButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        fetchGitHubUser(username);
    }
});
