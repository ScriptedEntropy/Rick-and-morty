import styles from './App.module.css'
import About from './components/About/About.jsx'
import Cards from './components/Cards/Cards.jsx'
import Nav from './components/Nav/Nav.jsx'
import Detail from './components/Detail/Detail.jsx'
import Form from './components/Form/Form.jsx'
import {useState, useEffect} from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'



function App () {

  const [characters, setCharacters] = useState([]);

  const navigate = useNavigate();
  const [access, setAccess] = useState(false)
  const username = 'test@test.com'
  const password = 'password'
  function login(userData) {
    if (userData.password === password && userData.username === username) {
       setAccess(true);
       navigate('/home');
    }
 }

 useEffect(() => {
  !access && navigate('/');
}, [access, navigate]);

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

const location = useLocation();
const showNav = location.pathname !== '/'

  return (
    
    <div className={styles.App}>
  {showNav && <Nav onSearch={onSearch}/>}
  
  <Routes>
  <Route path='/' element={<Form login={login}/>}/>
  <Route path='/home' element={<Cards characters={characters} onClose={onClose}/>}/>
  <Route path='/about' element={<About/>}/>
  <Route path= "/detail/:id" element={<Detail/>}/>
  </Routes>
      
     
      

    </div>
  )
}



export default App
