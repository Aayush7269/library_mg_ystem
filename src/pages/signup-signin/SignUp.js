import React, { useState } from "react";
import { DefaultLayout } from "../../Components/DefaultLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {CustomInput} from "../../Components/cusom-inputs/CustomInput"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase-config";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {getUserAction} from '../user/userAction'


const SignUp = () => {
  const navigate =useNavigate()
  const dispatch = useDispatch()
  const [form, setForm] = useState({});

  const handleOnChange = (e) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { confirmPassword,password ,...rest  } = form;

    if (password !== confirmPassword) {
      return toast.error("Password do not match");
    }

    try {
      /// use firebase to create user and also store user
      const authSnapPromiss = createUserWithEmailAndPassword(
        auth,
        form.email,
        password
      );

      toast.promise(authSnapPromiss, {
        pending: "Please wait..",
      });

      const authSnap = await authSnapPromiss;

      if (authSnap?.user.uid) {
     await setDoc(doc(db,"users",authSnap?.user.uid), rest)
        toast.success("New user has been created");
           
      dispatch(getUserAction(authSnap?.user.uid))
      navigate("/dashboard")
      }

      
    } catch (error) {
      console.log(error);
      let msg = error.message;

      if (msg.includes("auth/email-already-in-use")) {
        msg = "There is already user exist with thi email";
      }
      toast.error(msg);
    }
  };

  const inputs = [
    {
      lable: "First name",
      name: "fName",
      type: "text",
      placeholder: "Same",
      required: true,
    },
    {
      lable: "Last name",
      name: "lName",
      type: "text",
      placeholder: "Smith",
      required: true,
    },
    {
      lable: "Phone",
      name: "phone",
      type: "number",
      placeholder: "04xxxxxxxx",
    },
    {
      lable: "Email",
      name: "email",
      type: "emial",
      placeholder: "Smith@smith.com",
      required: true,
    },
    {
      lable: "Password",
      name: "password",
      type: "password",
      placeholder: "xxxxxxxxx",
      required: true,
    },
    {
      lable: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "xxxxxxxxx",
      required: true,
      minLength: 6,
    },
  ];

  return (
    <DefaultLayout>
      <div className="admin-form border p-3 shadow-lg rounded">
        <Form onSubmit={handleOnSubmit}>
          <h1>Admin Registration</h1>
          <hr />

          {inputs.map((item, i) => (
            <CustomInput {...item} onChange={handleOnChange} />
          ))}

          <p className="d-grid mt-3">
            <Button variant="dark" type="submit">
              Register Now!
            </Button>
          </p>
        </Form>
      </div>
    </DefaultLayout>
  );
};

export default SignUp;