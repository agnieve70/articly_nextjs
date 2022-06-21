import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import Image from "next/image";

function MainNavigation() {
  const [session, loading] = useSession();

  function logoutHandler() {
    signOut();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 py-3 mb-2">
      <div className="container-fluid">
        <Link href="/auth">
          <a className="navbar-brand">
            <Image src={"/banner.png"} width={150} height={70} />
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {session && session.user.role === "admin" && (
              <li className="nav-item">
                <Link href="/auth/users">
                  <a aria-current="page" className="nav-link fs-5">
                    Users
                  </a>
                </Link>
              </li>
            )}
            {session && (
              <li className="nav-item">
                <Link href="/auth/profile">
                  <a aria-current="page" className="nav-link fs-5">
                    {session.user.role === "admin" ? "Map" : "Profile"}
                  </a>
                </Link>
              </li>
            )}
            {session && (
              <li className="nav-item">
                <a
                  href="#"
                  onClick={logoutHandler}
                  aria-current="page"
                  className="nav-link fs-5"
                >
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MainNavigation;
