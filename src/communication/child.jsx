export default function Child(props) {
  console.log(props);

  const handleResetUser = () => {
    const userReset = "Nguyen";
    props.handleGetUser(userReset);
  };

  return (
    <div className="border w-1/2 bg-amber-500">
      <h1>*Child</h1>
      <p>
        Username: {props.user} - Age: {props.age}
      </p>
      <button
        onClick={handleResetUser}
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Reset User
      </button>
    </div>
  );
}
