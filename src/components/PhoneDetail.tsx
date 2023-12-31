import { useRef } from 'react';
import { usePhoneStore } from '../states/stores';
import { useRender } from '../hooks/useRender';

type DetailObj = {
  id: number,
  isOpen: boolean
}

interface DetailProps {
  detail: DetailObj;
  handleClick: (id: number, isOpen: boolean) => void;
}

const PhoneDetail = ({ detail, handleClick }: DetailProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phoneDetail = usePhoneStore((state) => state.setDetail(detail.id));
  useRender(detail.isOpen, canvasRef, `${phoneDetail ? phoneDetail.modeling : '001.glb'}`);
  const afterStyle = "after:content-[''] after:absolute after:left-1/3 after:top-1/2 after:-translate-y-1/2 after:border-r-[7px] after:border-y-[7px] after:border-solid after:border-y-transparent after:border-r-black";
  return (
    <article className={`flex justify-end fixed top-0 right-0 ${detail.isOpen ? 'w-screen' : 'w-0'} h-full z-10`}>
      <div className={`${detail.isOpen ? 'w-[93vw] p-10 lg:w-[58vw]' : 'w-0'} relative h-full bg-slate-50 z-[12]`}>
        <div className='flex flex-col portrait:justify-center items-center gap-6 w-full h-full overflow-y-auto'>
          <canvas ref={canvasRef} className='w-[250px] h-[250px] md:w-[500px] md:h-[350px]' />
          <div className='flex flex-col items-start gap-2 w-full max-w-fit font-bold md:text-lg'>
            <span>{"브랜드 : "}{phoneDetail ? `${phoneDetail.brands}` : ''}</span>
            <span>{"모델 : "}{phoneDetail ? `${phoneDetail.model}` : ''}</span>
            <span>{"OS : "}{phoneDetail ? `${phoneDetail.os}` : ''}</span>
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