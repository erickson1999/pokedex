import { Pokemon } from "../interfaces";
export const refactoringDataPokemon = (data: Pokemon) => {
  const imgs = data.sprites;
  const dream_world_front_default = imgs.other?.dream_world.front_default;
  const front_default = imgs.front_default;
  const back_default = imgs.back_default;
  const front_shiny = imgs.front_shiny;
  const back_shiny = imgs.back_shiny;
  const sprites = {
    other: { dream_world: { front_default: dream_world_front_default } },
    front_default,
    back_default,
    front_shiny,
    back_shiny,
  };
  return {
    name: data.name,
    sprites,
    height: data.height,
    base_experience: data.base_experience,
  };
};
