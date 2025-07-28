// form-sinh-vien/index.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudent,
  deleteStudent,
  updateStudent,
  selectStudent,
  clearSelectedStudent,
  setSearchKeyword,
} from "./studentSlice";

export default function StudentForm() {
  const dispatch = useDispatch();
  const { students, selectedStudent, searchKeyword } = useSelector((state) => state.student);

  const [formData, setFormData] = useState({
    maSV: "",
    hoTen: "",
    sdt: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  // Load dữ liệu từ localStorage khi trang tải lại
  useEffect(() => {
    const saved = localStorage.getItem("students");
    if (saved) {
      const data = JSON.parse(saved);
      data.forEach((student) => dispatch(addStudent(student)));
    }
  }, [dispatch]);

  // Lưu dữ liệu vào localStorage mỗi khi students thay đổi
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    if (selectedStudent) {
      setFormData(selectedStudent);
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.maSV.trim()) {
      newErrors.maSV = "Mã SV không được để trống";
    } else if (!selectedStudent && students.some(sv => sv.maSV === formData.maSV)) {
      newErrors.maSV = "Mã SV đã tồn tại";
    }

    if (!formData.hoTen.trim()) {
      newErrors.hoTen = "Họ tên không được để trống";
    } else if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(formData.hoTen)) {
      newErrors.hoTen = "Họ tên không được chứa số hoặc ký tự đặc biệt";
    }

    if (!formData.sdt.trim()) {
      newErrors.sdt = "SĐT không được để trống";
    } else if (!/^\d{10,11}$/.test(formData.sdt)) {
      newErrors.sdt = "SĐT chỉ được chứa số và có 10–11 chữ số";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (selectedStudent) {
      dispatch(updateStudent(formData));
      dispatch(clearSelectedStudent());
    } else {
      dispatch(addStudent(formData));
    }
    setFormData({ maSV: "", hoTen: "", sdt: "", email: "" });
    setErrors({});
  };

  const handleSearch = (e) => {
    dispatch(setSearchKeyword(e.target.value));
  };

 const normalize = (str) =>
  str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

const filteredStudents = students.filter((sv) => {
  const keyword = normalize(searchKeyword);
  return (
    normalize(sv.maSV).includes(keyword) ||
    normalize(sv.hoTen).includes(keyword)
  );
});

  return (
    <div className="p-4 max-w-4xl mx-auto font-sans">
      <div className="bg-gray-800 text-white px-4 py-2 text-lg font-semibold rounded-t">
        Thông tin sinh viên
      </div>
      <div className="grid grid-cols-2 gap-4 border p-4 border-gray-300">
        <div>
          <label className="block text-sm font-medium">Mã SV</label>
          <input
            name="maSV"
            value={formData.maSV}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
          {errors.maSV && <p className="text-red-500 text-sm">{errors.maSV}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Họ tên</label>
          <input
            name="hoTen"
            value={formData.hoTen}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
          {errors.hoTen && <p className="text-red-500 text-sm">{errors.hoTen}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Số điện thoại</label>
          <input
            name="sdt"
            value={formData.sdt}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
          {errors.sdt && <p className="text-red-500 text-sm">{errors.sdt}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {selectedStudent ? "Cập nhật" : "Thêm sinh viên"}
      </button>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Tìm kiếm sinh viên..."
          onChange={handleSearch}
          className="w-full border px-2 py-1 mb-4 rounded"
        />
        <table className="w-full border border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border px-2 py-1">Mã SV</th>
              <th className="border px-2 py-1">Họ tên</th>
              <th className="border px-2 py-1">Số điện thoại</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((sv) => (
              <tr key={sv.maSV} className="text-center">
                <td className="border px-2 py-1">{sv.maSV}</td>
                <td className="border px-2 py-1">{sv.hoTen}</td>
                <td className="border px-2 py-1">{sv.sdt}</td>
                <td className="border px-2 py-1">{sv.email}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button
                    onClick={() => dispatch(selectStudent(sv))}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => dispatch(deleteStudent(sv.maSV))}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Không tìm thấy sinh viên nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
