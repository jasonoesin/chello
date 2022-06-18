import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const Navbar = () => {
  const nav = useNavigate();
  // React.useEffect(() => {
  //   window.onclick = function (event) {
  //     if (!event.target.matches("#dropdown")) {
  //       var dropdowns = document.getElementById("dropdown-menu");
  //       if (!dropdowns.classList.contains("hidden")) {
  //         console.log("NO");
  //         dropdowns.classList.add("hidden");
  //       }
  //     }
  //   };
  // });

  function func() {
    document.getElementById("dropdown-menu").classList.toggle("hidden");
  }

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 border-b">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            CHello
          </span>
        </a>
        <div className="flex items-center md:order-2 mr-12">
          <button
            type="button"
            className="dropdown dropdown-toggle flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="dropdown"
            aria-expanded="false"
            data-dropdown-toggle="dropdown"
            onClick={func}
            // onBlur={closeDropdown}
          >
            <img
              className="w-8 h-8 rounded-full"
              src="https://i.picsum.photos/id/66/200/200.jpg?hmac=gaKXe-rWmo5fSEm79TTkW_yFJLECw3FdRCh6Dm7jp4g"
              alt="user photo"
            />
          </button>
        </div>
        <div
          className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1 mr-5"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <a
                href="/home"
                className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Workspaces
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Services
              </a>
            </li>
            <li>
              <Link
                to="/register"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Register (T)
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Login (T)
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="mr-12 hidden w-64 absolute z-50 my-4 right-4 text-base list-none bg-white border rounded divide-y divide-gray-100 drop-shadow-xl dark:divide-gray-600"
        id="dropdown-menu"
      >
        <div className="py-3 px-4">
          <span className="block text-sm text-gray-900 dark:text-white">
            Name
          </span>
          <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
            name@gmail.com
          </span>
        </div>
        <ul className="py-1" aria-labelledby="dropdown">
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <Link
              to="/settings"
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Settings
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
          <li>
            <button
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    console.log("Signed Out");
                    nav("/");
                  })
                  .catch((error) => {});
              }}
              className="w-full text-left block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
