import React, {useState} from "react";
import GoogleLogin from "react-google-login";

function LoginWithGoogle() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");

  const responseGoogle = response => {
    console.log(response);
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);
  };
  return (
    <div>
      <h1>Login with Google</h1>
      <h2>Welcome: {name}</h2>
      <h2>Email: {email}</h2>
      <img src={url} alt={name} />
      <GoogleLogin
        clientId="149495049279-qol7p8gon1e1ehbgcsroa4sv9p28iib4.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      ,
    </div>
  );
}

export default LoginWithGoogle;
