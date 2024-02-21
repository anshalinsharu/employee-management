function Validation(values) {
    let errors = {};

    
    if (!values.name.trim()) {
        errors.name = "Name is required";
    }

    
    if (!values.empid.trim()) {
        errors.empid = "Id is required";
    }

    
    if (!values.department.trim()) {
        errors.department = "Department is required";
    }

    
    if (!values.dob.trim()) {
        errors.dob = "DOB is required";
    }

    
    if (!values.gender) {
        errors.gender = "Gender is required";
    }

    
    if (!values.designation.trim()) {
        errors.designation = "Designation is required";
    }

    
    if (!values.salary.trim()) {
        errors.salary = "Salary is required";
    }

    return errors;
}

export default Validation;