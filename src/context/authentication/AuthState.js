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
      // Handle errors from the backend
      displayAlert("danger", `HTTP Error: ${json.status}`);
      throw new Error(json.error || "Failed to create user");
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
      // Handle errors from the backend
      displayAlert("danger", `HTTP Error: ${json.status}`);
      throw new Error(json.error || "Failed to create user");
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
      // Handle errors from the backend
      displayAlert("danger", `HTTP Error: ${json.status}`);
      throw new Error(json.error || "Failed to create user");
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
      return null;
    }
    if (json.success) {
      return json.user;
    } else {
      return null;
    }

    return json;
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
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    //  Clear localStorage and redirect to login/home
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
