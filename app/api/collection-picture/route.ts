import { handleOrderPictureUpload } from '@/lib/server/orderPictures';

export async function POST(request: Request) {
  return handleOrderPictureUpload(request, 'collection');
}
