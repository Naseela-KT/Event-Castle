interface ValidationErrors {
    type:string;
    status: string;
   }
   
   interface ValidationValues {
    type:string;
    status: string;
   }

export const validate =  (values: ValidationValues): ValidationErrors => {
   const errors: ValidationErrors = {
    type:"",
    status: ""
       
   };

   if (!values.type.trim()) {
    errors.type = 'Type is required';
  } else if (!/^[A-Za-z\s]+$/i.test(values.type)) {
    errors.type = 'Should not contain numbers!';
  }


 
  if (values.status.length===0) {
    errors.status = 'Vendor Status is required';
  }

 
   return errors;
 };
   