import { memo } from "react";

function Child(props) {
  console.log("Child Component");

  return (
    <div>
      <h1 className="text-3xl">Child</h1>
      <p>{props.number}</p>
    </div>
  );
}

export default memo(Child);
