<template>
  <div>
    <img class="pokemonImg" :src="pokemon.img" alt="">
  </div>
  <div>
    <h1>{{pokemon.name}}</h1>
    <p>Height: {{pokemon.height}} | Weight: {{pokemon.weight}} </p>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Pokemon } from '../models/Pokemon.js';
export default {
  // NOTE we brought in props because the PokemonCard is a child of the Home Page, it is a pokemon, that is type Pokemon. 
  // NOTE naming it 'pokemon' allows us to access the information above in the template
  props: {pokemon: {type: Pokemon}},
  // NOTE if we were going to write functions that involve our prop, then we would need to pass props into the setup
  setup(props){
  return {  }
  }
};
</script>


<style lang="scss" scoped>
.pokemonImg{
  height: 20em;
  width: 20em;
}
</style>