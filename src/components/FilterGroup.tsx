import { ReactNode } from "react";



const FilterGroup = ({children}: {children: ReactNode}) => {
  return (
    <div className="flex justify-around">
      {children}
    </div>
  )
}

export default FilterGroup;