interface ValidationErrors {
    name:string;
    email: string;
    phone:string;
    city:string;
    password: string;
    confirm_password:string;
   }
   
   interface ValidationValues {
    name:string;
    email: string;
    phone:string;
    city:string;
    password: string;
    confirm_password:string;
   }

export const validate =  (values: ValidationValues): ValidationErrors => {
   const errors: ValidationErrors = {
       name: "",
       email: "",
       phone: "",
       city:"",
       password: "",
       confirm_password:""
       
   };

   if (!values.name.trim()) {
    errors.name = 'Name is required';
  } else if (!/^[A-Za-z\s]+$/i.test(values.name)) {
    errors.name = 'Should not contain numbers!';
  }


   if (!values.email.trim()) {
     errors.email = 'Email is required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   }

   if (!values.city.trim()) {
    errors.city = 'City is required';
  } else if (!/^[A-Za-z\s]+$/i.test(values.city)) {
    errors.city = 'Should not contain numbers!';
  }


   if (!values.phone.trim()) {
    errors.phone = 'Phone is equired';
  } else if(!/^[0-9]+$/u.test(values.phone)) {
    errors.phone = 'Should not include characters';
  }else if (values.phone.length!==10) {
    errors.phone = 'Should contain 10 numbers';
  }


   if (!values.password.trim()) {
      errors.password = 'Password is equired';
    } else if (values.password.length<6) {
      errors.password = 'Contain atleast 6 characters';
    }

    if (!values.confirm_password.trim()) {
      errors.confirm_password = 'Confirm Password is equired';
  } else if (values.confirm_password!==values.password) {
      errors.confirm_password = 'Password should match!';
  }



   return errors;
 };
   