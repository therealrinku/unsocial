import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"} className="flex items-center">
      <p className="tracking-widest	font-bold text-lg">
        <i className="text-[#018e23]">robo</i>social
      </p>
    </Link>
  );
}
