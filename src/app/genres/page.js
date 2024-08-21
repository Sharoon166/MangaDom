"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

async function getGenres(page = 1, limit = 20) {
  const res = await fetch(`https://kitsu.io/api/edge/genres?page[limit]=${limit}&page[offset]=${(page - 1) * limit}`)
  if (!res.ok) {
    throw new Error('Failed to fetch genres')
  }
  return res.json()
}

export default function GenresPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [genresData, setGenresData] = useState({ data: [], links: {} })

  useEffect(() => {
    const fetchInitialGenres = async () => {
      const initialData = await getGenres()
      setGenresData(initialData)
    }
    fetchInitialGenres()
  }, [])

  const loadMoreGenres = async () => {
    const nextPage = currentPage + 1
    const newGenresData = await getGenres(nextPage)
    setGenresData(prevData => ({
      ...newGenresData,
      data: [...prevData.data, ...newGenresData.data]
    }))
    setCurrentPage(nextPage)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Anime Genres</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {genresData.data.map((genre) => (
          <Link href={`/genre/${genre.attributes.slug}`} key={genre.id}>
            <div className="bg-[#333] rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-105">
              <h2 className="text-2xl font-semibold mb-3 text-white">{genre.attributes.name}</h2>
              <p className="text-gray-200 text-sm mb-4">Slug: {genre.attributes.slug}</p>
              <div className="bg-white bg-opacity-20 text-white text-xs font-semibold px-2 py-1 rounded-full inline-block transition-all duration-300 hover:bg-opacity-30">
                Explore
              </div>
            </div>
          </Link>
        ))}
      </div>
      {genresData.links && genresData.links.next && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMoreGenres}
            className="bg-[#333] hover:bg-[#444] text-white font-bold py-2 px-4 rounded transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
