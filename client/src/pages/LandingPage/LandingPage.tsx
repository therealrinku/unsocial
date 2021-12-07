import Logo from "../../components/Logo";
import styles from "./LandingPage.module.scss";
import { GrConnect, GrShareOption, GrDocument,GrActions } from "react-icons/gr";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Landingpage = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();

  return (
    <div className={styles.LandingPage}>
      <section>
        <Logo />
        <div>
          <span>
            <GrConnect />
            <p>Connect with your friends.</p>
          </span>
          <span>
            <GrShareOption />
            <p>Share your photos with your friends.</p>
          </span>
          <span>
            <GrActions />
            <p>And many more.</p>
          </span>
        </div>
      </section>

      <section>
        <div>
          <input
            type="text"
            placeholder="Type your email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={() => history.push(`/register?email=${email.trim()}`)}
          >
            Join Now
          </button>
          <button onClick={() => history.push("/login")}>Login</button>
        </div>
      </section>
    </div>
  );
};

export default Landingpage;
