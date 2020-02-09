import React, {useEffect, useState} from 'react';
import qs from 'qs'
import './App.css';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Infobox from './components/Infobox';

const api = `https://pokeapi.co/api/v2`

function App() {  

  const [pokemon, setPokemon] = useState([])
  const [currentPokemon, setCurrentPokemon] = useState({
    id: 0,
    name: '',
    sprite: '',
    games: []
  })

  const iChooseYou = (el) => {
    console.dir(el.target.dataset.url)
    const url = el.target.dataset.url
    axios.get(url)
    .then(response => {
      console.log(response.data)
      setCurrentPokemon({id: response.data.id, name: response.data.name, sprite: response.data.sprites.front_default, games: response.data.game_indices})
      return currentPokemon
    })
  }

  const getHash = () => {
    return window.location.hash.slice(1);
  }
  
  const [params, setParams] = useState(qs.parse(getHash()));

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setParams(qs.parse(getHash()));
    });
    setParams(qs.parse(getHash()));
  }, []);

  useEffect(() => {
    axios.get(`${api}/pokemon`)
    .then(response => { 
      setPokemon(response.data.results)
      return pokemon
    })
  }, [])

  useEffect(() => {
    axios.get(`${api}/pokemon/ditto`)
      .then(response => {
        console.log(response.data)
        setCurrentPokemon({id: response.data.id, name: response.data.name, sprite: response.data.sprites.front_default, games: response.data.game_indices})
        return currentPokemon
    })
  }, [])

  return (
    <div className="container">
      <h1>Poke App</h1>
      <Sidebar pokemon={pokemon} iChooseYou={iChooseYou}/>
      <Infobox currentPokemon={currentPokemon} />
    </div>
  );
}

export default App;
