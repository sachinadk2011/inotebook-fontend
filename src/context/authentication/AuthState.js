import AuthContext from "./AuthContext";

export default function AuthState(props) {
  const host = process.env.REACT_APP_URL;

  // do signup fetching
  const SignUp = async (name, email, password) => {
    const response = await fetch(`${host}/api/auth/createUser`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      let message = json.error || json.message || "Failed to create user";
      // Handle errors from the backend
      const time = json.retryAfter;
      if (typeof time === "number" && !isNaN(time)) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        message += `Try again in ${minutes} minute(s) and ${seconds} second(s).`;
      }
      // console.log(time, typeof time)
      throw new Error(message);
    }

    return json;
  };

  // verify-otp
  const VerifyOtp = async (otp, email) => {
    const response = await fetch(`${host}/api/auth/verify-otp`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ OtpCode: otp, email: email }),
    });
    const json = await response.json();
    if (!response.ok) {
      let message = json.error || json.message || "Failed to verify email";
      // Handle errors from the backend
      const time = json.retryAfter;
      if (typeof time === "number" && !isNaN(time)) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        message += `Try again in ${minutes} minute(s) and ${seconds} second(s).`;
      }
      // console.log(time, typeof time)
      throw new Error(message);
    }
    return json;
  };

  // resend otp code
  const ResendOtp = async (email) => {
    const response = await fetch(`${host}/api/auth/resend`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    const json = await response.json();
    if (!response.ok) {
      let message = json.error || json.message || "Failed to send opt code to an email";
      // Handle errors from the backend
      const time = json.retryAfter;
      if (typeof time === "number" && !isNaN(time)) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        message += `Try again in ${minutes} minute(s) and ${seconds} second(s).`;
      }
      // console.log(time, typeof time)
      throw new Error(message);
    }
    return json;
  };
  // login the user
  const Login = async (email, password) => {
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      let message = json.error || json.message || "Failed to login user";
      // Handle errors from the backend
      const time = json.retryAfter;
      if (typeof time === "number" && !isNaN(time)) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        message += `Try again in ${minutes} minute(s) and ${seconds} second(s).`;
      }
      // console.log(time, typeof time)
      throw new Error(message);
    }
    return json;
  };

  // getuser is authenticate or not
  const GetUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();

    if (!response.ok || !json) {
      throw new Error(json.message || "error on geting user data");
    }

    return json.user;
  };

  // forget password
  const ForgetPassword = async (email) => {
    const response = await fetch(`${host}/api/auth/forget-password`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    // Debugging

    const json = await response.json();
    if (!response.ok) {
      let message = json.error || json.message || "Failed to find user email";
      // Handle errors from the backend
      const time = json.retryAfter;
      if (typeof time === "number" && !isNaN(time)) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        message += `Try again in ${minutes} minute(s) and ${seconds} second(s).`;
      }
      // console.log(time, typeof time)
      throw new Error(message);
    }
    return json;
  };

  // reset pw
  const ResetPassword = async (email, password) => {
    const response = await fetch(`${host}/api/auth/resetpw`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      let message = json.error || json.message || "Failed to update password";
      // Handle errors from the backend
      const time = json.retryAfter;
      if (typeof time === "number" && !isNaN(time)) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        message += `Try again in ${minutes} minute(s) and ${seconds} second(s).`;
      }
      // console.log(time, typeof time)
      throw new Error(message);
    }
    return json;
  };

  // deleting account
  const DeleteUser = async () => {
    const response = await fetch(`${host}/api/auth/deleteuserId`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (!response.ok) {
      let message = json.error || json.message || "Failed to delete user";
      // Handle errors from the backend
      const time = json.retryAfter;
      if (typeof time === "number" && !isNaN(time)) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        message += `Try again in ${minutes} minute(s) and ${seconds} second(s).`;
      }
      // console.log(time, typeof time)
      throw new Error(message);
    }

    return json;
  };

  return (
    <AuthContext.Provider
      value={{
        SignUp,
        VerifyOtp,
        Login,
        ResendOtp,
        ForgetPassword,
        ResetPassword,
        DeleteUser,
        GetUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
