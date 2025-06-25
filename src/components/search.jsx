import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="search">
            <div className="w-fit p-1 my-4 mx-auto border border-gray-300 shadow-lg rounded-3xl flex flex-row justify-center items-centerg bg-gray-300/60">
                <img className="size-10 p-1 bg-gray-200 shadow rounded-full text-white" src="search.svg" alt="search" />
                <input className="px-2 outline-none placeholder:text-gray-700" type="text" placeholder="Search movie here..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
            </div>
            <h3 className="text-2xl text-white text-center">{searchTerm}</h3>

        </div>
    )
}

export default Search;