import { Fragment } from "react";

function AdView({ banner }: any) {
  return (
    <Fragment>
      <div className="banner text-sm text-white flex items-center z-50 justify-center fixed w-full h-[30px] bg-gradient-to-r from-[#EE323D] to-[#0f9b0f] top-[50px]">
        {/*@ts-ignore*/}
        <p className="text-center">{banner.bannerText}</p>
        {banner.bannerLink && (
          <a target="_blank" className="text-xs underline mx-3" href={banner.bannerLink}>
            {banner.bannerLinkTitle}
          </a>
        )}
      </div>
    </Fragment>
  );
}

export default AdView;
