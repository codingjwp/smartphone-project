import SearchHeader from "./components/SearchHeader";
import { usePhoneStore } from "./states/stores";

const FilterMain = () => {
  const filterData = usePhoneStore((state) => state.filterData);

  return (
    <main className="relativ">
      <SearchHeader />
      <div>
        {filterData.length > 0 ?  <div>{JSON.stringify(filterData)}</div> : null}
      </div>
    </main>
  )
}

export default FilterMain;