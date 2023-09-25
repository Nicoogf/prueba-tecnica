import { useEffect , useState } from 'react';
import './App.css' ;
import { type User } from "./types.d" ; 
import { UserList } from './Components/UserList';

function App() {
  
  const [ users , setUsers ] = useState<User[]>([]) ;
  const [ showColors , setShowColors] = useState( false );
  const [ sortByCountry , setSortByCountry ] = useState( false ) ;

    const toggleColors = () =>{
      setShowColors( !showColors )
    }

    const toggleSortByCountry = () =>{
      setSortByCountry( prevState => !prevState)
    } 

    useEffect( ()=>{
      fetch( "https://randomuser.me/api?results=100" )
      .then( res => res.json() )
      .then( res => {
        setUsers( res.results )
      })
      .catch( err => console.log(err))
      }, [])

      const sortedUsers = sortByCountry 
      ? users.toSorted( ( a, b )=>{
        return a.location.country.localeCompare(b.location.country)
      })
      :users

      const eliminarUsuario = ( email: string ) =>{
        const usuariosFiltrados = users.filter(( usuario )=> usuario.email !==  email)
        setUsers(usuariosFiltrados)
      }

 



  return (
    <div className='App'>

      <h1>Prueba Tecnica.</h1>

      <header>
        <button onClick={ toggleColors }> Colorear Filas </button>

        <button onClick={ toggleSortByCountry }> 
          { sortByCountry ? "Ordenar Paises" : "No ordenar Paises"}  
        </button>
      </header>

      <main>
       <UserList users={ sortedUsers }  showColors = { showColors }  eliminarUsuario = {eliminarUsuario}/>
      </main>

    
    </div>
  )
}

export default App
