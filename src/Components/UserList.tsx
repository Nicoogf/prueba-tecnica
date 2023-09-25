import { type User } from "../types.d" ; 

interface Props{
    users: User[]
    showColors: boolean
}


export function UserList ({ users , showColors }: Props) {
    return(
        <table width='100%'>
            <thead>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Pais</th>
                <th>Accion</th>
            </thead>


            <tbody>
                {
                    users.map( (user , index )=>{
                    const backgroundColor =  index  % 2 === 0 ?  "#333" : "#555 "
                    const color = showColors ?  backgroundColor : "transparent"
                        return (
                        <tr key={index} style={ {backgroundColor: color } }> 
                            <td>
                                <img src ={ user.picture.thumbnail }></img>
                            </td>

                            <td> { user.name.first } </td>
                            <td> { user.name.last } </td>
                            <td> { user.location.country } </td>
                            <td> <button> Eliminar </button> </td>
                        </tr>
                        )
                    } )
                }
            </tbody>
        </table>
    )
}