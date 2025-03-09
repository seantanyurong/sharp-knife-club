import { Button } from "./button";
import WhatsAppLink from "./whatsapp";

function Chat() {
  return (
    <>
      <WhatsAppLink origin="chat">
        <Button
          size={'lg'}
          variant={'destructive'}
          className='text-lg font-black hidden md:flex fixed bottom-6 right-6 z-99'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-brand-whatsapp h-8 w-8'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            strokeWidth='2.5'
            stroke='#FFFFFF'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <path stroke='none' d='M0 0h24v24H0z' />
            <path d='M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9' />
            <path d='M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1' />
          </svg>
          Chat with us!
        </Button>
      </WhatsAppLink>
      <WhatsAppLink origin="chat">
        <Button
          size={'sm'}
          variant={'destructive'}
          className='text-sm font-black flex md:hidden fixed bottom-4 right-4 z-99'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-brand-whatsapp h-8 w-8'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            strokeWidth='2.5'
            stroke='#FFFFFF'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <path stroke='none' d='M0 0h24v24H0z' />
            <path d='M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9' />
            <path d='M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1' />
          </svg>
          Chat with us!
        </Button>
      </WhatsAppLink>
    </>
  )
}

export default Chat