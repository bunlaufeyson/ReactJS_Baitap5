import { useState } from "react";

export default function State() {
  let username = "Nguyen";

  const [isLogin, setLogin] = useState(false);

  const handleLogin = () => {
    // Cập nhật giá trị mới cho isLogin là true
    setLogin(true);
  };

  const hanleLogout = () => {
    setLogin(false);
  };

  const renderInfo = () => {
    if (isLogin) {
      return (
        <div>
          <h1>Hello {username}</h1>
          <button onClick={hanleLogout}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Vui long login</h1>
          <button onClick={handleLogin}>Login</button>
        </div>
      );
    }
  };

  return (
    <div>
      <h1>State</h1>
      {renderInfo()}

      {/* {isLogin ? (
        <div>
          <h1>Hello {username}</h1>
          <button>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Vui long login</h1>
          <button>Login</button>
        </div>
      )} */}
    </div>
  );
}
