import FilterGroup from "./FilterGroup";
import Selectors from "./Selectors";
import { usePhoneStore } from "../states/stores";
import SearchBar from "./SearchBar";

const SearchHeader = () => {
  const categorys = usePhoneStore((state) => state.categorys);
  
  return (
    <FilterGroup>
      <Selectors name="brand" title="브랜드" optionData={categorys} />
      <Selectors name="os" title="운영체제" optionData={["android", "ios", "coloros", "harmony", "wateros"]} />
      <Selectors name="storage" title="용량" optionData={['8', '16', '32', '64', '128', '256', '512', '1000']} />
      <SearchBar />
    </FilterGroup>
  )
}
export default SearchHeader;