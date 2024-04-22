interface ValidationErrors {
    current_password:string;
    new_password: string;
    confirm_password:string;
   }
   
   interface ValidationValues {
    current_password:string;
    new_password: string;
    confirm_password:string;
   }


   export const validate = (values: ValidationValues): ValidationErrors => {
    const errors: ValidationErrors= {
       current_password: "",
       new_password: "",
       confirm_password: "",
    };
   
    if (!values.current_password.trim()) {
       errors.current_password = 'Current password is required';
    }
   
    if (!values.new_password.trim()) {
       errors.new_password = 'New password is required';
    } else if (values.new_password.length < 6) {
       errors.new_password = 'Contain at least 6 characters';
    }
   
    if (!values.confirm_password.trim()) {
       errors.confirm_password = 'Confirm Password is required';
    } else if (values.confirm_password !== values.new_password) {
       errors.confirm_password = 'Password should match!';
    }

    return errors;
   };
   
   