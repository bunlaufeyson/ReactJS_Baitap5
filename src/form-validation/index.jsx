import { useState } from "react";

export default function FormValidation() {
  const [state, setState] = useState({
    values: {
      email: "",
      password: "",
    },
    errors: {
      email: "",
      password: "",
    },
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    // lưu value email vào state
    setState({
      ...state, // giữ nguyên các giá trị khác trong state
      values: {
        ...state.values, // giữ nguyên các giá trị khác trong values
        [name]: value, // cập nhật giá trị của trường tương ứng
      },
    });
  };

  console.log("state", state);

  const handleError = (event) => {
    const { name, value } = event.target;
    let mess = value.trim() === "" ? `${name} không được để trống` : "";

    if (value.trim()) {
      switch (name) {
        case "email":
          const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!value.match(regexEmail)) {
            mess = "Email không đúng định dạng";
          }
          break;

        case "password":
          const regexPassword =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
          if (!value.match(regexPassword)) {
            mess =
              "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 ký tự đặc biệt và 1 số";
          }
          break;

        default:
          break;
      }
    }

    // cập nhật state.errors
    setState({
      ...state,
      errors: {
        ...state.errors,
        [name]: mess, // cập nhật thông báo lỗi cho trường tương ứng
      },
    });
  };

  const handleOnSubmit = (event) => {
    // ngăn chặn hành vi load lại trang
    event.preventDefault();
    console.log(state);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-5">Form Validation</h1>
      <form className="max-w-sm mx-auto" onSubmit={handleOnSubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            name="email"
            onChange={handleOnChange}
            onBlur={handleError}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
          {state.errors.email && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {state.errors.email}
            </div>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            name="password"
            onBlur={handleError}
            onChange={handleOnChange}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {state.errors.password && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {state.errors.password}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
