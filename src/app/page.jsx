import Link from 'next/link';

export default function Home() {
  return (
    <main className='min-h-screen flex wave-bg'>
      <div className='w-1/2 flex flex-col gap-2 place-items-center'>
        <h1 className='text-white text-4xl font-bold'>Classy Minigames</h1>
        <div className='p-2 bg-[#FBAE3C] rounded'>
          <Link href='/minigames/keypad-decryption' className='font-bold'>
            Keypad Decryption
          </Link>
        </div>
      </div>
      <div className='w-1/2'></div>
    </main>
  );
}
