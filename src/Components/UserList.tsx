import { type User } from "../types" ;


/**
 *  Se declara el tipo de dato que va a llegar por Props
 *  Usuarios va a ser de tipo Array de Usuarios
 *  users ---- usuarios
 *  showColors ---- colores
 *  
 */

interface Props {
    usuarios: User[]
    colores: boolean
    eliminarUsuario : (email: string) => void 
}

export function UserList ({ usuarios , colores  , eliminarUsuario} : Props  ) {
  return(

   <table width='100%'>

     <thead>
       <tr>
         <td> Profile </td>
         <td> Name </td>
         <td> Last Name </td>
         <td> Country </td>
         <td> Accion </td>
       </tr>
     </thead>

     <tbody>
     { 

     /**
      *  backgroundColor = Es el boolean que va a determinar si el numero de fila es par o inpar
      *  color ---- colorDeFila
      *  colorDeFila se guarda en variable el condicional para boton prendido o apagado
      */

       usuarios.map( (usuario , index ) => {
        const backgroundColor = index % 2 === 0 ? '#333' : '#555'     
        const colorDeFila= colores ?  backgroundColor : 'transparent'   

        return(
            <tr key={ usuario.email } style={ {backgroundColor : colorDeFila }}>

                <td> <img src ={ usuario.picture.thumbnail}/> </td>
                <td> { usuario.name.first } </td>
                <td> { usuario.name.last } </td>
                <td> { usuario.location.country } </td>
                <td> <button onClick={ () => eliminarUsuario( usuario.email ) }> Delete User </button> </td>

            </tr>
        )                    
        })                
     }
    </tbody>
           
   </table>
    )
}