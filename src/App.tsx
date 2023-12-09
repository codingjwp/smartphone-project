import { useEffect } from "react";
import { usePhoneStore, createPhones } from "./states/stores"
import Headers from "./components/Headers";
import FilterMain from "./FilterMain";
import { Toast } from "./components/Toast";

function App() {
  const baseData = usePhoneStore((state) => state.baseData);
  useEffect(() => {
    if (baseData && Object.keys(baseData).length === 0) createPhones();
  }, [baseData])
  
  return (
    <div>
      <Toast />
      <Headers title="Smart Phone Data List"/>
      <FilterMain />
    </div>
  )
}

export default App
