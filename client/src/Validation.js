function Validation(values) {
    let errors = {};

    if (!values.name.trim()) {
        errors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(values.name.trim())) {
        errors.name = "Name should only contain letters and spaces";
    }

    if (!values.empid.trim()) {
        errors.empid = "Id is required";
    } else if (parseInt(values.empid.trim()) < 0) {
        errors.empid = "Id cannot be negative";
    }

    if (!values.department.trim()) {
        errors.department = "Department is required";
    }

    if (!values.dob.trim()) {
        errors.dob = "DOB is required";
    } else {
        const dobDate = new Date(values.dob.trim());
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const dobYear = dobDate.getFullYear();
        const age = currentYear - dobYear;

        if (dobYear > currentYear) {
            errors.dob = "DOB cannot be a future date";
        } else if (age < 18) {
            errors.dob = "Age must be at least 18";
        }
    }

    if (!values.gender) {
        errors.gender = "Gender is required";
    }

    if (!values.designation.trim()) {
        errors.designation = "Designation is required";
    }

    if (!values.salary.trim()) {
        errors.salary = "Salary is required";
    } else if (parseInt(values.salary.trim()) < 0) {
        errors.salary = "Salary cannot be negative";
    }

    return errors;
}

export default Validation;
