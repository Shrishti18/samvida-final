import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "./Login.css";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const roleDashboardPath = {
  //     farmer: "/farmer",
  //     company: "/company",
  //     entrepreneur: "/entrepreneur"
  //     // Add more role paths as needed
  //   };
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );

      const userRole = data.user.role;
      console.log(userRole);
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <section>
        <div className="content">
          <div className="rightSide">
            <div class="title">
              <h2> Welcome to Samvida </h2>{" "}
            </div>{" "}
            <div className="form register-page ">
              {" "}
              {loading && <Spinner />}{" "}
              <Form layout="vertical" onFinish={submitHandler}>
                <Form.Item label="Email" name="email">
                  <Input type="email" />
                </Form.Item>{" "}
                <Form.Item label="Password" name="password">
                  <Input type="password" />
                </Form.Item>{" "}
                <div className="registerBtn">
                <Link to="/register">
                  {" "}
                  Not a user ? Click Here to register{" "}
                </Link>{" "}
                </div>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary"> Login </button>{" "}
                </div>{" "}
              </Form>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </>
  );
};

export default Login;

// import React, { useState, useEffect } from "react";
// import { Form, Input } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Spinner from "../components/Spinner";
// import "./Login.css";
// import { login } from "../actions/userActions.js";
// const Login = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Redux state
//   const userLogin = useSelector((state) => state.userLogin);
//   const { loading: loginLoading, error } = userLogin;

//   const submitHandler = async (values) => {
//     setLoading(true);
//     dispatch(login(values.email, values.password));
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (localStorage.getItem("user")) {
//         console.log("ji")
//       navigate("/");
//     }
//   }, [navigate]);

//   return (
//     <section>
//       <div className="content">
//         <div className="left">
//           <h1>SAMVIDA</h1>
//         </div>
//         <div className="right">
//           <div class="title">
//             <h2>Welcome to Samvida</h2>
//           </div>
//           <div className="register-page ">
//             {loading || loginLoading ? <Spinner /> : null}
//             {error && <div className="error-message">{error}</div>}
//             <Form layout="vertical" onFinish={submitHandler}>
//               <Form.Item label="Email" name="email">
//                 <Input type="email" />
//               </Form.Item>
//               <Form.Item label="Password" name="password">
//                 <Input type="password" />
//               </Form.Item>
//               <Link to="/register">Not a user? Click Here to register</Link>
//               <div className="d-flex justify-content-between">
//                 <button className="btn btn-primary" type="submit">
//                   Login
//                 </button>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;
