import { lookupImageGalleryGetAllReducer } from './lookupImageGalleryGetAllReducer';
import { lookupImageGalleryGetByIdReducer } from './lookupImageGalleryGetByIdReducer';
import { lookupImageGalleryPostReducer } from './lookupImageGalleryPostReducer';

const lookupImageGalleryReducers = {
  imageGalleryGetAll: lookupImageGalleryGetAllReducer,
  imageGalleryGetById: lookupImageGalleryGetByIdReducer,
  imageGalleryPost: lookupImageGalleryPostReducer,
};

export default lookupImageGalleryReducers;