import { useEffect , useMemo, useRef, useState } from 'react';
import './App.css' ;
import { type User } from "./types.d" ; 
import { UserList } from './Components/UserList';

function App() {
  
  const [ users , setUsers ] = useState<User[]>([]) ;
  const [ showColors , setShowColors] = useState( false );
  const [ sortByCountry , setSortByCountry ] = useState( false ) ;
  const [ filterCountry , setFilterCountry ] = useState<string|null> ( null )
 
  const EstadoOriginal = useRef<User[]>([]) ;

    const toggleColors = () =>{
      setShowColors( !showColors )
    }

    const toggleSortByCountry = () =>{
      setSortByCountry( prevState => !prevState)
    } 

    const eliminarUsuario = ( email: string ) =>{
      const usuariosFiltrados = users.filter(( usuario )=> usuario.email !==  email)
      setUsers(usuariosFiltrados)
    }

    const handleReset = () =>{
      setUsers( EstadoOriginal.current )
    }

    useEffect( ()=>{
      fetch( "https://randomuser.me/api?results=100" )
      .then( res => res.json() )
      .then( res => {
        setUsers( res.results )
        EstadoOriginal.current =  res.results
      })
      .catch( err => console.log(err))
      }, [])


   
      const filteredUsers = useMemo( () => {
        console.log ( "Calculando FilteredUsers")
        return filterCountry != null && filterCountry.length > 0
          ? users.filter ( user => {
            return user.location.country.toLocaleLowerCase().includes(filterCountry.toLocaleLowerCase())
          })
          : users
     } ,[ users , filterCountry])

     

     const sortedUsers = useMemo( () =>{
        console.log( 'calculando sortedUsers')

        return sortByCountry
        ? filteredUsers.toSorted(
          (a , b) => a.location.country.localeCompare(b.location.country)
        )
        :filteredUsers
      } , [filteredUsers , sortByCountry])



  return (
    <div className='App'>

      <h1>Prueba Tecnica.</h1>

      <header>
        <button onClick={ toggleColors }> Colorear Filas </button>

        <button onClick={ toggleSortByCountry }> 
          { sortByCountry ? "Ordenar Paises" : "No ordenar Paises"}  
        </button>

        <button onClick={ handleReset}>
          Resetear estado
        </button>

        <input placeholder='Filtrar por pais' onChange={(e)=>setFilterCountry(e.target.value)}></input>
      </header>

      <main>
       <UserList users={ sortedUsers }  showColors = { showColors }  eliminarUsuario = {eliminarUsuario}/>
      </main>

    
    </div>
  )
}

export default App
