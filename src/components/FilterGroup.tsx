import { ReactNode } from "react";

const FilterGroup = ({children}: {children: ReactNode}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-start lg:mt-3">
      {children}
    </div>
  )
}

export default FilterGroup;