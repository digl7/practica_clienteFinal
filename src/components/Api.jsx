import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {auth} from '../firebase'
import axios from 'axios'



const Api = (props) => {
    const [user, setUser] = React.useState(null)
    const [tituloPelicula, setTituloPelicula] = useState("") //s
    const [error, setError] = useState(null)
    

    //paginacion

    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [pagina, setPagina] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState("")
    // http://www.omdbapi.com/?apikey=ea1489f1&s=%22Pirates%20of%20the%20Caribbean%22

    const getData = async() => {
        if (tituloPelicula.length < 3 ){
            setError("Más de tres caracteres")
        }

        else{
            setError("")
            const res = await axios.get("http://www.omdbapi.com/?apikey=ea1489f1&s="+tituloPelicula+'&page='+pagina);
            setTotalPaginas(res.data.totalResults)
            const data = res.data.Search;
                const postData = data.map(pelicula => 
                    <div key={pelicula.imdbID}>
                        <p>{pelicula.Title}</p>
                    </div>
                )
                setData(postData)
                console.log(totalPaginas)
                console.log(pagina)

        }
    }
    const next = () => {
        //Funciona, pero a partir del segundo click (no se por qué)
        setPagina(pagina+1)
        getData()
    }

    const prev = () => {
        setPagina(pagina-1)
        getData()
    }

    useEffect(()=>{
        if (auth.currentUser) {
            setUser(auth.currentUser)

        } else {
            props.history.push('/login')
        }
    }, [props.history])

    return (
        <div>
            {
                user && (
                    <p>¡Hola! {user.email}</p>
                )
            }
            {
                error && ( 
                    <div className="alert alert-danger">{error}</div>
                )
            }
            <input  
                type="text"
                placeholder="Título a buscar"                
                onChange={(e)=>setTituloPelicula(e.target.value)}
                value={tituloPelicula}
            /> 
            <br/> <br/>
            <button  
                className="btn btn-success"
                onClick={
                    ()=>{setPagina(0)
                        getData()
                    }
                }
                >Buscar
            </button>

            <div>
                {data}
            </div>
            <div className="botones d-flex mt-3">
                <button 
                    className="btn me-3 btn-info btn-izquierda"
                    onClick={() => prev()}
                    >prev
                    </button>

                    <button class="btn text-dark me-3">
                        <span class="badge text-dark badge-light">{pagina}
                        / {parseInt(totalPaginas/10)}</span>
                    </button>

                <button 
                    className="btn btn-info btn-izquierda"
                    onClick={() => next()}
                    >next
                </button>
                

            </div>
        </div>
    )
}

export default withRouter(Api)
