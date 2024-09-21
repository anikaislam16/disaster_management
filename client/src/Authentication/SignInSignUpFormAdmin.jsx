import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert

const SignInSignUpFormAdmin = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // New states for the signup form fields
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [signupPhoneNumber, setSignupPhoneNumber] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const validatePhoneNumber = (phone) => {
    // Phone number should start with +880 and be followed by 11 digits (total 14 characters)
    const phoneRegex = /^\+880\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSignIn = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Phone number must start with +880 and be 14 characters long.",
      });
      return;
    }

    if (password === "") {
      Swal.fire({
        icon: "error",
        title: "Missing Password",
        text: "Password is required.",
      });
      return;
    }

    // Make API call to login using Fetch API
    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phoneNumber,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Signed In",
          text: "You have successfully signed in!",
        });

        // Optionally, save the JWT token in localStorage or cookies
        localStorage.setItem("token", data.token);

        // Redirect user or take additional actions
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };
  const handleSignUp = () => {
    if (!validatePhoneNumber(signupPhoneNumber)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Phone number must start with +880 and be 14 characters long.",
      });
      return;
    }

    if (signupPassword === "" || name === "" || address === "" || age === "") {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "All fields are required.",
      });
      return;
    }

    // Make API call to sign up using Fetch API
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        age: Number(age),
        phone: Number(signupPhoneNumber),
        address,
        location: "Not Set",
        status: "Not Approved",
        password: signupPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Signed Up",
          text: "You have successfully signed up!",
        });

        // Clear form fields after successful signup
        setName("");
        setAddress("");
        setAge("");
        setSignupPhoneNumber("");
        setSignupPassword("");
      })
      .catch((error) => {
        if (error.message === "User with this phone number already exists.") {
          Swal.fire({
            icon: "error",
            title: "User Already Exists",
            text: "A user with this phone number already exists. Please use a different phone number.",
          });
        } else {
          console.error("Signup error:", error);
          Swal.fire({
            icon: "error",
            title: "Signup Failed",
            text: error.message,
          });
        }
      });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-blue-200 w-96 p-6 rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 w-1/2 ${
              activeTab === "signin"
                ? "bg-blue-500 text-white"
                : "bg-transparent text-gray-600"
            } font-semibold border border-blue-500 rounded-l-lg`}
            onClick={() => setActiveTab("signin")}
          >
            SIGN IN
          </button>
          <button
            className={`px-4 py-2 w-1/2 ${
              activeTab === "signup"
                ? "bg-blue-500 text-white"
                : "bg-transparent text-gray-600"
            } font-semibold border border-blue-500 rounded-r-lg`}
            onClick={() => setActiveTab("signup")}
          >
            SIGN UP
          </button>
        </div>

        {activeTab === "signup" && (
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full mb-3"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input input-bordered w-full mb-3"
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered w-full mb-3"
            />
            <input
              type="text"
              placeholder="Phone Number (+880XXXXXXXXX)"
              value={signupPhoneNumber}
              onChange={(e) => setSignupPhoneNumber(e.target.value)}
              className="input input-bordered w-full mb-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              className="input input-bordered w-full mb-3"
            />
            <button
              className="btn btn-block bg-blue-500 text-white"
              onClick={handleSignUp}
            >
              SIGN UP
            </button>
          </div>
        )}

        {activeTab === "signin" && (
          <div>
            <input
              type="text"
              placeholder="Phone Number (+880XXXXXXXXX)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input input-bordered w-full mb-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full mb-3"
            />
            <button
              className="btn btn-block bg-blue-500 text-white"
              onClick={handleSignIn}
            >
              SIGN IN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInSignUpFormAdmin;
