import { memo } from "react";

function Child2() {
  console.log("Child2 Component");

  return (
    <div>
      <h1>Child2</h1>
    </div>
  );
}

export default memo(Child2);
