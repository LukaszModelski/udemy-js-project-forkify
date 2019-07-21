import { elements } from './base'

export const getInput = () => elements.searchInput.value; // cuz of one line arrow function there is no need to write return key word or curly braces

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearSearchedRecipes = () => {
    elements.searchResultList.innerHTML = '';
    elements.paginationButonsContainer.innerHTML = '';
}

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc < limit) {
                newTitle.push(cur);
                return acc + cur.length;
            }
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderPaginationButtons = (page, nrPerPage, nrOfRecipes) => {
    const nrOfPages = Math.ceil(nrOfRecipes / nrPerPage);
    page = parseInt(page);
    const prevButton = `
        <button class="btn-inline results__btn--prev" data-goto="${page - 1}">
            <span>Page ${page - 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-left"></use>
            </svg>
        </button>
    `;
    const nextButton = `
        <button class="btn-inline results__btn--next" data-goto="${page + 1}">
            <span>Page ${page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>
        </button>
    `;
    if(page === 1 && nrOfPages > 1) {
        elements.paginationButonsContainer.insertAdjacentHTML('beforeend', nextButton);
    } else if (page === nrOfPages) {
        elements.paginationButonsContainer.insertAdjacentHTML('beforeend', prevButton);
    } else {
        const buttons = prevButton + nextButton;
        elements.paginationButonsContainer.insertAdjacentHTML('beforeend', buttons);
    }
}

const renderSingleRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
}

export const renderRecipes = (recipes, nrPerPage, page) => {
    recipes.slice(0 + (page-1) * nrPerPage, nrPerPage * page).forEach(renderSingleRecipe); // renderSingleRecipe is a callback function in this case. So every single element from forEach loop will be automaticaly passed to the function.
    renderPaginationButtons(page, nrPerPage, recipes.length);
}

export const rederSpinner = container => {
    const spinner = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
        `
    ;
    container.insertAdjacentHTML('afterbegin', spinner);
}

export const clearSpinner = container => {
    const spinner = document.querySelector('.' + container.className + ' .loader');
    container.removeChild(spinner);
}