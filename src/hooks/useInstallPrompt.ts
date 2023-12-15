import { useRef, useEffect, useState } from "react";

export const useInstallPrompt = () => {
  const timeRef = useRef<number>();
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  const handelCloseToInstall = () => {
    setIsOpen(false);
    deferredPrompt?.prompt();
    deferredPrompt?.userChoice.then(() => {
      setDeferredPrompt(null);
    })
  }

  useEffect(() => {
    const isDeviceModel = /Mac|iPhone|iPod|iPad|Firefox/i.test(navigator.userAgent);
    const isOpenToast = () => {
      setIsOpen(true);
      timeRef.current = setTimeout(() => setIsOpen(false), 3000);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      isOpenToast();
    }
    
    if (!isDeviceModel) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    } else {
      isOpenToast();
    }
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      if (timeRef.current) clearTimeout(timeRef.current);
    }
  }, [])

  return { isOpen, deferredPrompt, handelCloseToInstall }
}
