import { FiArrowLeft } from "react-icons/all";
import { Link, useHistory } from "react-router-dom";

export default function Topbar() {
  const history = useHistory();

  return (
    <div className="topbar">
      <section>
        <button onClick={() => history.goBack()}>
          <FiArrowLeft />
        </button>
        <Link to="/">Groovy</Link>
      </section>
    </div>
  );
}
