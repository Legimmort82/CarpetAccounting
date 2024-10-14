import { useEffect, useRef } from "react";
type OutsideClick = {
  handler: () => void;
};

export default function useOutsideClick(handler:OutsideClick, listenCapturing = true) {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    function handleClick(e:MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node | null)) {
        handler.handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}
