import { usePhoneStore } from '../states/stores';

type DetailObj = {
  id: number,
  isOpen: boolean
}

interface DetailProps {
  detail: DetailObj;
  handleClick: (id:number, isOpen: boolean) => void;
}

const PhoneDetail = ({detail, handleClick}: DetailProps) => {
  const phoneDetail = usePhoneStore((state) => state.filterData[detail.id - 1]);
  const test = "after:content-[''] after:absolute after:left-1/3 after:top-1/2 after:-translate-y-1/2 after:border-l-[7px] after:border-y-[7px] after:border-solid after:border-y-transparent after:border-l-black";
  return (
    <article className={`flex justify-end fixed top-0 right-0 ${detail.isOpen ? 'w-screen' : 'w-0'} h-screen z-10`}>
      <div className={`relative ${detail.isOpen ? 'w-[93vw]' : 'w-0'} h-full bg-slate-50 z-[12]`}>
        {phoneDetail ?
        <>
          <div className='w-[350px] h-[250px] bg-slate-300'></div>
          <p>{phoneDetail.brands}</p>
          <p>{phoneDetail.model}</p>
          <p>{phoneDetail.os}</p>
          <p>{phoneDetail.ram}</p>
          <p>{phoneDetail.storage}</p>
          <p>{phoneDetail.battery}</p>
          <p>{phoneDetail.screen}</p>
          <p>{phoneDetail.width} X {phoneDetail.height}</p>
        </>
        : null}
        <button className={`absolute top-3 -left-6 rounded-md w-[40px] h-[50px] bg-slate-50 z-20 ${test}`}
          type="button" onClick={() => handleClick(detail.id, !detail.isOpen)}>
          <span className="sr-only">스마트폰 디테일 페이지</span>
        </button>
      </div>
      <div className={`absolute top-0 left-0 ${detail.isOpen ? 'w-screen' : 'w-0'} h-screen bg-slate-400 opacity-50 z-[11]`}></div>
    </article>
  )
}

export default PhoneDetail;