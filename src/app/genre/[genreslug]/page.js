"use client"
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {Loading} from '@/Loading'

export async function getMangaByGenreExtended(slug, page = 1, limit = 20) {
  try {
    const response = await fetch(`https://kitsu.io/api/edge/manga?sort=-userCount&filter[genres]=${slug}&page[limit]=${limit}&page[offset]=${(page - 1) * limit}&fields[manga]=titles,coverImage,posterImage,averageRating,synopsis,chapterCount,startDate,slug`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching manga by genre:", error)
    return null
  }
}

const GenrePage = ({ params }) => {
  const { genreslug } = params
  const [currentPage, setCurrentPage] = useState(1)
  const [mangaData, setMangaData] = useState([])
  const [meta, setMeta] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMangaByGenreExtended(genreslug, currentPage)
      if (result) {
        setMangaData(result.data)
        setMeta(result.meta)
      }
    }
    fetchData()
  }, [genreslug, currentPage])

  if (!mangaData || !meta) {
    return <div className='h-screen flex items-center justify-center'>

    <div class="flex-col gap-4 w-full flex items-center justify-center">
     <div
       class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
       >
       <div
         class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
         ></div>
     </div>
   </div>
         </div>
    
  }

  const totalPages = Math.ceil(meta.count / 20)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const renderPaginationButtons = () => {
    const buttons = []
    const maxVisibleButtons = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2))
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1)

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`relative inline-flex items-center px-2 sm:px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
            currentPage === i ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      )
    }

    return buttons
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 sm:mb-12 text-center text-purple-800 tracking-tight">{genreslug.charAt(0).toUpperCase() + genreslug.slice(1)} Manga</h1>
      <div className="p-4 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-8">
          {mangaData.map((manga) => (
            <Link href={`/manga/${manga.attributes.slug}`} key={manga.id}>
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-3xl">
                <div className="relative">
                  <img
                    src={manga.attributes.posterImage?.small || '/placeholder.jpg'}
                    alt={manga.attributes.titles.en || manga.attributes.titles.en_jp}
                    className="w-full h-48 sm:h-64 md:h-80 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 sm:p-4">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-white truncate">{manga.attributes.titles.en || manga.attributes.titles.en_jp}</h2>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">Rating</span>
                    <span className="text-xs sm:text-sm font-bold text-indigo-600">{manga.attributes.averageRating || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">Chapters</span>
                    <span className="text-xs sm:text-sm font-bold text-indigo-600">{manga.attributes.chapterCount || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center mt-8">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px overflow-x-auto max-w-full" aria-label="Pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          {renderPaginationButtons()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  )
}

export default GenrePage