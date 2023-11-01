import { Fragment } from "react";
import { FiX } from "react-icons/fi";

function AdView({ banner, onCancel }: any) {
  return (
    <Fragment>
      <div
        className={`flex items-center banner text-sm text-white flex items-center z-40 justify-center fixed w-full h-[30px] ${banner.bgClassName} top-[50px]`}
      >
        {/*@ts-ignore*/}
        <p className="text-center">{banner.bannerText}</p>
        {banner.bannerLink && (
          <a target="_blank" className="text-xs font-bold underline mx-3" href={banner.bannerLink}>
            {banner.bannerLinkTitle}
          </a>
        )}

        {banner.closeable && (
          <button onClick={onCancel} className="absolute right-10">
            <FiX size={20} />
          </button>
        )}
      </div>
    </Fragment>
  );
}

export default AdView;
