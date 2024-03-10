interface ValidationErrors {
    password?: string;
    confirm_password?:string;
   }
   
   interface ValidationValues {
    password: string;
    confirm_password:string;
   }

export const validate =  (values: ValidationValues): ValidationErrors => {
   const errors: ValidationErrors = {};

   if (!values.password) {
      errors.password = 'Password is equired';
    } else if (values.password.length<6) {
      errors.password = 'Contain atleast 6 characters';
    }

    if (!values.confirm_password) {
        errors.confirm_password = 'Confirm Password is equired';
      } else if (values.confirm_password!==values.password) {
        errors.confirm_password ='Password should match';
      }
   
 
   return errors;
 };
   