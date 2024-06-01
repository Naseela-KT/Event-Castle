interface ValidationErrors {
    email: string;
    name: string;
    mobile: string;
    subject: string;
    message:string;
   }
   
   interface ValidationValues {
    email: string;
    name: string;
    mobile: string;
    subject: string;
    message:string;
   }

export const validate =  (values: ValidationValues): ValidationErrors => {
   const errors: ValidationErrors = {
    email: "",
    name: "",
    mobile: "",
    subject: "",
    message:""
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


   if (!values.mobile.trim()) {
    errors.mobile = 'Phone is equired';
  } else if (values.mobile.length!==10) {
    errors.mobile = 'Should contain 10 characters';
  }

  if (!values.subject.trim()) {
    errors.subject = 'Subject is required';
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required';
  }

 
   return errors;
 };
   