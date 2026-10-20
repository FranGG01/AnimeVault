import './AnimeDetail.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

function AnimeDetail() {
    const {id} = useParams();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAnime() {
            try{
                const response = await fetch(`https://api.tenrai.org/v1/anime/${id}`)
                if(!response.ok){
                    throw new Error(`Error HTTP: ${response.status}`)
                }
                const data = await response.json()
                console.log(data);
                setAnime(data.data)
                
            } 
            catch(error){
               setError(error.message)
            }
            finally{
                setLoading(false);
            }
        } 
        fetchAnime();
        },[id])

    if(loading === true){
        return <p>Cargando anime...</p>
    } 
    if(error) {
        return <p> {error} </p>
    }
    if(anime === null){
        return <p>No se encontró el anime.</p>
    }

    return (
        <main>
       
            <h1> {anime.title} </h1>
            <p> {anime.score} </p>
            <p> {anime.episodes} </p>

          
        </main>
    );
}

export default AnimeDetail;