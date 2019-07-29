import { apiKey, apiUrl } from '../config';
import axios from 'axios';

export default class Recipe {

    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try{
            const response = await axios(`${apiUrl}get?key=${apiKey}&rId=${this.id}`);
            // console.log(response);
            this.title = response.data.recipe.title;
            this.author = response.data.recipe.publisher;
            this.image = response.data.recipe.image_url;
            this.ingredients = response.data.recipe.ingredients;
            this.url = response.data.recipe.source_url;
            this.countCookingTime();
        } catch (error) {
            console.log(error);
        }
    }

    // we presum that ever 3 ingrediens gives as 15min of cooking
    countCookingTime() {
        if(this.ingredients) {
            this.cookingTime = Math.ceil(this.ingredients.length/3)*15;
        } else {
            console.log('No ingredients!');
        }
    }
}