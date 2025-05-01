// pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';

const programmes = ['Computer Science', 'Business', 'Physics', 'Mathematics'];
const years = ['First Year', 'Second Year', 'Third Year', 'Fourth Year'];
const semesters = ['Semester 1', 'Semester 2'];
const modules = ['Math 101', 'Physics 101', 'CS 101', 'English 101'];

export default function RegistrationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    programme: '',
    year: '',
    semester: '',
    modules: []
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleModuleChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const newModules = checked
        ? [...prev.modules, value]
        : prev.modules.filter(m => m !== value);
      return { ...prev, modules: newModules };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!/^[A-Za-z0-9]{8}$/.test(formData.studentId)) {
      newErrors.studentId = 'Student ID must be 8 alphanumeric characters';
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.programme) newErrors.programme = 'Programme is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.semester) newErrors.semester = 'Semester is required';
    if (formData.modules.length < 3) {
      newErrors.modules = 'Select at least 3 modules';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => router.push('/'), 2000);
      } else {
        const data = await response.json();
        setErrors(data.errors || {});
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Semester Registration</h1>
      
      {submitStatus === 'success' && (
        <div className="alert alert-success">
          Registration successful! Redirecting...
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="alert alert-error">
          Please fix the errors below
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="form-group">
          <label className="block mb-1">Full Name</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="form-control"
            type="text"
          />
          {errors.fullName && <p className="error-message">{errors.fullName}</p>}
        </div>

        {/* Student ID */}
        <div className="form-group">
          <label className="block mb-1">Student ID</label>
          <input
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="form-control"
            type="text"
          />
          {errors.studentId && <p className="error-message">{errors.studentId}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="block mb-1">Email Address</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            type="email"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        {/* Programme */}
        <div className="form-group">
          <label className="block mb-1">Programme</label>
          <select
            name="programme"
            value={formData.programme}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Programme</option>
            {programmes.map(programme => (
              <option key={programme} value={programme}>{programme}</option>
            ))}
          </select>
          {errors.programme && <p className="error-message">{errors.programme}</p>}
        </div>

        {/* Year */}
        <div className="form-group">
          <label className="block mb-1">Year</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {errors.year && <p className="error-message">{errors.year}</p>}
        </div>

        {/* Semester */}
        <div className="form-group">
          <label className="block mb-1">Semester</label>
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Semester</option>
            {semesters.map(semester => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>
          {errors.semester && <p className="error-message">{errors.semester}</p>}
        </div>

        {/* Modules */}
        <div className="form-group">
          <label className="block mb-1">Select Modules (At least 3)</label>
          <div className="space-y-2">
            {modules.map(module => (
              <div key={module} className="flex items-center">
                <input
                  type="checkbox"
                  id={module}
                  value={module}
                  checked={formData.modules.includes(module)}
                  onChange={handleModuleChange}
                  className="mr-2"
                />
                <label htmlFor={module}>{module}</label>
              </div>
            ))}
          </div>
          {errors.modules && <p className="error-message">{errors.modules}</p>}
        </div>

        <button type="submit" className="btn w-full">Register</button>
      </form>
    </div>
  );
}
