import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function SignUp() {
  const { signInGoogle, signed } = useContext(AuthGoogleContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");

  const auth = getAuth();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignInWithEmail = async (e) => {
    e.preventDefault();
    try {
      const newUserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = newUserCredential.user;
      const token = await user.getIdToken();
      sessionStorage.setItem("@AuthFirebase:token", token);
      sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
      // console.log("Usuário logado:", user);
      window.location.reload();
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError();
      } else {
        setError(
          "Email or password incorrect. Please check your credentials and try again."
        );
      }
      console.error("Erro ao fazer login:", error);
    }
  };

  if (signed) {
    navigate("/");
  }

  const loginForm = () => {
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <NavLink to="/">
          <img
            src={logo}
            alt="Food Recipes"
          />
        </NavLink>
        <h1 className="form-title">Create user</h1>
        <form onSubmit={handleSignInWithEmail}>
          <div className="input-group">
            <label className="form-login-label">
              Email:
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="email-input"
                required
              />
            </label>
          </div>
          <div className="input-group">
            <label className="form-login-label">
              Password:
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="password-input"
                required
              />
            </label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button
            type="submit"
            className="login-button"
          >
            Criar usuario
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              signInGoogle();
            }}
            className="google-login-button"
          >
            <span className="google-logo"></span>Logar com o Google
          </button>
          <button onClick={loginForm}>Já tenho um usuario cadastrado</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
