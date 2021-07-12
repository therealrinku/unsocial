import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Recommended from "./Recommended";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Topbar />
      <Sidebar />
      <div className="flex">
        <section className="layout-main">{children}</section>
        <section className="for-pc">
          <Recommended />
        </section>
      </div>
    </div>
  );
}
