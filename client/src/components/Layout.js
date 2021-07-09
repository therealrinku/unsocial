import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div>
      <Topbar />
      <Sidebar />
      <section>{children}</section>
    </div>
  );
}
