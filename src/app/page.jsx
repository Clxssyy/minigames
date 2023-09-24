'use client';

import Keypad from '@/components/Keypad';
import Timer from '@/components/Timer';
import { useEffect, useState } from 'react';
import { IoIosFingerPrint } from 'react-icons/io';

export default function Home() {
  const [width, setWidth] = useState(100);
  const [numbers, setNumbers] = useState(
    Array.from({ length: 24 }, (x, i) => i + 1)
  );
  const [activeNumber, setActiveNumber] = useState(1);
  const [errors, setErrors] = useState(0);
  const [status, setStatus] = useState([]);
  const [time, setTime] = useState(30);
  const [start, setStart] = useState(false);
  const [difficulty, setDifficulty] = useState(0);

  useEffect(() => {
    // Game Started - Display Random Pattern of Numbers
    if (start) {
      setNumbers(() => {
        const range = 4 * (6 + difficulty);
        const arr = [];
        const newArr = [];

        for (let i = 1; i <= range; i++) arr.push(i);

        for (let i = 0; i < range; i++) {
          const index = Math.floor(Math.random() * arr.length);
          newArr.push(arr[index]);
          arr.splice(index, 1);
        }

        return newArr;
      });
    }

    // Game Ended - Reset Game States
    if (!start) {
      for (const x of status) {
        document.getElementById(x).style.backgroundColor = '';
      }
      setStatus([]);

      const errorDisplay = document.getElementById('errors');
      errorDisplay.childNodes.forEach((x) => {
        x.style.backgroundColor = '';
      });

      setWidth(100);
      setErrors(0);
      setActiveNumber(1);
    }
  }, [start]);

  useEffect(() => {
    const updateProgress = () => {
      setWidth((width) => {
        if (width > 0) {
          return width - 100 / time;
        } else {
          setStart(!start);
          return 100;
        }
      });
    };

    if (start) {
      const intervalId = setInterval(updateProgress, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [time, start]);

  useEffect(() => {
    const errorDisplay = document.getElementById('errors');

    if (errors !== 0) {
      errorDisplay.childNodes[errors - 1].style.backgroundColor = 'red';
    }

    // Lose Condition
    if (errors === 3) {
      setStart(!start);
    }
  }, [errors]);

  useEffect(() => {
    // Win Condition
    if (activeNumber === numbers.length + 1) {
      setStart(!start);
    }
  }, [activeNumber]);

  useEffect(() => {
    if (!start) {
      setNumbers([]);
      const range = 4 * (6 + difficulty);
      for (let i = 1; i <= range; i++) setNumbers((prev) => [...prev, i]);
    }
  }, [difficulty]);

  return (
    <main className='h-screen flex flex-col gap-2 place-items-center justify-center p-4 bg-stone-500'>
      <h1 className='text-4xl font-bold'>Mini Game</h1>
      <div className='flex gap-4'>
        <div>
          <h2 className='text-2xl font-bold'>Difficulty</h2>
          <p className='text-2xl font-bold'>{difficulty}</p>
        </div>
      </div>
      <div className='h-full flex gap-2 place-items-center justify-center'>
        <div id='options' className='flex flex-col gap-2'>
          <div className='flex gap-2'>
            <select id='difficulty-options' aria-label='difficulty-options'>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
            <button
              onClick={() => {
                if (!start) {
                  const newDifficulty =
                    document.getElementById('difficulty-options').value;
                  setDifficulty(Number(newDifficulty));
                }
              }}
              className='bg-green-900 rounded p-2'
            >
              Set Difficulty
            </button>
          </div>
          <div className='flex gap-2'>
            <input
              type='number'
              id='time-input'
              min={1}
              max={60}
              defaultValue={30}
              aria-label='time-input'
            />
            <button
              onClick={() => {
                if (!start) {
                  const newTime = document.getElementById('time-input').value;
                  setTime(newTime);
                  document.getElementById('time-input').value = 30;
                }
              }}
              className='bg-green-900 rounded p-2'
            >
              Set Time
            </button>
          </div>
        </div>
        <div className='p-2 bg-zinc-700 rounded gap-2 flex flex-col place-items-center'>
          <div
            id='minigame'
            className='w-72 bg-zinc-800 flex flex-col gap-2 p-4 rounded'
          >
            <div id='errors' className='flex gap-1'>
              <div className='h-2 w-2 rounded-full bg-neutral-400'></div>
              <div className='h-2 w-2 rounded-full bg-neutral-400'></div>
              <div className='h-2 w-2 rounded-full bg-neutral-400'></div>
            </div>
            <Timer width={width} />
            <Keypad
              numbers={numbers}
              activeNumber={activeNumber}
              setActiveNumber={setActiveNumber}
              setErrors={setErrors}
              setStatus={setStatus}
              start={start}
            />
          </div>
          <div className='flex place-items-center'>
            <button
              onClick={() => {
                setStart(!start);
              }}
              className='rounded-full w-12 h-12 flex place-items-center justify-center text-5xl text-zinc-800'
            >
              <IoIosFingerPrint />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
