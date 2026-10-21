import './AnimeCard.css';
import { Link } from 'react-router';

function AnimeCard({ title, image, rating, year, id }){
    return(
        <Link to={`/anime/${id}`} className='anime-card'>
            <img src={image} alt={title} className='anime-image' />

            <h3 className='anime-title'> {title} </h3>


            <div className='anime-info'>
                <span> {year} </span>
                <span> ⭐ {rating} </span>
            </div>


        </Link>

  
    )
}

export default AnimeCard;