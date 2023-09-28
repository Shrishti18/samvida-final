import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../button/button";
import { message } from "antd";
import "./Header.css"; // Import your custom CSS file for styling

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to="/">
            <svg
              width="184"
              height="56"
              viewBox="0 0 184 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.128 13.976C37.7013 13.9333 37.4453 12.376 37.36 9.304C37.5307 8.45066 37.872 7.34133 38.384 5.976C38.896 4.568 39.6213 2.92533 40.56 1.048C40.816 0.962664 41.008 0.919998 41.136 0.919998C41.904 0.919998 42.288 1.70933 42.288 3.288C41.8613 3.97066 41.4347 4.67466 41.008 5.4C40.5813 6.08267 40.176 6.76533 39.792 7.448C38.64 9.66666 38.0853 11.8427 38.128 13.976ZM20.144 55.96C13.616 55.96 8.56 54.4027 4.976 51.288C2.032 48.6427 0.56 45.272 0.56 41.176C0.56 36.568 2.45867 32.8133 6.256 29.912C9.66933 27.2667 13.5733 25.9227 17.968 25.88C21.6373 25.88 24.5173 26.8187 26.608 28.696C28.4427 30.4027 29.36 32.4933 29.36 34.968C29.36 37.4853 28.464 39.64 26.672 41.432C24.624 43.3947 22.0213 44.376 18.864 44.376C18.48 44.376 18.288 44.312 18.288 44.184C18.288 43.928 18.48 43.7787 18.864 43.736C20.2293 43.4373 21.4453 43.0107 22.512 42.456C23.6213 41.9013 24.56 41.176 25.328 40.28C26.7787 38.7013 27.504 36.8667 27.504 34.776C27.504 32.472 26.672 30.5947 25.008 29.144C23.3013 27.5653 21.04 26.776 18.224 26.776C14.384 26.776 11.0133 28.0347 8.112 30.552C4.95467 33.1973 3.376 36.568 3.376 40.664C3.376 44.6747 4.592 47.896 7.024 50.328C9.84 53.3147 14.064 54.808 19.696 54.808C25.2 54.808 29.808 53.1653 33.52 49.88C37.5733 46.3813 39.6 41.9653 39.6 36.632C39.6 32.7493 38.1067 29.0587 35.12 25.56L28.144 18.392C26.864 17.0693 25.9253 15.768 25.328 14.488C24.7733 13.1653 24.496 11.9067 24.496 10.712C24.496 8.06667 25.52 5.95467 27.568 4.376C29.5307 2.79733 31.8133 2.008 34.416 2.008C35.44 2.008 36.464 2.15733 37.488 2.456C38.512 2.75467 39.024 3.11733 39.024 3.544C39.024 3.75733 38.896 3.864 38.64 3.864C38.512 3.864 38 3.672 37.104 3.288C36.3787 2.98933 35.632 2.84 34.864 2.84C32.944 2.84 31.2373 3.544 29.744 4.952C28.2933 6.40267 27.568 8.06666 27.568 9.944C27.568 12.0773 28.5707 14.2107 30.576 16.344L37.104 22.424C39.1947 24.344 40.7307 26.4347 41.712 28.696C42.736 30.9147 43.248 33.2613 43.248 35.736C43.248 41.4533 40.7947 46.3173 35.888 50.328C31.28 54.0827 26.032 55.96 20.144 55.96ZM35.568 34.968C35.3547 35.0533 35.248 34.9253 35.248 34.584C34.9493 32.4933 34.096 30.36 32.688 28.184C32.6027 28.824 32.4747 29.5493 32.304 30.36C31.4933 30.488 30.768 30.2107 30.128 29.528C30.0427 29.4 29.936 29.208 29.808 28.952C29.7227 28.696 29.68 28.3973 29.68 28.056V27.608C29.68 27.1387 29.744 26.8187 29.872 26.648C30.768 27.288 31.5147 27.544 32.112 27.416C31.1307 26.008 30 24.728 28.72 23.576C27.44 22.3813 26.0533 21.3147 24.56 20.376C21.4453 18.4987 18.6933 17.56 16.304 17.56C13.744 17.56 11.9733 18.6267 10.992 20.76C11.4613 20.4187 11.9307 20.248 12.4 20.248C12.912 20.248 13.4027 20.3973 13.872 20.696C14.7253 21.2933 15.1307 21.976 15.088 22.744C14.5333 22.488 13.936 22.36 13.296 22.36C12.1013 22.36 11.2267 22.872 10.672 23.896C10.2027 23.1707 9.968 22.552 9.968 22.04C9.968 21.4 10.2667 20.6107 10.864 19.672C12.1013 17.624 14.0213 16.6 16.624 16.6C20.5067 16.6 24.5173 18.52 28.656 22.36C30.7893 24.2373 32.5173 26.1787 33.84 28.184C35.1627 30.1467 35.824 32.1947 35.824 34.328V34.52C35.824 34.7333 35.7387 34.8827 35.568 34.968ZM51.008 47.384C49.2587 47.384 48.384 46.5307 48.384 44.824C48.384 43.2027 49.5573 40.9413 51.904 38.04C54.0373 35.352 55.8933 33.496 57.472 32.472C59.0507 31.448 60.5227 30.936 61.888 30.936C63.5093 30.936 64.32 31.4053 64.32 32.344C64.32 32.5573 64.1067 32.8773 63.68 33.304C63.2533 33.688 63.0187 33.9227 62.976 34.008C62.1653 35.3307 61.76 38.0187 61.76 42.072C61.76 44.4187 62.272 45.592 63.296 45.592C64.2347 45.592 65.3227 45.0373 66.56 43.928C67.7973 42.8187 68.9493 41.5813 70.016 40.216C70.144 40.088 70.2507 40.024 70.336 40.024C70.5067 40.024 70.592 40.1307 70.592 40.344C70.592 40.4293 70.5493 40.5787 70.464 40.792C70.4213 41.0053 70.3573 41.176 70.272 41.304C68.5227 43.6507 67.008 45.2293 65.728 46.04C64.4907 46.8507 63.2747 47.256 62.08 47.256C60.16 47.256 59.2213 45.208 59.264 41.112C58.4533 42.5627 57.28 43.928 55.744 45.208C53.952 46.6587 52.3733 47.384 51.008 47.384ZM52.736 45.656C53.4613 45.656 54.2293 45.3573 55.04 44.76C57.5573 42.7547 59.2 39 59.968 33.496C59.84 33.496 59.7547 33.4747 59.712 33.432C58.8587 33.432 57.728 33.944 56.32 34.968C55.1253 35.7787 54.1653 36.6533 53.44 37.592C51.7333 39.8107 50.88 41.7307 50.88 43.352C50.88 44.888 51.4987 45.656 52.736 45.656ZM79.5915 47.96C79.2075 47.96 78.9088 47.64 78.6955 47V45.784C78.6955 40.4933 78.0128 37.848 76.6475 37.848C75.7515 37.848 74.3862 39.2987 72.5515 42.2C72.0395 42.968 71.5275 43.736 71.0155 44.504C70.5462 45.272 70.0768 46.04 69.6075 46.808C69.3515 46.8933 69.1595 46.936 69.0315 46.936C68.6048 46.936 68.3915 46.616 68.3915 45.976V45.784L69.1595 43.224C70.0555 40.536 70.7168 38.4027 71.1435 36.824C71.5702 35.2027 71.7835 34.136 71.7835 33.624C71.7835 33.4533 71.7622 33.3467 71.7195 33.304C72.5728 32.536 73.3835 32.152 74.1515 32.152C74.5355 32.152 74.6848 32.2587 74.5995 32.472L73.4475 38.936C73.8742 38.3387 74.7488 37.592 76.0715 36.696C76.7542 36.2267 77.3302 35.8853 77.7995 35.672C78.3115 35.4587 78.7168 35.352 79.0155 35.352C80.3382 35.352 81.0848 38.0187 81.2555 43.352C81.7248 42.4987 82.3435 41.432 83.1115 40.152C83.9222 38.872 84.8608 37.4 85.9275 35.736C86.5248 34.9253 87.1648 34.52 87.8475 34.52C88.4875 34.52 88.8715 34.9253 88.9995 35.736C89.1275 37.4 89.2555 38.9573 89.3835 40.408C89.5115 41.816 89.7888 42.9467 90.2155 43.8C90.6422 44.6533 91.3675 45.1013 92.3915 45.144C93.6715 45.144 94.9302 44.6747 96.1675 43.736C97.4475 42.7547 98.5995 41.5813 99.6235 40.216C99.8368 39.8747 100.05 39.704 100.264 39.704C100.392 39.704 100.456 39.8747 100.456 40.216C100.456 40.3013 100.37 40.4933 100.2 40.792C100.029 41.048 99.9008 41.2187 99.8155 41.304C99.0902 42.3707 98.2368 43.416 97.2555 44.44C96.3168 45.4213 95.3142 46.232 94.2475 46.872C93.1808 47.4693 92.1142 47.768 91.0475 47.768C89.4688 47.768 88.3168 46.9147 87.5915 45.208C86.8662 43.5013 86.4182 41.0907 86.2475 37.976C85.3515 38.7867 84.3915 40.2373 83.3675 42.328C82.7275 43.5227 82.1942 44.5253 81.7675 45.336C81.3408 46.104 81.0208 46.6587 80.8075 47C80.3808 47.64 79.9755 47.96 79.5915 47.96ZM103.714 47.128C101.837 47.128 100.898 45.656 100.898 42.712C100.898 41.304 101.154 39.96 101.666 38.68C101.666 38.68 101.495 38.936 101.154 39.448C100.855 39.96 100.407 40.5787 99.81 41.304C99.7673 41.432 99.618 41.496 99.362 41.496C99.2767 41.496 99.2127 41.432 99.17 41.304C99.1273 41.176 99.106 41.0693 99.106 40.984C99.106 40.856 99.2553 40.6 99.554 40.216C100.493 38.9787 101.303 37.8907 101.986 36.952C102.669 36.0133 103.415 35.1387 104.226 34.328C104.61 33.944 105.037 33.752 105.506 33.752C106.061 33.752 106.338 33.9867 106.338 34.456C106.338 34.3707 106.189 34.6267 105.89 35.224C105.591 35.8213 105.122 36.76 104.482 38.04C103.287 40.6853 102.69 42.6907 102.69 44.056C102.69 45.1653 103.159 45.72 104.098 45.72C104.994 45.72 105.911 45.3147 106.85 44.504C107.789 43.6507 108.621 42.6053 109.346 41.368C110.114 40.1307 110.669 38.9147 111.01 37.72C111.01 37.5493 110.967 37.2933 110.882 36.952C110.839 36.6107 110.775 36.184 110.69 35.672C110.562 34.904 110.498 34.2427 110.498 33.688C110.498 31.8533 111.266 30.6587 112.802 30.104C113.143 29.976 113.399 29.912 113.57 29.912C114.21 29.912 114.53 30.4667 114.53 31.576C114.53 33.4107 113.975 35.3947 112.866 37.528C112.866 39.2773 113.271 40.7493 114.082 41.944C114.935 43.096 115.959 43.672 117.154 43.672C118.007 43.672 118.882 43.3947 119.778 42.84C120.717 42.2853 121.634 41.4107 122.53 40.216C122.615 40.1307 122.743 40.088 122.914 40.088C123.042 40.088 123.106 40.216 123.106 40.472C123.106 40.728 122.999 41.0053 122.786 41.304C122.231 42.072 121.399 42.84 120.29 43.608C119.223 44.3333 118.071 44.696 116.834 44.696C115.639 44.696 114.53 44.2267 113.506 43.288C112.525 42.3067 111.863 41.0267 111.522 39.448C111.351 40.088 111.01 40.856 110.498 41.752C109.986 42.648 109.303 43.544 108.45 44.44C107.511 45.4213 106.637 46.1253 105.826 46.552C105.015 46.936 104.311 47.128 103.714 47.128ZM128.442 27.544C127.93 27.544 127.461 27.3093 127.034 26.84C126.607 26.3707 126.394 25.88 126.394 25.368C126.394 24.1733 127.055 23.576 128.378 23.576C129.658 23.576 130.298 24.1947 130.298 25.432C130.298 26.84 129.679 27.544 128.442 27.544ZM127.61 47.512C126.159 47.512 124.943 47.0213 123.962 46.04C123.023 45.016 122.554 43.544 122.554 41.624C122.554 39.2773 123.194 36.888 124.474 34.456C124.943 33.56 125.754 33.112 126.906 33.112C127.589 33.112 127.93 33.3253 127.93 33.752C127.93 33.88 127.866 34.072 127.738 34.328C126.245 37.1867 125.498 39.64 125.498 41.688C125.498 43.1813 125.754 44.2693 126.266 44.952C126.821 45.6347 127.567 45.976 128.506 45.976C129.999 45.976 131.493 45.4213 132.986 44.312C134.479 43.16 135.93 41.7733 137.338 40.152C137.466 39.9387 137.658 39.832 137.914 39.832C138.085 39.832 138.17 39.9173 138.17 40.088C138.17 40.216 138.085 40.408 137.914 40.664C137.786 40.8773 137.658 41.0907 137.53 41.304C136.975 42.0293 136.314 42.776 135.546 43.544C134.778 44.312 133.882 45.0373 132.858 45.72C132.047 46.2747 131.173 46.7013 130.234 47C129.338 47.3413 128.463 47.512 127.61 47.512ZM138.776 47.32C136.899 47.32 135.96 46.2747 135.96 44.184C135.96 41.6667 137.688 39.064 141.144 36.376C144.344 33.8587 147.309 32.6 150.04 32.6C150.168 32.6 150.317 32.6213 150.488 32.664C150.701 32.7067 150.872 32.728 151 32.728C151.085 32.728 151.32 32.152 151.704 31L156.824 16.664C157.123 15.8533 157.485 14.872 157.912 13.72C158.339 12.568 158.872 11.2453 159.512 9.752C159.896 9.02666 160.173 8.664 160.344 8.664C161.325 8.664 161.816 9.09066 161.816 9.944C161.816 10.5413 161.624 11.48 161.24 12.76C160.899 14.04 160.344 15.64 159.576 17.56L156.504 25.304C155.779 27.1813 155.139 28.9733 154.584 30.68C154.072 32.344 153.624 33.9013 153.24 35.352C152.813 36.888 152.6 38.744 152.6 40.92C152.6 44.3333 153.411 46.04 155.032 46.04C156.013 46.04 157.123 45.6347 158.36 44.824C159.64 44.0133 161.155 42.4773 162.904 40.216C162.989 40.1307 163.117 39.9813 163.288 39.768C163.501 39.5547 163.629 39.448 163.672 39.448C163.8 39.448 163.864 39.5333 163.864 39.704C163.864 39.96 163.8 40.2373 163.672 40.536C163.544 40.792 163.373 41.048 163.16 41.304C161.581 43.5227 160.045 45.08 158.552 45.976C157.059 46.8293 155.651 47.256 154.328 47.256C151.299 47.256 149.741 44.3333 149.656 38.488C149.357 39.1707 148.781 39.96 147.928 40.856C147.117 41.7093 146.072 42.6907 144.792 43.8C142.061 46.1467 140.056 47.32 138.776 47.32ZM140.376 45.08C141.613 45.08 143.171 44.1413 145.048 42.264C145.773 41.5387 146.413 40.8347 146.968 40.152C147.565 39.4267 148.141 38.68 148.696 37.912C149.123 37.1867 149.507 36.504 149.848 35.864C150.189 35.1813 150.467 34.52 150.68 33.88C150.509 33.8373 150.317 33.816 150.104 33.816C149.891 33.7733 149.635 33.752 149.336 33.752C145.453 33.752 142.317 35.9067 139.928 40.216C139.203 41.4107 138.84 42.4987 138.84 43.48C138.84 44.5467 139.352 45.08 140.376 45.08ZM163.633 47.384C161.884 47.384 161.009 46.5307 161.009 44.824C161.009 43.2027 162.182 40.9413 164.529 38.04C166.662 35.352 168.518 33.496 170.097 32.472C171.676 31.448 173.148 30.936 174.513 30.936C176.134 30.936 176.945 31.4053 176.945 32.344C176.945 32.5573 176.732 32.8773 176.305 33.304C175.878 33.688 175.644 33.9227 175.601 34.008C174.79 35.3307 174.385 38.0187 174.385 42.072C174.385 44.4187 174.897 45.592 175.921 45.592C176.86 45.592 177.948 45.0373 179.185 43.928C180.422 42.8187 181.574 41.5813 182.641 40.216C182.769 40.088 182.876 40.024 182.961 40.024C183.132 40.024 183.217 40.1307 183.217 40.344C183.217 40.4293 183.174 40.5787 183.089 40.792C183.046 41.0053 182.982 41.176 182.897 41.304C181.148 43.6507 179.633 45.2293 178.353 46.04C177.116 46.8507 175.9 47.256 174.705 47.256C172.785 47.256 171.846 45.208 171.889 41.112C171.078 42.5627 169.905 43.928 168.369 45.208C166.577 46.6587 164.998 47.384 163.633 47.384ZM165.361 45.656C166.086 45.656 166.854 45.3573 167.665 44.76C170.182 42.7547 171.825 39 172.593 33.496C172.465 33.496 172.38 33.4747 172.337 33.432C171.484 33.432 170.353 33.944 168.945 34.968C167.75 35.7787 166.79 36.6533 166.065 37.592C164.358 39.8107 163.505 41.7307 163.505 43.352C163.505 44.888 164.124 45.656 165.361 45.656Z"
                fill="url(#paint0_linear_411_5)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_411_5"
                  x1="28.6276"
                  y1="-9.75325"
                  x2="185.453"
                  y2="9.37862"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#0B2E1C" />
                  <stop offset="1" stop-color="#87CF27" />
                </linearGradient>
              </defs>
            </svg>
          </Link>
          {loginUser && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <p className="nav-link name-nav">{loginUser.name}</p>
              </li>
              {loginUser.role === "farmer" && (
                <>
                  <li className="nav-item">
                    <Link to="/farmer/farmer-dashboard" className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/farmer/farmer-maxprofit" className="nav-link">
                      MaxProfit
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/farmer/farmer-profile" className="nav-link">
                      Profile
                    </Link>
                  </li>
                </>
              )}
              {loginUser.role === "company" && (
                <>
                  <li className="nav-item">
                    <Link to="/company" className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/company/company-profile" className="nav-link">
                      Profile
                    </Link>
                  </li>
                  {/* Add more company-specific links here */}
                </>
              )}

              <li className="nav-item">
                <Button buttonStyle="btn-normal" onClick={logoutHandler}>
                  Logout
                </Button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;