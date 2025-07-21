import { useState } from "react";

export default function ChangeColorCar() {
  const [imgPath, setImgPath] = useState("./images/red-car.jpg");

  const hanleChangeColor = (path) => {
    setImgPath(path);
  };

  return (
    <div>
      <h1>ChangeColorCar</h1>
      <div style={{ display: "flex" }}>
        <div>
          <img src={imgPath} width="500px" />
        </div>
        <div>
          <button onClick={() => hanleChangeColor("./images/red-car.jpg")}>
            Red
          </button>
          <button onClick={() => hanleChangeColor("./images/silver-car.jpg")}>
            Silver
          </button>
          <button onClick={() => hanleChangeColor("./images/black-car.jpg")}>
            Black
          </button>
        </div>
      </div>
    </div>
  );
}
