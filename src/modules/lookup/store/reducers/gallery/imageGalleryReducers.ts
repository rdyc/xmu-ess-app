import { imageGalleryGetAllReducer } from './imageGalleryGetAllReducer';
import { imageGalleryGetByIdReducer } from './imageGalleryGetByIdReducer';
import { imageGalleryPostReducer } from './imageGalleryPostReducer';

const imageGalleryReducers = {
  imageGalleryGetAll: imageGalleryGetAllReducer,
  imageGalleryGetById: imageGalleryGetByIdReducer,
  imageGalleryPost: imageGalleryPostReducer,
};

export default imageGalleryReducers;