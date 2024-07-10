
const userPerPage = 5;

export class Search {

    constructor(view) {
        this.view = view;
        this.view.searchInput.addEventListener('keyup', this.debounce(this.loadRepositories.bind(this), 400));

    }

    async loadRepositories() {
        const searchValue = this.view.searchInput.value.trim();
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
