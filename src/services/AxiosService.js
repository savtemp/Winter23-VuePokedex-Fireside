import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

// NOTE for the change page to work the baseURL NEEDS to contain the /api/v2/pokemon or you will get an error
export const pokeAPI = Axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon',
  timeout: 9000
})
