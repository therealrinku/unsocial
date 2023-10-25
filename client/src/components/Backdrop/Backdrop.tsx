type BackdropTypes = { show: boolean; toggle: () => void };

const Backdrop = ({ show, toggle }: BackdropTypes) => {
  return <div className="fixed top-0 left-0 w-full h-screen z-30 bg-black bg-opacity-70" onClick={toggle}></div>;
};

export default Backdrop;
