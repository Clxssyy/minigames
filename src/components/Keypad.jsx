'use client';

import Keys from '@/components/Keys';
import Timer from '@/components/Timer';
import { useEffect, useState } from 'react';
import { IoIosFingerPrint } from 'react-icons/io';

const Keypad = () => {
  const [width, setWidth] = useState(100);
  const [numbers, setNumbers] = useState(
    Array.from({ length: 24 }, (x, i) => i + 1)
  );
  const [activeNumber, setActiveNumber] = useState(1);
  const [errors, setErrors] = useState(0);
  const [status, setStatus] = useState([]);
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [difficulty, setDifficulty] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      setWidth((width) => {
        // Lose Condition
        if (width <= 0) {
          setStart(!start);
          return 100;
        } else {
          return width - 100 / time;
        }
      });
    };

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

      updateProgress();
      const intervalId = setInterval(updateProgress, 1000);

      return () => {
        clearInterval(intervalId);
      };
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
    setTime(50 - difficulty * 5);

    setNumbers([]);
    const range = 4 * (6 + difficulty);
    for (let i = 1; i <= range; i++) setNumbers((prev) => [...prev, i]);
  }, [difficulty]);

  return (
    <>
      <div className='p-2 bg-zinc-700 rounded flex flex-col gap-2 place-items-center'>
        <div className='bg-zinc-800 flex flex-col gap-4 p-4 rounded'>
          <div className='flex justify-between'>
            <div id='errors' className='flex gap-1'>
              <div className='h-2 w-2 rounded-full bg-neutral-400'></div>
              <div className='h-2 w-2 rounded-full bg-neutral-400'></div>
              <div className='h-2 w-2 rounded-full bg-neutral-400'></div>
            </div>
            <div
              id='difficulty'
              className='w-8 h-2 rounded group relative'
              style={{
                backgroundPosition: `0% ${difficulty * -33.3 + 100}%`,
              }}
            >
              <div
                className={`invisible absolute bg-zinc-700 left-full top-1/2 transform -translate-y-1/2 rounded p-2
                ${
                  start
                    ? ''
                    : 'group-hover:visible invisible absolute bg-zinc-700'
                }`}
              >
                <select
                  id='difficulty-options'
                  aria-label='difficulty-options'
                  className='p-2 rounded'
                  onChange={() => {
                    if (!start) {
                      const newDifficulty =
                        document.getElementById('difficulty-options').value;
                      setDifficulty(Number(newDifficulty));
                    }
                  }}
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>
            </div>
          </div>
          <Timer width={width} />
          <Keys
            numbers={numbers}
            activeNumber={activeNumber}
            setActiveNumber={setActiveNumber}
            setErrors={setErrors}
            setStatus={setStatus}
            start={start}
          />
        </div>
        <button
          onClick={() => {
            setStart(!start);
          }}
          className='rounded-full w-12 h-12 flex place-items-center justify-center text-5xl text-zinc-800'
          aria-label='start-button'
        >
          <IoIosFingerPrint />
        </button>
      </div>
    </>
  );
};

export default Keypad;
