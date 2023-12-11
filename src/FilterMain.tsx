import { useState } from "react";
import PhoneDetail from "./components/PhoneDetail";
import PhoneTable from "./components/PhoneTable";
import SearchHeader from "./components/SearchHeader";

type DetailObj = {
  id: number,
  isOpen: boolean
}

const FilterMain = () => {
  const [detail, setDetail] = useState<DetailObj>({id: 0, isOpen: false});
  const handleDetailClick = (id: number, isOpen: boolean) => {
    setDetail({ id: id, isOpen: isOpen});
  }
  
  return (
    <main className="flex flex-col justify-center items-center mt-11 xl:max-w-7xl xl:mx-auto">
      <SearchHeader />
      <PhoneTable detailClick={handleDetailClick} />
      {/* <PhoneDetail detail={detail} handleClick={handleDetailClick} /> */}
    </main>
  )
}

export default FilterMain;