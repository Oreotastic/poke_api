import React from 'react'

const Infobox = ({currentPokemon}) => {


  return (
    <div className="container">
      <h1>Info Box</h1>
      <div className="container infobox">
        <h3>{currentPokemon.name}</h3>
        <img src={currentPokemon.sprite} alt={currentPokemon.name}/>
        <h3>{currentPokemon.id}</h3>
      </div>
      <div className="container moreinfo">
        <ul>
          {
            currentPokemon.games.map((game, index) => {
              console.log(game)
              return (
                <li data-url={game.version.url} key={index}>
                  {game.version.name}
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Infobox