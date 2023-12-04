import { usePhoneStore } from "../states/stores";
import { useScrollPage } from "../hooks/useScrollPage";

type TableProps = {
  detailClick: (id: number, isOpen: boolean) => void;
}

const PhoneTable = ({detailClick}: TableProps) => {
  const {filterData, pages} = usePhoneStore((state) => ({filterData: state.filterData, pages: state.pages}));
  const {ref} = useScrollPage();

  return (
    <>
      <table className="table-auto mt-5 w-full border-separate border-spacing-1 border-cyan-500">
        <thead className="relative">
          <tr className="bg-cyan-800 text-cyan-50 sticky top-[46px]">
            <th className="py-2 border-cyan-800"><span>브랜드</span></th>
            <th className="py-2 border border-cyan-800"><span>모델</span></th>
            <th className="py-2 border border-cyan-800"><span>OS</span></th>
            <th className="hidden md:table-cell py-2 border border-cyan-800"><span>램<sub>(GB)</sub></span></th>
            <th className="hidden md:table-cell py-2 border border-cyan-800"><span>저장소<sub>(GB)</sub></span></th>
            <th className="hidden md:table-cell py-2 border border-cyan-800"><span>배터리<sub>(mAh)</sub></span></th>
            <th className="hidden lg:table-cell py-2 border border-cyan-800"><span>스크린(in)</span></th>
            <th className="hidden lg:table-cell py-2 border border-cyan-800"><span>해상도</span></th>
          </tr>
        </thead>
        <tbody>
          {filterData.length > 0
            ? filterData.map((data) => {
              return (
                <tr key={data.id}>
                  <td className="px-1 border border-cyan-700"><span className="flex items-center justify-center min-h-[56px] max-h-full">{data.brands}</span></td>
                  <td className="px-1 border border-cyan-700">
                    <button className="w-full hover:underline" type="button"
                      onClick={() => detailClick(data.id, true)}>{data.model}</button>
                    </td>
                  <td className="px-1 border border-cyan-700 text-center">{data.os.replaceAll(' ',', ')}</td>
                  <td className="hidden md:table-cell px-1 border border-cyan-700 text-center">{data.ram.replaceAll(' ',', ')}</td>
                  <td className="hidden md:table-cell px-1 border border-cyan-700 text-center">{data.storage.replaceAll(' ',', ')}</td>
                  <td className="hidden md:table-cell px-1 border border-cyan-700 text-center">{data.battery}</td>
                  <td className="hidden lg:table-cell px-1 border border-cyan-700 text-center">{data.screen}</td>
                  <td className="hidden lg:table-cell px-1 border border-cyan-700 text-center">{data.width} X {data.height}</td>
                </tr>
              )
            }) 
            : null}
        </tbody>
      </table>
      <div ref={ref} className={`w-full h-4 opacity-0 ${pages.page === pages.totalPage ? "hidden" : "block" }`}></div>
    </>
  )
}

export default PhoneTable