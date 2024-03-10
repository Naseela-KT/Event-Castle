export interface EmailErrors {
    email?: string;
   }
   
   export interface EmailValues {
    email: string; 

   }


   export interface FormValues{
    email:string;
    otp:string
   }

   export interface FormErrors{
    email:string;
    otp:string
   }

export const validateEmailValue =  (values: EmailValues): EmailErrors => {
   const errors: EmailErrors = {};
   if (!values.email) {
     errors.email = 'Email is required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   }
 
   return errors;
 };


export const validateForm=(values:FormValues):FormErrors=>{
    const errors: FormErrors = {
        email: "",
        otp:""
    };
   if (!values.email) {
     errors.email = 'Email is required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   }

   if (!values.otp) {
    errors.otp = 'OTP is required';
  } else if (!/^[0-9]{4}$/.test(values.otp)) {
    errors.otp = 'Should contain 4 digits';
  }
 
   return errors;
}
   