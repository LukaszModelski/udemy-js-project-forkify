import Search from './models/Search'
import * as searchView from './views/searchView'
import { elements } from './views/base'

// state of app
const state = {}

const controlSearch = async () => {
    
    // get query from view TODO
    const query = searchView.getInput();
    
    // create new search object TODO
    if (query) {
        console.log(`Query: ${query}`);
        state.search = new Search(query);
    } else {
        console.log('Empty query!');
        return;
    }
    
    // prepare UI for results TODO
    searchView.clearInput();
    searchView.clearSearchedRecipes();

    // render spinner
    // console.log(elements.resultsContainer);
    searchView.rederSpinner(elements.resultsContainer);
    
    // search for recipes TODO
    await state.search.searchRecipes();

    // clear spinner
    searchView.clearSpinner(elements.resultsContainer);
    
    // render results to UI TODO
    searchView.renderRecipes(state.search.recipes);
    
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});