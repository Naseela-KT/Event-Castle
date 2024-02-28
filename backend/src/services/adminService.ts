import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { findAdminByEmail } from "../repositories/adminRepository";
import { Response } from "express";

export const login=async(res: Response,email:string,password:string):Promise<object>=>{
    try {
        console.log(email)
        const existingAdmin=await findAdminByEmail(email);
        if(!existingAdmin){
            throw new Error('Admin not exist');  
        }
        const passwordMatch=await bcrypt.compare(password,existingAdmin.password);
        if(!passwordMatch){
            throw new Error('Incorrect password...')
        }

        const token = jwt.sign({ _id: existingAdmin._id }, process.env.JWT_SECRET!);
        return {message:"Login successfull",token:token};
    } catch (error) {
        throw error
    }
}