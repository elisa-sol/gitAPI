import '../scss/style.scss'

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


        this.dropdown = this.createElement('div', 'dropdown');
        this.searchLine.append(this.dropdown);


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
        }
        return element;
    }

    createRepositoryItem(repoData) {
        const repoElement = this.createElement('p', 'repo-item');
        repoElement.innerHTML = `Name: ${repoData.full_name.split('/')[0]}<br>
        Owner: ${repoData.name}<br>
        Stars: ${repoData.stargazers_count}`;
        const deleteButton = this.createElement('button', 'deleteButton');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => {
            repoElement.remove();
        });
        repoElement.append(deleteButton);
        this.usersList.append(repoElement);
        this.searchInput.value = '';
    }


    createDropdownItem(repoData) {
        const repoElement = this.createElement('div', 'dropdown-item');
        repoElement.addEventListener('click', () => {
            this.searchInput.value = repoData.full_name.split('/')[1];
            this.createRepositoryItem(repoData);
            this.clearDropdown();
        });

        const repoName = repoData.full_name.split('/')[1];
        repoElement.textContent = repoName;
        this.dropdown.append(repoElement);
    }

    // createDropdownItem(repoData) {
    //     const repoElement = this.createElement('div', 'dropdown-item');
    //     repoElement.addEventListener('click', this.showUserData());
    //     const repoName = repoData.full_name.split('/')[1];
    //     repoElement.textContent = repoName;
    //     repoElement.addEventListener('click', () => {
    //         this.searchInput.value = repoName
    //         this.clearDropdown();
    //     });
    //     this.dropdown.append(repoElement);
    // }

    showUserData() {

    }

    clearDropdown() {
        this.dropdown.innerHTML = '';
    }

}




const userPerPage = 5;

class Search {

    constructor(view) {
        this.view = view;
        // this.currentPage = 1;
        this.view.searchInput.addEventListener('keyup', this.debounce(this.loadRepositories.bind(this), 400));

    }

    async loadRepositories() {
        const searchValue = this.view.searchInput.value;
        if (searchValue) {
            this.view.clearDropdown();
            try {
                const res = await fetch(`https://api.github.com/search/repositories?q=${searchValue}&per_page=${userPerPage}`);
                if (res.ok) {
                    const data = await res.json();
                    data.items.forEach(repo => this.view.createDropdownItem(repo));
                }
            } catch (error) {
                console.error('Error fetching repositories:', error);
            }
        } else {
            this.view.clearDropdown();
        }
    }


   debounce = (fn, debounceTime) => {
      let timeout;
      return function () {
         const fnCall = () => {
            fn.apply(this, arguments)
         }
            clearTimeout(timeout);
            timeout = setTimeout(fnCall, debounceTime)
      }
   };

}

new Search(new View);



// async searchUsers() {
//     return await fetch(`http://api.github.com/search/users?q=${this.view.searchInput.value}&per_page=${userPerPage}&page=`)
//         .then((res) => {
//             if (res.ok) {
//                 res.json().then(res => {
//                     res.items.forEach(user => this.view.createUser(user));
//                 });
//             } else {
//                 // console.log('Error fetching users');
//             }
//         })
//         .catch(error => {
//             // console.log('Fetch error: ', error);
//         });
// }

// async loadUsers() {
//      const searchValue = this.view.searchInput.value;
//      if (searchValue) {
//          this.currentPage = 1;
//          this.clearUsers();
//          try {
//              const res = await fetch(`https://api.github.com/search/users?q=${this.view.searchInput.value}&per_page=${userPerPage}&page=${this.currentPage}`)
//              if (res.ok) {
//                  const data = await res.json();
//                  this.currentPage += 1;
//                  data.items.forEach(user => this.view.createUser(user));
//
//              } else {
//
//              }
//
//          } catch(error) {
//
//          }
//
//      } else {
//          this.clearUsers();
//      }
// }

// clearUsers() {
//      this.view.usersList.innerHTML = '';
// }



// this.view.searchInput.addEventListener('keyup', this.debounce(this.loadUsers.bind(this), 500));
// this.view.loadMore.addEventListener('click', this.loadUsers.bind(this));
// this.view.searchInput.addEventListener('keyup', this.loadUsers.bind(this));



// createUser(userData) {
//     const userElement = this.createElement('li', 'userPrev');
//     userElement.innerHTML = `<span class = "userPrevName">${userData.login}</span>`;
//     this.usersList.append(userElement);
// }


