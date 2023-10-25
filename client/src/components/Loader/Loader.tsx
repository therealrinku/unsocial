import { useEffect, useState } from "react";

type LoaderTypes = {
  fullPage?: boolean;
};

export default function Loader({ fullPage }: LoaderTypes) {
  const [loaderWidth, setLoaderWidth] = useState(0);

  useEffect(() => {
    let width = loaderWidth;
    const timer = setInterval(() => {
      width += 20;
      setLoaderWidth(width);

      if (width >= 200) clearInterval(timer);
    }, 500);
  }, []);

  return (
    <div className="z-10 top-0 fixed h-full w-full bg-white flex flex-col justify-center items-center">
      <div className="w-[200px] bg-[#f0f2f5] h-[10px]">
        <div style={{ width: loaderWidth }} className="bg-[#EE323D] h-full"></div>
      </div>
    </div>
  );
}
