import { useRef } from 'react'
import SearchIcon from '../public/icons/search-icon'

export default function SearchBar({searchQueryHandler}) {

  const inputText = useRef()

  function OnSubmit() {
    searchQueryHandler(inputText.current.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      OnSubmit()
    }
  }

  return (
    <div className="relative flex items-center w-full h-12 mb-4 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <button className="grid place-items-center h-full w-12 text-gray-300 hover:text-blue-300 search-icon"
          onClick={OnSubmit} 
        >
          <SearchIcon styles={'h-6 w-6 p-auto'} />
        </button>
        
        <input
        ref={inputText}
        className="peer h-full w-full bg-white outline-none text-sm text-gray-700 px-2"
        type="text"
        id="search"
        placeholder="Search by name, email or role"
        onKeyDown={handleKeyDown} /> 
    </div>
  )
}
