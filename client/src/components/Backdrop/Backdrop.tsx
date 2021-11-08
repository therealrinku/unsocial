type BackdropTypes = { show: boolean; toggle: any };

const Backdrop = ({ show, toggle }: BackdropTypes) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "rgba(0,0,0,0.7)",
        zIndex: 4,
      }}
      onClick={toggle}
    ></div>
  );
};

export default Backdrop;
