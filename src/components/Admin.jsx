import React from 'react'
import {withRouter} from 'react-router-dom'
import {auth} from '../firebase'



const Admin = (props) => {
    const [user, setUser] = React.useState(null)


    React.useEffect(()=>{
        if (auth.currentUser) {
            console.log("si existe usuario")
            setUser(auth.currentUser)

        } else {
            console.log("no existe usuario")
            props.history.push('/login')
        }
    }, [props.history])



    return (
        <div>
            <h1>Ruta protegida</h1>

            {
                user && (
                    <p>{user.email}</p>
                )
            }


            
        </div>
    )
}

export default withRouter(Admin)
