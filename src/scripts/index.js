// import ''
class View {
    constructor() {
        this.app = document.querySelector('.app');
        this.title = this.createElement('h1', 'title');
        this.title.textContent = 'GitHub Search Users';

        this.searchLine = this.createElement('div', 'searchLine');
        this.searchInput = this.createElement('input', 'searchInput');
        this.searchCounter = this.createElement('span', 'counter');
        this.searchLine.append(this.searchInput);
        this.searchLine.append(this.searchCounter);

        this.usersWrapper = this.createElement('div', 'usersWrapper');
        this.usersList = this.createElement('ul', 'usersList');
        this.usersWrapper.append(this.usersList);

        this.main = this.createElement('div', 'main');
        this.main.append(this.usersWrapper);

        this.app.append(this.title);
        this.app.append(this.searchLine);
        this.app.append(this.main);

    }

    createElement(elementTag, elementClass) {
        const element = document.createElement(elementTag);
        if (elementClass) {
            element.classList.add(elementClass);
            return element;
        }
    }

    createUser(userData) {
        const userElement = this.createElement('li', 'userPrev');
        userElement.innerHTML = `<span class = "userPrevName">${userData.login}</span>`;
        this.usersList.append(userElement);
    }
}

class Search {
    constructor(view) {
        this.view = view;

        this.view.searchInput.addEventListener('keyup', this.searchUsers.bind(this));

    }

    async searchUsers() {
        return await fetch(`http://api.github.com/search/users?q=${this.view.searchInput.value}`)
        .then((res) => {
            if (res.ok) {
                res.json().then(res => {
                    res.items.forEach(user => this.view.createUser(user));
                });
            } else {
                // console.log('Error fetching users');
            }
        })
        .catch(error => {
            // console.log('Fetch error: ', error);
        });
    }
}

new Search(new View);


