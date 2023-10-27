import RecommendedSideview from "../RecommendedSideview";

export default function TwoColumnLayout({ component1, component2 }: any) {
  return (
    <div className="w-full lg:w-[85%] mb-10 xl:w-[75%] mt-[50px] md:mt-20 mx-auto flex justify-center gap-24">
      <section className="w-full md:w-[75%] lg:w-[70%] xl:w-[55%]">{component1()}</section>

      <div className="hidden  lg:block lg:w-[35%] xl:w-[30%] sticky top-[80px] h-[300px]">
        {component2 ? component2() : <RecommendedSideview />}
      </div>
    </div>
  );
}
