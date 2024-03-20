import { Request, Response } from "express";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import crypto from "crypto";
import sharp from "sharp";
import { createPost, getAllPostsByVendor } from "../services/postService";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";




dotenv.config();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
  region: process.env.BUCKET_REGION!,
});

const randomImage = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

export const PostController = {
  async addNewPost(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);
      console.log(req.file);
      const caption = req.body.caption;
      const vendor_id: string = req.query.vendorid as string;
      console.log(vendor_id);

      const buffer = await sharp(req.file?.buffer)
        .resize({ height: 1920, width: 1080, fit: "contain" })
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

      const post = await createPost(caption, imageName, vendor_id);
      res.status(201).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  async getPosts(req: Request, res: Response): Promise<void> {
    try {

      const vendor_id:string=req.query.vendorid as string;
      const posts=await getAllPostsByVendor(vendor_id)
      console.log(posts)

      for(const post of posts){
        const getObjectParams={
          Bucket: process.env.BUCKET_NAME!,
          Key: post.image,
        }
  
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        post.imageUrl=url;
      }
      res.status(201).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
