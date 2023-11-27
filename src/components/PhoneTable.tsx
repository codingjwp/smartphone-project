import { usePhoneStore } from "../states/stores";


const PhoneTable = () => {
  const filterData = usePhoneStore((state) => state.filterData);

  return (
    <table className="table-auto mt-5 border-separate border-spacing-1 border  border-cyan-500">
      <thead>
        <tr className="bg-cyan-600 text-cyan-50">
          <th className="border min-w-[78px] border-cyan-600"><span>브랜드</span></th>
          <th className="border min-w-[172px] border-cyan-600"><span>모델</span></th>
          <th className="border min-w-[100px] border-cyan-600"><span>OS</span></th>
          <th className="hidden border border-cyan-600"><span>램(GB)</span></th>
          <th className="hidden border border-cyan-600"><span>저장소(GB)</span></th>
          <th className="hidden border border-cyan-600"><span>배터리(mAh)</span></th>
          <th className="hidden border border-cyan-600"><span>스크린(in)</span></th>
          <th className="hidden border border-cyan-600"><span>해상도</span></th>
        </tr>
      </thead>
      <tbody>
        {filterData.length > 0
          ? filterData.map((data) => {
            return (
              <tr key={data.id}>
                <td className="px-1 border border-cyan-700"><span className="flex items-center justify-center h-14">{data.brands}</span></td>
                <td className="px-1 border border-cyan-700">{data.model}</td>
                <td className="px-1 border border-cyan-700 text-center">{data.os.replaceAll(' ',', ')}</td>
                <th className="hidden px-1 border border-cyan-700"><span>{data.ram.replaceAll(' ',', ')}</span></th>
                <th className="hidden px-1 border border-cyan-700"><span>{data.storage.replaceAll(' ',', ')}</span></th>
                <th className="hidden px-1 border border-cyan-700"><span>{data.battery}</span></th>
                <th className="hidden px-1 border border-cyan-700"><span>{data.screen}</span></th>
                <th className="hidden px-1 border border-cyan-700"><span>{data.width} X {data.height}</span></th>
              </tr>
            )
          }) 
          : null}
      </tbody>
    </table>
  )
}

export default PhoneTable