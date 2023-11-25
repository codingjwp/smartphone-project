import { MouseEvent, useState } from "react";
import { usePhoneStore } from "../states/stores";

type SelectorProps = {
  name:  "brand" | "storage" | "os";
  title: string;
  optionData: string[];
}

const Selectors = ({name,title, optionData}: SelectorProps) => {
  const [isClick, setIsClick] = useState(false);
  const {filter, setFilter} = usePhoneStore((state) => ({filter: state.filter, setFilter: state.setFilter}));
  const handleSelectValue = (e: MouseEvent) => {
    const value = (e.target as HTMLLIElement).getAttribute('value') ?? 'cover';
    if (value !== 'cover') setFilter(name, value);
    setIsClick(prev => !prev);
  }

  return (
    <div 
    className={`inline-block relative bg-zinc-100 m-2 rounded-lg text-center border-t select-none cursor-pointer`}
    title={name}
    aria-label={title}>
      <div tabIndex={1} className={"w-full py-2 pl-2 pr-6 after:content-[''] after:absolute after:right-2 after:top-4 after:border-t-[7px] after:border-x-[7px] after:border-solid after:border-x-transparent after:border-t-black"} onClick={handleSelectValue}>{filter[name] === 'all' ? title : filter[name] }</div>
      <ul className={`${isClick ? 'block' : 'hidden'} absolute top-12 h-[200px] rounded-lg overflow-x-hidden overflow-y-auto`} onClick={handleSelectValue}>
        <li className="w-full py-2 px-4 shadow bg-zinc-100" value="all">all</li>
        {optionData.length > 0 ? optionData.map((data, index) => <li className="w-full py-2 px-4 shadow bg-zinc-100" key={index} value={data}>{data}</li>): null}
      </ul>
    </div>
  )
}

export default Selectors;