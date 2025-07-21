import { useState } from "react";
import data from "./data.json";

export default function Glasses() {
  const [glasses, setGlasses] = useState(data);
  const [imgPath, setImgPath] = useState(glasses[0].url);

  const renderFace = () => {
    return <div></div>;
  };

  const renderListGlasses = () => {
    return <div></div>;
  };

  return (
    <div>
      <h1 className="text-2xl text-red-800">Glasses</h1>
      {renderFace()}
      {renderListGlasses()}
    </div>
  );
}
