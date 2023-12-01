import { usePhoneStore } from "../states/stores";
import SearchSvg from "./SearchSvg";
import { KeyboardEvent, MouseEvent, useRef } from 'react';


const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const setFilter = usePhoneStore((state) => state.setFilter);

  const EnterFilter = (e: KeyboardEvent<HTMLInputElement> & MouseEvent<HTMLButtonElement>) => {
    const text = (inputRef.current as HTMLInputElement).value.toLowerCase();
    if ((e.type === 'keydown' && text !== '' && e.key === 'Enter') || (e.type === 'click' && text != '')) {
      setFilter('text', text); 
      (inputRef.current as HTMLInputElement).value = ''
    }
  }


  return (
    <div className="flex w-full items-center lg:w-[480px]">
      <input className="w-full h-10 ml-2 border-b-4 border-solid border-cyan-600 outline-none"
        aria-label="검색바" type="text" placeholder="Smart Phone Model"
        ref={inputRef} onKeyDown={EnterFilter}/>
      <button className="px-4" type="button" onClick={EnterFilter}>
        <SearchSvg/>
      </button>
    </div>
  )
}

export default SearchBar;