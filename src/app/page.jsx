'use client';

import Keypad from '@/components/Keypad';
import Timer from '@/components/Timer';
import { useEffect, useState } from 'react';

export default function Home() {
  const [width, setWidth] = useState(0);
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
    for (const x of status) {
      document.getElementById(x).style.backgroundColor = '';
    }
    setStatus([]);
  }, [start]);

  useEffect(() => {
    if (start) {
      setNumbers(() => {
        // randomize numbers
        const range = 4 * (6 + difficulty);
        const arr = [];
        for (let i = 1; i <= range; i++) arr.push(i);
        const newArr = [];
        for (let i = 0; i < range; i++) {
          const index = Math.floor(Math.random() * arr.length);
          newArr.push(arr[index]);
          arr.splice(index, 1);
        }
        setNumbers(newArr);
      });
    }
  }, [start]);

  useEffect(() => {
    if (start) {
      function updateProgress() {
        setWidth((prevWidth) => {
          if (prevWidth > 0) {
            return prevWidth - 100 / time;
          }
          if (prevWidth <= 0) {
            setStart(!start);
            setErrors(0);
            setActiveNumber(1);
          }
        });
      }

      const intervalId = setInterval(updateProgress, 1000); // Adjust the interval duration as needed

      return () => {
        clearInterval(intervalId);
      };
    } else {
      setWidth(100);
    }
  }, [time, start]);

  useEffect(() => {
    if (errors === 3) {
      setErrors(0);
      setActiveNumber(1);
      setStart(!start);
    }
  }, [errors]);

  useEffect(() => {
    if (start) {
      if (activeNumber === numbers.length + 1) {
        setStart(!start);
        setActiveNumber(1);
        setErrors(0);
      }
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
    <main className='h-full w-full flex flex-col gap-2 place-items-center justify-center p-4'>
      <h1 className='text-4xl font-bold'>Mini Game</h1>
      <div className='flex gap-4'>
        <div>
          <h2 className='text-2xl font-bold'>Difficulty</h2>
          <p className='text-2xl font-bold'>{difficulty}</p>
        </div>
        <div>
          <h2 className='text-2xl font-bold'>Errors</h2>
          <p className='text-2xl font-bold'>{errors}/3</p>
        </div>
        <div>
          <h2 className='text-2xl font-bold'>Time</h2>
          <p className='text-2xl font-bold'>{time}</p>
        </div>
      </div>
      <div className='h-full w-full flex gap-2 place-items-center justify-center'>
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
          <div className='flex gap-2'>
            <button
              onClick={() => {
                if (numbers.length > 0) {
                  setStart(!start);
                }
                if (start) {
                  setErrors(0);
                  setActiveNumber(1);
                }
              }}
              className='bg-red-400 p-2'
            >
              {start ? 'Stop' : 'Start'}
            </button>
          </div>
        </div>
        <div className='p-2 bg-zinc-700 rounded'>
          <div
            id='minigame'
            className='w-72 bg-zinc-800 flex flex-col gap-2 p-4 rounded'
          >
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
        </div>
      </div>
    </main>
  );
}
