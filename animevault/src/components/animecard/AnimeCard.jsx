import './AnimeCard.css';

function AnimeCard({ title, image, rating, year}){
    return(
        <div className='"anime-card'>
            <img src={image} alt={title} className='anime-image' />

            <h3 className='anime-title'> {title} </h3>


            <div className='anime-info'>
                <span> {year} </span>
                <span> ⭐ {rating} </span>
            </div>


        </div>

  
    )
}

export default AnimeCard;