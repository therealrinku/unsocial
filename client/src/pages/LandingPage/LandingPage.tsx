import { useState } from "react";
import MainImage from "../../assets/main.jpg";
import Register from "../../components/Register";
import Login from "../../components/Login";

const Landingpage = () => {
  const [mode, setMode] = useState("login");

  return (
    <div className="flex flex-col flex-col-reverse md:flex-row gap-10">
      <section className="w-[100%] md:w-[50%]">
        <img src={MainImage} className="h-screen	 w-full object-cover" />
      </section>

      <section className="w-[100%] md:w-[50%]">
        <div className="w-[85%] md:w-[70%] mx-auto mt-10 md:mt-24">
          {mode === "login" ? <Login /> : <Register />}
          <button className="text-sm mt-5" onClick={() => setMode(mode === "login" ? "signup" : "login")}>
            <p>{mode === "signup" ? "Already have an account? Login" : "Don't have an account? Register"} </p>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Landingpage;
