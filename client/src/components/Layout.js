import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Recommended from "./Recommended";
import SearchView from "./SearchView";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Topbar />
      <Sidebar />
      <div className="flex">
        <section className="layout-main">{children}</section>
        <section className="recommended-users">
          <SearchView />
          <Recommended />
        </section>
      </div>
    </div>
  );
}
