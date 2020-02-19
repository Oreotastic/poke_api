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
    games: [],
    desc: ''
  })
  const [desc, setDesc] = useState('')

  const iChooseYou = (el) => {
    const url = el.target.dataset.url
    axios.get(url)
    .then(response => {
      setCurrentPokemon({id: response.data.id, name: response.data.name, sprite: response.data.sprites.front_default, games: response.data.game_indices
        })
      return response
    }).then(response => response.data)
    .then(data => {
      return axios.get(data.species.url)
      .then(response => response.data)
      .then(data => {
        let text 
        for(let entry of data.flavor_text_entries) {
          if(entry.language.name === 'en') {
            text = entry.flavor_text
            break;
          }
        }
        setDesc(text)
      })
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
        setCurrentPokemon({id: response.data.id, name: response.data.name, sprite: response.data.sprites.front_default, games: response.data.game_indices
        })
        return response
    }).then(response => response.data)
    .then(data => {
      return axios.get(data.species.url)
      .then(response => response.data)
      .then(data => {
        let text 
        for(let entry of data.flavor_text_entries) {
          if(entry.language.name === 'en') {
            text = entry.flavor_text
            break;
          }
        }
        setDesc(text)
      })
    })
      
    
  }, [])

  return (
    <div className="container app">
      <h1>Poke App</h1>
      <div className="main">
        <Sidebar pokemon={pokemon} iChooseYou={iChooseYou}/>
        <Infobox currentPokemon={currentPokemon} desc={desc}/>
      </div>
    </div>
  );
}

export default App;
