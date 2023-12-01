import { useEffect, useRef } from "react"
import { usePhoneStore } from "../states/stores";

export const useScrollPage = () => {
  const {pages, setNextPage} = usePhoneStore((state)=> ({pages: state.pages, setNextPage: state.setNextPage}))
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref || !ref.current) return;
    
    const isObserver = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (pages.page !== pages.totalPage && entry.isIntersecting && entry.intersectionRatio > 0) {
          observer.unobserve(entry.target);
          setNextPage();
        }
      })
    }

    const options = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: [0, 1]
    }

    const observer = new IntersectionObserver(isObserver, options);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    }
  }, [pages.page, pages.totalPage, setNextPage])
  return {ref};
}