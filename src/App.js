import styles from './App.module.css'
import About from './components/About/About.jsx'
import Cards from './components/Cards/Cards.jsx'
import Nav from './components/Nav/Nav.jsx'
import Detail from './components/Detail/Detail.jsx'
import {useState} from 'react'
import { Route, Routes } from 'react-router-dom'



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
  <Nav onSearch={onSearch}/>
  <Routes>
  <Route path='/home' element={<Cards characters={characters} onClose={onClose}/>}/>
  <Route path='/about' element={<About/>}/>
  <Route path= "/detail/:id" element={<Detail/>}/>
  </Routes>
      
     
      

    </div>
  )
}



export default App
