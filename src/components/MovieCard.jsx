import React from "react";

const MovieCard = ({ movie: { title, vote_average, poster_path, release_date, original_language } }) => {
    return (
        <div className="w-fit flex flex-col justify-center movie-card p-4 bg-gray-800 rounded-xl shadow-2xl">
            <img className="w-fit rounded-t-lg" src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={title}></img>

            <div className="mt-4">
                <p className="title text-lg text-white text-left whitespace-normal truncate">{title}</p>

                <div className="content flex flex-row justify-start gap-6 items-center text-xl text-gray-400 font-medium">
                    <div className="flex flex-row justify-center items-center gap-1">
                        <img className="size-4" src="star.svg"></img>
                        <p className="">{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>
                    <p className="lang">{original_language}</p>
                    <p className="release-date">{release_date ? release_date : 'N/A'}</p>
                </div>


            </div>
        </div>
    )
}

export default MovieCard;