import { useState } from "react";

const styleObj = {
  backgroundColor: "yellow",
};

const Title = () => (
  <a href="\">
    <h1 id="title" key="h1" style={styleObj}>
      React-Test
    </h1>
  </a>
);
const Header = () => {
  // const loggedIn = false;
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="header">
      <Title />
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Cart</li>
        </ul>
      </div>
      {loggedIn ? (
        <button onClick={()=>{setLoggedIn(false)}}>LogOut</button>
      ) : (
        <button onClick={()=>{setLoggedIn(true)}}>LogIn</button>
      )}
    </div>
  );
};
export default Header;
