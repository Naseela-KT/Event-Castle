export interface EmailErrors {
    email?: string;
   }
   
   export interface EmailValues {
    email: string; 

   }


   export interface otpValues{
    otp:string
   }

   export interface otpErrors{
    otp?:string
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


export const validateOTP=(values:otpValues):otpErrors=>{
    const errors: otpErrors = {};

   if (!values.otp) {
    errors.otp = 'OTP is required';
  } else if (!/^[0-9]{4}$/.test(values.otp)) {
    errors.otp = 'Should contain 4 digits';
  }
 
   return errors;
}
   