// import { useEffect, useRef, useState } from 'react';
import { useInstallPrompt } from "../hooks/useInstallPrompt";

const Toast = () => {
  const { isOpen, deferredPrompt, handelCloseToInstall } = useInstallPrompt();

  const isPrompt = (
    <>
      <p className='text-white'>설치를 통해 앱으로</p>
      <p className='text-white'> 사용할 수 있습니다.</p>
      <button type='button' className='bg-transparent text-cyan-300' onClick={handelCloseToInstall}>App 설치</button>
    </>
  )
  const isNotPrompt = (
    <>
      <p className='text-white'>홈 화면 추가를 통해</p>
      <p className='text-white'>앱으로 사용할 수 있습니다.</p>
    </>
  )

  return (
    <div className={`fixed w-[250px] h-24 ${isOpen ? "top-2" : "-top-28" } left-1/2 -translate-x-1/2 bg-cyan-900 rounded-xl z-20`}>
      <div className='flex flex-row h-full items-center justify-evenly'>
        <img className='rounded-2xl' src='/icons/iconX48.png' alt='smartphone data' />
        <div className='flex flex-col justify-center gap-1 text-sm'>
          {deferredPrompt ? isPrompt : isNotPrompt} 
        </div>
      </div>
    </div>
  )
}

export default Toast;