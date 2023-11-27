import PhoneTable from "./components/PhoneTable";
import SearchHeader from "./components/SearchHeader";

const FilterMain = () => {
  

  return (
    <main className="flex flex-col justify-center items-center relativ">
      <SearchHeader />
      <PhoneTable />
    </main>
  )
}

export default FilterMain;