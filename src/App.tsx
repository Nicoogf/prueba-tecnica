import { useEffect , useMemo, useRef, useState } from 'react';
import './App.css' ;
import { SortBy, type User } from "./types.d" ; 
import { UserList } from './Components/UserList';

function App() {
  
  const [ users , setUsers ] = useState<User[]>([]) ;
  const [ showColors , setShowColors] = useState( false );
  const [ sorting , setSorting ] = useState<SortBy>( SortBy.NONE ) ;
  const [ filterCountry , setFilterCountry ] = useState<string|null> ( null )
 
  const EstadoOriginal = useRef<User[]>([]) ;

    const toggleColors = () =>{
      setShowColors( !showColors )
    }

    const toggleSortByCountry = () =>{
      const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
      setSorting( newSortingValue )
    } 

    const eliminarUsuario = ( email: string ) =>{
      const usuariosFiltrados = users.filter(( usuario )=> usuario.email !==  email)
      setUsers(usuariosFiltrados)
    }

    const handleReset = () =>{
      setUsers( EstadoOriginal.current )
    }

    const handleChangeSort = (sort:SortBy) =>{
      setSorting(sort)
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

     

     const sortedUsers = useMemo(() => {
      console.log('calculate sortedUsers')
  
      if (sorting === SortBy.NONE) return filteredUsers
  
      const compareProperties: Record<string, (user: User) => any> = {
        [SortBy.COUNTRY]: user => user.location.country,
        [SortBy.NAME]: user => user.name.first,
        [SortBy.LAST]: user => user.name.last
      }
  
      return filteredUsers.toSorted((a, b) => {
        const extractProperty = compareProperties[sorting]
        return extractProperty(a).localeCompare(extractProperty(b))
      })
    }, [filteredUsers, sorting])


  return (
    <div className='App'>

      <h1>Prueba Tecnica.</h1>

      <header>
        <button onClick={ toggleColors }> Colorear Filas </button>

        <button onClick={ toggleSortByCountry }> 
          { sorting === SortBy.COUNTRY ? "No ordenar Paises" : "Ordenar Paises"}  
        </button>

        <button onClick={ handleReset}>
          Resetear estado
        </button>

        <input placeholder='Filtrar por pais' onChange={(e)=>setFilterCountry(e.target.value)}></input>
      </header>

      <main>
       <UserList changeSorting = { handleChangeSort } users={ sortedUsers }  showColors = { showColors }  eliminarUsuario = {eliminarUsuario}/>
      </main>

    
    </div>
  )
}

export default App
