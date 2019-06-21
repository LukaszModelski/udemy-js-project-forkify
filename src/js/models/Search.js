import axios from 'axios'

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async searchRecipes() {
        const apiKey = '9f6ca7d1c3f2388ead8a30693091bf4d';
        try{
            const response = await axios(`https://www.food2fork.com/api/search?key=${apiKey}&q=${this.query}`);
            this.recipes = response.data.recipes;
        } catch (error) {
            console.log(error);
        }
    }

}