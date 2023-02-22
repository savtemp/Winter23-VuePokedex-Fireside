<template>
  <div class="row justify-content-around m-3">

    <!-- SECTION Pokemon List -->
    <div class="col-md-3 text-center">

      <div>
        <!-- NOTE function changePage will bring in the stored data in the appState -->
        <button class="btn btn-outline-dark w-50" :disabled="!previousPage" @click="changePage(previousPage)">Previous</button>
        <button class="btn btn-outline-dark w-50" :disabled="!nextPage" @click="changePage(nextPage)">Next</button>
      </div>

      <!-- NOTE a button for set the activePokemon that will take in the url so it displays all the information for that specific pokemon (you could also use id or name) -->
      <div v-for="p in pokemons" :key="p.name">
        <button class="btn btn-danger w-75 m-1" @click="setActivePokemon(p.url)">{{p.name}}</button>
      </div>
    </div>

    <!-- SECTION Active Pokemon -->
    <div class="col-md-7" v-if="activePokemon">
      <!-- NOTE if you want to use a component we need to bind the information -->
      <PokemonCard :pokemon="activePokemon" />

      <!-- NOTE we did not originally do a component, so here is the old code for no component activePokemon -->
      <!-- <div>
        <img class="pokemonImg" :src="activePokemon.img" alt="">
      </div>
      <div>
        <h1>{{activePokemon.name}}</h1>
        <p>Height: {{activePokemon.height}} | Weight: {{activePokemon.weight}} </p>
      </div>
    </div> -->
    </div>

  </div>
</template>

<script>
import { onMounted } from 'vue';
import { pokemonsService } from '../services/PokemonsService.js';
import Pop from '../utils/Pop.js';
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import PokemonCard from '../components/PokemonCard.vue';

export default {
    setup() {
        async function getAllPokemon() {
            try {
                await pokemonsService.getAllPokemon();
            }
            catch (error) {
                console.error(error);
                // @ts-ignore 
                Pop.error(("[ERROR]"), error.message);
            }
        }
        // NOTE function in the onMounted so it happens on page load 
        onMounted(() => {
            getAllPokemon();
        });
        return {
            pokemons: computed(() => AppState.pokemons),
            activePokemon: computed(() => AppState.activePokemon),
            nextPage: computed(() => AppState.nextPage),
            previousPage: computed(() => AppState.previousPage),


            async setActivePokemon(url) {
                try {
                    await pokemonsService.setActivePokemon(url);
                }
                catch (error) {
                    console.error(error);
                    // @ts-ignore 
                    Pop.error(("[ERROR]"), error.message);
                }
            },
            // NOTE change page will take in the URL in the function because this is the call we will be making to the API --> the PokeAPI support pagination by using a url that will give you the next 20 pokemon on the list
            async changePage(url) {
                try {
                    await pokemonsService.changePage(url);
                }
                catch (error) {
                    console.error(error);
                    // @ts-ignore 
                    Pop.error(("[ERROR]"), error.message);
                }
            }
        };
    },
    components: { PokemonCard }
}
</script>

<style scoped lang="scss">

</style>
