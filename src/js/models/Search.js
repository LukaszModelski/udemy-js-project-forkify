import axios from 'axios';
import { apiKey, apiUrl } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async searchRecipes() {
        try{
            const response = await axios(`${apiUrl}search?key=${apiKey}&q=${this.query}`);
            this.recipes = response.data.recipes;
        } catch (error) {
            console.log(error);
        }
    }

}