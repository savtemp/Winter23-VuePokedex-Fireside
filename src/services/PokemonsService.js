import { AppState } from "../AppState.js"
import { Pokemon } from "../models/Pokemon.js"
import { logger } from "../utils/Logger.js"
import { api, pokeAPI } from "./AxiosService.js"


class PokemonsService{

  // NOTE if we want to be able to change the page with the changePage function below we need to store the next and previous data with our original get to the pokeAPI 
  async getAllPokemon(){
    const res = await pokeAPI.get('')
    logger.log('[GETTING ALL POKEMON]', res.data)
    AppState.pokemons = res.data.results
    AppState.nextPage = res.data.next
    AppState.previousPage = res.data.previous
  }

  async setActivePokemon(url){
    const res = await api.get(url)
    // logger.log('[SETTING ACTIVE POKEMON]', res.data)
    AppState.activePokemon = new Pokemon(res.data)
    // logger.log('[ACTIVE POKEMON IN THE APPSTATE]', AppState.activePokemon)
  }

  // NOTE we make a call to change the page, taking in the URL, we update the information in our appState
  async changePage(url){
    const res = await api.get(url)
    logger.log('[CHANGE PAGE]', res.data)
    AppState.nextPage = res.data.next
    AppState.previousPage = res.data.previous
    // NOTE if we are updating a list (like in getAllPokemon) we need to also update the data we are looking at in the page
    AppState.pokemons = res.data.results
  }

}


export const pokemonsService =  new PokemonsService()