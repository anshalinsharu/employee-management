import React, { useState } from 'react';
import axios from 'axios';
import Validation from "./Validation.js";
import "./App.css";

// InputArea component
function InputArea(props) {
  return (
      <input
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          className={props.className}
      />
  );
}

function App() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
    name: '',
    empid: '',
    department: 'manager',
    dob: '',
    gender: '',
    designation: 'Lead',
    salary: '',
    address:''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // For radio inputs, handle differently
    if (type === 'radio') {
      setValues({
        ...values,
        [name]: value
      });
    } else {
      setValues({
        ...values,
        [name]: value
      });
    }
  };

  const handleNext = () => {
    const validationErrors = Validation(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8080/submit', values);
      alert('Data submitted successfully');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data. Please try again later.');
    }
  };

  const First = () => {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Employee Details</h2>
          <div>
            <label className="block">Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="block w-full pl-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:border-blue-500"
            />
            {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
  
            <label className="block mt-4">Employee ID</label>
            <input
              type="number"
              name="empid"
              value={values.empid}
              onChange={handleChange}
              className="block w-full pl-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:border-blue-500"
            />
            {errors.empid && <span className="text-sm text-red-500">{errors.empid}</span>}
  
            <label className="block mt-4">Department</label>
            <select
              name="department"
              value={values.department}
              onChange={handleChange}
              className="block w-full pl-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:border-blue-500"
            >
              <option value="manager">Manager</option>
              <option value="tester">Tester</option>
              <option value="backenddeveloper">Backend Developer</option>
              <option value="frontenddeveloper">Frontend Developer</option>
            </select>
            {errors.department && <span className="text-sm text-red-500">{errors.department}</span>}
  
            <label className="block mt-4">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={values.dob}
              onChange={handleChange}
              className="block w-full pl-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:border-blue-500"
            />
            {errors.dob && <span className="text-sm text-red-500">{errors.dob}</span>}
  
            <label className="block mt-4">Gender</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={values.gender === "male"}
                  onChange={handleChange}
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={values.gender === "female"}
                  onChange={handleChange}
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
            {errors.gender && <span className="text-sm text-red-500">{errors.gender}</span>}
  
            <label className="block mt-4">Designation</label>
            <select
              name="designation"
              value={values.designation}
              onChange={handleChange}
              className="block w-full pl-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:border-blue-500"
            >
              <option value="Lead">Lead</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Intern">Intern</option>
            </select>
            {errors.designation && <span className="text-sm text-red-500">{errors.designation}</span>}
  
            <label className="block mt-4">Salary</label>
            <input
              type="number"
              name="salary"
              value={values.salary}
              onChange={handleChange}
              className="block w-full pl-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:border-blue-500"
            />
            {errors.salary && <span className="text-sm text-red-500">{errors.salary}</span>}
          </div>
          <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">Next</button>
        </div>
      </div>
    );
  };
  
  
  const Second = () => {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Form Two</h2>
          <div>
            <label className="block">Address</label>
            <input
              type="text"
              name="address"
              value={values.address}
              onChange={handleChange}
              className="block w-full pl-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:border-blue-500"
            />
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">Submit</button>
          </div>
        </div>
      </div>
    );
  };
  
  // Assuming you're rendering based on some state variable 'step'
  return (
    <>
      {step === 1 && <First />}
      {step === 2 && <Second />}
    </>
  );
  
}

export default App;