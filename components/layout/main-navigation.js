import Link from "next/link";
import { useSession } from "next-auth/client";
import Image from 'next/image';

function MainNavigation() {
    const [session, loading] = useSession();

  
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary px-3 py-3 mb-2"
      id="main-nav"
    >
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">
            <Image src={'/banner.png'} width={150} height={70} />
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
              <li className="nav-item">
                <Link href="/">
                  <a aria-current="page" className="nav-link fs-5">
                    Articles
                  </a>
                </Link>
              </li>
            {!session && !loading && (
              <li className="nav-item">
                <Link href="/auth">
                  <a aria-current="page" className="nav-link fs-5">
                    Login
                  </a>
                </Link>
              </li>
            )}
            {session && !loading && (
              <li className="nav-item">
                <Link href="/auth/profile">
                  <a className="nav-link fs-5">
                    My Article
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MainNavigation