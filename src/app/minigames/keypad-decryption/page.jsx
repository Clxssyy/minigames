import Keypad from '@/components/Keypad';

const KeypadPage = () => {
  return (
    <main className='min-h-screen flex flex-col gap-2 place-items-center wave2-bg'>
      <div className='p-4'>
        <h1 className='text-4xl text-white font-bold text-center'>
          Keypad Decryption
        </h1>
      </div>
      <Keypad />
    </main>
  );
};

export default KeypadPage;
