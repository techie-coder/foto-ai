import { z } from 'zod';
import { trainModel, GenerateImage, GenerateImagesFromPack, OutputImages, Model } from './types';

export type TrainModelInput = z.infer<typeof trainModel>;
export type GenerateImageInput = z.infer<typeof GenerateImage>;
export type GenerateImagesFromPackInput = z.infer<typeof GenerateImagesFromPack>;
export type OutputImages = z.infer<typeof OutputImages>;
export type Model = z.infer<typeof Model>;
