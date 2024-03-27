import { v2 as cloudinary } from 'cloudinary';
import { Request, Response } from 'express';

require('dotenv').config();

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

cloudinary.config(cloudinaryConfig);

export const deleteImageFromCloudinary = async (
  req: Request,
  res: Response
) => {
  const { imageId } = req.body;

  try {
    await cloudinary.uploader.destroy(imageId);
    res.status(200).json({ msg: 'picture deleted' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).send('Error deleting image');
  }
};

export const deleteMixesFromCloudinary = async (
  req: Request,
  res: Response
) => {
  const { public_id } = req.body;
  try {
    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: 'video',
    });
    res.status(200).json({ msg: 'mixes deleted' });
  } catch (error) {
    console.error('Error deleting mixes:', error);
    res.status(500).send('Error deleting mixes');
  }
};
