import { elements } from './base'

export const getInput = () => elements.searchInput.value; // cuz of one line arrow function there is no need to write return key word or curly braces

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearSearchedRecipes = () => {
    elements.searchResultList.innerHTML = '';
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

const renderSingleRecipe = recipe => {
    // console.log('test');
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

export const renderRecipes = recipes => {
    // console.log(recipes);
    recipes.forEach(renderSingleRecipe); // renderSingleRecipe is a callback function in this case. So every single element from forEach loop will be automaticaly passed to the function.
}