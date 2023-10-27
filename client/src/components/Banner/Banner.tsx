import { Fragment } from "react";

function AdView({ banner }: any) {
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
      </div>
    </Fragment>
  );
}

export default AdView;
