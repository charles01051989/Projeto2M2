require("dotenv").config();
const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const path = require("path");
const app = express();
app.set("view engine", "ejs");
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
let pokemon = undefined;
const pokedexList = [
  {
    id: 1,
    nome: "Bulbassaur",
    descricao:
      "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    tipo: "Grass",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    altura: "0.7m",
    peso: "6.9kg",
    categoria: "Seed",
    habilidade: "Overgrow",
  },
  {
    id: 2,
    nome: "Charmander",
    descricao:
      "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
    tipo: "Fire",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    altura: "0.6m",
    peso: "8.5kg",
    categoria: "Lizard",
    habilidade: "Blaze",
  },
  {
    id: 3,
    nome: "Butterfree",
    descricao:
      "In battle, it flaps its wings at great speed to release highly toxic dust into the air.",
    tipo: "Bug",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/012.png",
    altura: "1.1m",
    peso: "3.2kg",
    categoria: "Butterfly",
    habilidade: "Compound Eyes",
  },
  {
    id: 4,
    nome: "Nidorino",
    descricao:
      "With a horn that’s harder than diamond, this Pokémon goes around shattering boulders as it searches for a moon stone",
    tipo: "Poison",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/033.png",
    altura: "0.9m",
    peso: "19.5kg",
    categoria: "Poison Pin",
    habilidade: "Poison Point/Rivalry",
  },
];

//Rotas
app.get("/", (req, res) => {
  res.render("index", { pokedexList, pokemon });
});
app.post("/newP", (req, res) => {
  const pokemon = req.body;
  pokemon.id = pokedexList.length + 1;
  pokedexList.push(pokemon);
  res.redirect("/");
});
app.get("/infP/:id", (req, res) => {
  const id = +req.params.id;
  pokemon = pokedexList.find((pokemon) => pokemon.id === id)
  // pokemon = pokedexList.at(id-1)
  res.redirect("/");
});
app.post("/upP/:id", (req, res) => {
  const id = +req.params.id -1;
  const cadPokemon = req.body;
  cadPokemon.id = id +1
  pokedexList[id] = cadPokemon
  pokemon = undefined;
  res.redirect("/");
});
// app.get("/delete/:id", (req, res) => {
//   const id = +req.params.id-1;
//   delete pokedexList[id];
//   res.redirect("/");
// });
app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000 ")
);
