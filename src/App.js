import styles from './App.module.css'
import Cards from './components/Cards/Cards.jsx'
import Nav from './components/Nav/Nav.jsx'
import {useState} from 'react'


function App () {

  const [characters, setCharacters] = useState([]);

function onSearch(character) {
  fetch(`https://rickandmortyapi.com/api/character/${character}`)
     .then((response) => response.json())
     .then((data) => {
        if (data.name) {
           setCharacters((oldChars) => [...oldChars, data]);
        } else {
           window.alert('No hay personajes con ese ID');
        }
     });
}

const onClose = (id)=>{
  const filtered = characters.filter((char)=> char.id !== Number(id))
  setCharacters(filtered)
}

  return (
    
    <div className={styles.App}>

      <div >
        <Nav
        onSearch={onSearch}
        />
      </div>

     <div>
        <Cards
          characters={characters}
          onClose={onClose}
        />
      </div>

      <hr />
      

    </div>
  )
}

export default App
