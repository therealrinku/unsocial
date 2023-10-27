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
    <div
      className={`${
        fullPage ? "z-10 top-0 fixed h-full w-full bg-white" : "mt-3"
      } flex flex-col justify-center items-center mx-auto`}
    >
      <div className="w-[200px] bg-[#f0f2f5] h-[12px]">
        <div style={{ width: loaderWidth }} className="bg-[#018e23] h-full"></div>
      </div>
    </div>
  );
}
