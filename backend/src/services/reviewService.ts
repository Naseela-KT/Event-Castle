
export const addNewReview = async(content:string , rating:number , userId:string , vendorId:string)=>{
    try {
       
      const data = await CreateReview(content , rating, userId , vendorId)
      return  data;
    } catch (error) {
      throw error;
    }
  }