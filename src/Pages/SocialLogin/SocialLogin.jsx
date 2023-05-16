import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {googleSignIn} = useContext( AuthContext)
    const navigate = useNavigate()

    const handleGoogleSignIn = () =>{
      googleSignIn()
      .then(result => {
        console.log(result)
        navigate('/')
      } )
      .catch(err => console.error(err))
    }

  return (
    <div className="grid justify-center">
      <div className="divider divider-horizontal">OR</div>
      <div className="text-center">
        <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
          G
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
