import Link from 'next/link';

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col gap-2 place-items-center bg-stone-500'>
      <div className='p-2'>
        <h1 className='text-4xl font-bold text-center'>Classy Minigames</h1>
      </div>
      <div>
        <ul className='list-disc'>
          <li>
            <Link href='/minigames/keypad-decryption'>Keypad Decryption</Link>
          </li>
        </ul>
      </div>
      <div className='p-2 flex flex-col place-items-center'>
        <h2 className='text-2xl font-bold'>Coming Soon</h2>
        <ul className='list-disc'>
          <li>
            <Link href='/'>temp</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
