

export class Pokemon{
  constructor(data){
    this.id = data.id || ''
    this.name = data.name
    this.img = data.sprites.other.dream_world.front_default
    this.height = data.height
    this.weight = data.weight
  }
}