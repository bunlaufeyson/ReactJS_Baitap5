export default function EventClick() {
  const handleOnClick = () => {
    console.log(123);
  };

  const handleOnClickParams = (user, role) => {
    console.log(user, role);
  };

  return (
    <div>
      <h1>EventClick</h1>
      <button onClick={handleOnClick}>On click</button>
      <button onClick={() => handleOnClickParams("Nguyen", "Admin")}>
        On click params
      </button>
    </div>
  );
}
