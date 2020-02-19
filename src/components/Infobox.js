import React from 'react'

const Infobox = ({currentPokemon, desc}) => {

  return (
    <div className="container info">
      <h1>Info Box</h1>
      <div className="container infobox">
        <h3>{currentPokemon.name}</h3>
        <img src={currentPokemon.sprite} alt={currentPokemon.name}/>
        <h4>#{currentPokemon.id}</h4>
      </div>
      <div className="container games">
        <h3>Description:</h3>
        <p>{desc}</p>
        <h3>Appears in:</h3>
        <ul>
          {
            currentPokemon.games.map((game, index) => {
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