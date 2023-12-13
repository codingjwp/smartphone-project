import { useEffect } from "react"
import Headers from "./components/Headers";
import FilterMain from "./FilterMain";
import Toast from "./components/Toast";
import { getPhoneFetch } from './states/stores';

function App() {
  useEffect(() => {
    const controlFetch = new AbortController;
    const signal = controlFetch.signal;
    getPhoneFetch(1, signal);
    return () => controlFetch.abort();
  }, [])

  return (
    <div>
      <Toast />
      <Headers title="Smart Phone Data List" />
      <FilterMain />
    </div>
  )
}

export default App
