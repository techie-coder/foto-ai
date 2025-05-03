import { z } from 'zod';
import { trainModel, GenerateImage, GenerateImagesFromPack } from './types';

export type TrainModelInput = z.infer<typeof trainModel>;
export type GenerateImageInput = z.infer<typeof GenerateImage>;
export type GenerateImagesFromPackInput = z.infer<typeof GenerateImagesFromPack>;
