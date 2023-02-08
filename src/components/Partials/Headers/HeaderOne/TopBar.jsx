import { Link } from "react-router-dom";
import { useUserContext } from "../../../../data/user_context";
import Arrow from "../../../Helpers/icons/Arrow";
import Selectbox from "../../../Helpers/Selectbox";

export default function TopBar({ className }) {

  const { loginWithRedirect, myUser, logout } = useUserContext();

  return (
    <>
      <div
        className={`w-full bg-white h-10 border-b border-qgray-border ${className || ""
          }`}
      >
        <div className="container-x mx-auto h-full">
          <div className="flex justify-between items-center h-full">
            <div className="topbar-nav">
              <ul className="flex space-x-6">
                {myUser ? <li className="cursor-pointer" onClick={() => logout({ returnTo: window.location.origin })}>Welcome {myUser.given_name}, Logout</li> : (
                  <li className="cursor-pointer" onClick={loginWithRedirect}>

                    <span className="text-xs leading-6 text-qblack font-500">
                      Login
                    </span>

                  </li>
                )}

                <li>
                  <Link to="/tracking-order">
                    <span className="text-xs leading-6 text-qblack font-500">
                      Track Order
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/faq">
                    <span className="text-xs leading-6 text-qblack font-500">
                      Support
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="topbar-dropdowns sm:block hidden">
              <div className="flex space-x-6">
                <div className="country-select flex space-x-1 items-center">
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/country-logo-16x16.png`}
                      width="16"
                      height="16"
                      alt="country logo"
                      className="overflow-hidden rounded-full"
                    />
                  </div>
                  <Selectbox
                    className="w-fit"
                    datas={["United States", "NIgeria", "London"]}
                  />
                  <div>
                    <Arrow className="fill-current qblack" />
                  </div>
                </div>
                <div className="currency-select flex space-x-1 items-center">
                  <Selectbox className="w-fit" datas={["NGN", "USD"]} />
                  <Arrow className="fill-current qblack" />
                </div>
                <div className="language-select flex space-x-1 items-center">
                  <Selectbox className="w-fit" datas={["Nigeria", "USA"]} />
                  <Arrow className="fill-current qblack" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
