import { useRef } from 'react';
import { usePhoneStore } from '../states/stores';
import { useRender } from '../hooks/useRender';

type DetailObj = {
  id: number,
  isOpen: boolean
}

interface DetailProps {
  detail: DetailObj;
  handleClick: (id:number, isOpen: boolean) => void;
}

const PhoneDetail = ({detail, handleClick}: DetailProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useRender(detail.isOpen, canvasRef, 'src/assets/001.glb');
  const phoneDetail = usePhoneStore((state) => state.filterData[detail.id - 1]);
  const afterStyle = "after:content-[''] after:absolute after:left-1/3 after:top-1/2 after:-translate-y-1/2 after:border-r-[7px] after:border-y-[7px] after:border-solid after:border-y-transparent after:border-r-black";

  return (
    <article className={`flex justify-end fixed top-0 right-0 ${detail.isOpen ? 'w-screen' : 'w-0'} h-screen z-10`}>
      <div className={`${detail.isOpen ? 'w-[93vw] p-10' : 'w-0'} relative h-screen bg-slate-50 z-[12]`}>
        <div className='grid grid-rows-[minmax(250px,_1fr)_250px] w-full h-full gap-6 overflow-y-auto'>
          <canvas ref={canvasRef} width={250} height={250} />
          <div className='flex flex-col gap-2 w-full'>
            <span>{"브랜드 : "}{phoneDetail ? `${phoneDetail.brands}` : ''}</span>
            <span>{"모델 : "}{phoneDetail ? `${phoneDetail.model}` : ''}</span>
            <span>{"OS : " }{phoneDetail ? `${phoneDetail.os}` : ''}</span>
            <span>{"RAM : "}{phoneDetail ? `${phoneDetail.ram} GB` : ''}</span>
            <span>{"저장소 : "}{phoneDetail ? `${phoneDetail.storage} GB` : ''}</span>
            <span>{"배터리 : "}{phoneDetail ? `${phoneDetail.battery} mAh` : ''}</span>
            <span>{"스크린 : "}{phoneDetail ? `${phoneDetail.screen} in` : ''}</span>
            <span>{"해상도 : "}{phoneDetail ? `${phoneDetail.width} X ${phoneDetail.height}` : ''}</span>
          </div>
        </div>
        <button className={`absolute top-3 -left-6 rounded-md w-[40px] h-[50px] bg-slate-50 z-20 ${afterStyle}`}
          type="button" onClick={() => handleClick(detail.id, !detail.isOpen)}>
          <span className="sr-only">스마트폰 디테일 페이지</span>
        </button>
      </div>
      <div className={`absolute top-0 left-0 ${detail.isOpen ? 'w-screen' : 'w-0'} h-screen bg-slate-400 opacity-50 z-[11]`}></div>
    </article>
  )
}

export default PhoneDetail;