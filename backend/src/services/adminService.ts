import bcrypt from "bcrypt";
import generateAdminToken from "../utils/generateAdminToken";
import { findAdminByEmail } from "../repositories/adminRepository";
import { Response } from "express";

export const login=async(res: Response,email:string,password:string):Promise<string>=>{
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

        await generateAdminToken(res, existingAdmin._id);
        return "Login successful...";
    } catch (error) {
        throw error
    }
}