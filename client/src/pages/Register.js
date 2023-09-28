import React, { useState, useEffect } from "react";
import { Form, Input, message,Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "./Register.css"
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/register", values);
      message.success("Registeration Successfull");
      setLoading(false);
      navigate("/login");
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
      <div className="resgister-page ">
        {loading && <Spinner />}
        <div className="left-side">
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Register Yourself</h1>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true, message: "Please select a role" }]}>
            <select> 
                              <option name="company"> Company</option>
                              <option name="farmer">Farmer</option>
                              <option name="entrepreneur">Entrepreneur</option>
                            </select>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>

          <div className="loginAsk">
          <button className="btn btn-primary">Register</button>
          <br />
            <Link to="/login">Already Registered ? Click Here to Login</Link>
          </div>
        </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
