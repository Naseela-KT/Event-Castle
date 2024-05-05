import { Request, Response } from "express";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import crypto from "crypto";
import sharp from "sharp";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { CustomError } from "../error/customError";
import postService from "../services/postService";
import { handleError } from "../utils/handleError";



dotenv.config();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
  region: process.env.BUCKET_REGION!,
});

const randomImage = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

class PostController  {
  async addNewPost(req: Request, res: Response): Promise<void> {
    try {
      const caption = req.body.caption;
      const vendor_id: string = req.query.vendorid as string;

      console.log("req file.........")
      console.log(req.file)
  

      const buffer = await sharp(req.file?.buffer)
      .resize({ height: 1920, width: 1080, fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 1 } })
      .toBuffer();
  

      const imageName = randomImage();

      const params = {
        Bucket: process.env.BUCKET_NAME!,
        Key: imageName,
        Body: buffer,
        ContentType: req.file?.mimetype,
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);

      const getObjectParams={
        Bucket: process.env.BUCKET_NAME!,
        Key: imageName,
      }

      const command2 = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command2,{expiresIn: 86400 * 3});
      let imageUrl=url;

      const post = await postService.createPost(caption, imageName, vendor_id,imageUrl);
      res.status(201).json(post);
    } catch (error) {
      handleError(res, error, "addNewPost");
    }
  }
  

  async getPosts(req: Request, res: Response): Promise<void> {
    try {
      const vendor_id:string=req.query.vendorid as string;
      const page: number = parseInt(req.query.page as string) || 1;
      const pageSize: number = parseInt(req.query.pageSize as string) || 8;
      const {posts,totalPosts}=await postService.getAllPostsByVendor(vendor_id,page,pageSize)
      const totalPages = Math.ceil(totalPosts / pageSize);
      res.status(201).json({posts,totalPages: totalPages});
    } catch (error) {
      handleError(res, error, "getPosts");
    }
  }

  async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const id=req.params.id;
      const post=await postService.getPostById(id);

      // if(!post){
      //   throw new CustomError('Post not found!',404)
      // }
      const params={
        Bucket: process.env.BUCKET_NAME!,
        Key: post?.image,
      }
      
      const command=new DeleteObjectCommand(params);
      await s3.send(command);
      
      await postService.deletePostService(id);
      res.status(200).json({message:"Post deleted successfully"});


    } catch (error) {
      handleError(res, error, "deletePost");
    }
  }
};


export default new PostController();


