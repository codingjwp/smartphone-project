import { usePhoneStore } from "../states/stores";

type TableProps = {
  detailClick: (id: number, isOpen: boolean) => void;
}

const PhoneTable = ({detailClick}: TableProps) => {
  const filterData = usePhoneStore((state) => state.filterData);

  return (
    <table className="table-auto mt-5 border-separate border-spacing-1 borde border-cyan-500">
      <thead className="relative">
        <tr className="bg-cyan-600 text-cyan-50 sticky top-[46px]">
          <th className="py-2 border min-w-[78px] border-cyan-600"><span>브랜드</span></th>
          <th className="py-2 border min-w-[172px] border-cyan-600"><span>모델</span></th>
          <th className="py-2 border min-w-[100px] border-cyan-600"><span>OS</span></th>
          <th className="py-2 hidden border border-cyan-600"><span>램(GB)</span></th>
          <th className="py-2 hidden border border-cyan-600"><span>저장소(GB)</span></th>
          <th className="py-2 hidden border border-cyan-600"><span>배터리(mAh)</span></th>
          <th className="py-2 hidden border border-cyan-600"><span>스크린(in)</span></th>
          <th className="py-2 hidden border border-cyan-600"><span>해상도</span></th>
        </tr>
      </thead>
      <tbody>
        {filterData.length > 0
          ? filterData.map((data) => {
            return (
              <tr key={data.id}>
                <td className="px-1 border border-cyan-700"><span className="flex items-center justify-center h-14">{data.brands}</span></td>
                <td className="px-1 border border-cyan-700">
                  <button className="w-full h-14 hover:underline" type="button"
                    onClick={() => detailClick(data.id, true)}>{data.model}</button>
                  </td>
                <td className="px-1 border border-cyan-700 text-center">{data.os.replaceAll(' ',', ')}</td>
                <td className="hidden px-1 border border-cyan-700"><span>{data.ram.replaceAll(' ',', ')}</span></td>
                <td className="hidden px-1 border border-cyan-700"><span>{data.storage.replaceAll(' ',', ')}</span></td>
                <td className="hidden px-1 border border-cyan-700"><span>{data.battery}</span></td>
                <td className="hidden px-1 border border-cyan-700"><span>{data.screen}</span></td>
                <td className="hidden px-1 border border-cyan-700"><span>{data.width} X {data.height}</span></td>
              </tr>
            )
          }) 
          : null}
      </tbody>
    </table>
  )
}

export default PhoneTable