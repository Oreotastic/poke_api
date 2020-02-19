import React from 'react'

const Sidebar = ({pokemon, iChooseYou}) => {
  return (
    <div className="container side-bar">
      <ul>
        {
          pokemon.map((poke, index) => {
            return (
              <li key={index} >
                <a data-url={poke.url} onClick={iChooseYou} href={`#view=${poke.name}`}>{poke.name}</a>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Sidebar