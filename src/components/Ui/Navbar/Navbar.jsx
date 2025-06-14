import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../../../config/firebase.init";
import useAdmin from "../../../hooks/useAdmin";
import useWorker from "../../../hooks/useWorker";

const Navbar = () => {
  // get user info from firebase
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [worker] = useWorker(user);

  const menus = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/all-jobs">All Job</Link>
      </li>

      {!user ||
        (!admin && !worker && (
          <>
            <li>
              <Link to="/messages">Messages</Link>
            </li>
            <li>
              <Link to="/send-job-request">Send Job Request</Link>
            </li>
            <li>
              <Link to="/my-orders">My Orders</Link>
            </li>
            <li>
              <Link to="/carts">My Cart</Link>
            </li>
          </>
        ))}
    </>
  );

  return (
    <>
      <div className="navbar bg-white px-10">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menus}
            </ul>
          </div>
          <Link
            to="/"
            className="normal-case text-4xl font-semibold text-rose-500"
          >
            SROM
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menus}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div className="flex items-center gap-1 text-end">
                <div>
                  <p className="text-xs font-semibold">{user?.displayName}</p>
                  <p className="text-xs ">{user?.email}</p>
                </div>

                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL} />
                  </div>
                </label>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] py-3 px-2 space-y-1 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="justify-between">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a onClick={() => signOut(auth)} className="">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <Link
                to="/login"
                className="btn hover:bg-slate-500 hover:text-white"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
