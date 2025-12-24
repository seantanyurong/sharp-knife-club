import ProfileCard from "@/components/admin/ProfileCard";
import { getPageBody, getOrderByPageId } from "@/app/actions/notion";
import { formatOrder } from "@/lib/utils";
import type { BlockObjectResponse, PartialBlockObjectResponse } from '@notionhq/client'
import Image from 'next/image';

export default async function OrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const { orderId } = await params;

  const pageBody = await getPageBody(orderId);
  const order = await getOrderByPageId(orderId);
  const formattedOrder = formatOrder(order);

  const isFullBlock = (block: PartialBlockObjectResponse | BlockObjectResponse) => {
    return 'type' in block;
  };

  const convertPageBlockToJsx = (pageBlock: BlockObjectResponse, key: number) => {
    if (pageBlock.type === 'paragraph') {
      return <p key={key}>{pageBlock.paragraph.rich_text[0]?.plain_text}</p>
    }

    if (pageBlock.type === 'image') {
      if (pageBlock.image.type === 'external') {
        return <Image key={key} src={pageBlock.image.external.url} width={500} height={500} alt='order image' />
      }

      if (pageBlock.image.type === 'file') {
        return <Image key={key} src={pageBlock.image.file.url} width={500} height={500} alt='order image' />
      }
    }
  };

  return (
    <div className="p-4 flex justify-center flex-col">
      <ProfileCard name={formattedOrder.orderId} subtitle={formattedOrder.address} />
      <div className='mt-4'>
        {
          pageBody?.length ? pageBody.filter(isFullBlock).map((block, index) => {
            return convertPageBlockToJsx(block, index);
          }) : <p>No additional details</p>
        }
      </div>
    </div>
  )
}
