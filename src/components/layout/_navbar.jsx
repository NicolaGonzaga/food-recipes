import { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import logo from "../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {
  const { signed, signOut } = useContext(AuthGoogleContext);
  const navigate = useNavigate();

  function handleClick() {
    if (signed) {
      signOut();
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  return (
    <header>
      <img src={logo} alt="Food Recipes" />
      <nav>
        <NavLink to="/#">Home</NavLink>
        <NavLink to="/#">Recipe</NavLink>
        <NavLink to="/#">Add recipe</NavLink>
        <NavLink to="/#">About</NavLink>
      </nav>
      <div className="nav-buttons">
        {signed ? (
          <button className="logout-btn" onClick={handleClick}>
            Logout
          </button>
        ) : (
          <button className="login-btn" onClick={handleClick}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default NavBar;
