interface ValidationErrors {
    email?: string;
    password?: string;
   }
   
   interface ValidationValues {
    email: string;
    password: string;
   }
   
   export const validate = (values: ValidationValues): ValidationErrors => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const errors: ValidationErrors = {};
   
    if (!values.email) {
       errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
       errors.email = "Enter a valid email";
    }
   
    if (!values.password) {
       errors.password = "Password is required";
    } 
   
    return errors;
   };
   