const Keypad = (props) => {
  return (
    <div className='grid grid-cols-4'>
      {props.numbers.map((number, index) => {
        const row = Math.floor(index / 4);
        if (row % 2 === 0) {
          if (number % 2 === 0) {
            return (
              <button
                onClick={() => {
                  if (props.start) {
                    if (number === props.activeNumber) {
                      document.getElementById(number).style.backgroundColor =
                        'green';
                      props.setActiveNumber((prevNumber) => prevNumber + 1);
                    } else {
                      document.getElementById(number).style.backgroundColor =
                        'red';
                      props.setErrors((prevErrors) => prevErrors + 1);
                    }
                  }
                }}
                className={`bg-zinc-800 p-4 text-green-900 font-bold text-center`}
                key={number}
                id={number}
              >
                {number}
              </button>
            );
          } else {
            return (
              <button
                onClick={() => {
                  if (props.start) {
                    if (number === props.activeNumber) {
                      document.getElementById(number).style.backgroundColor =
                        'green';
                      props.setActiveNumber((prevNumber) => prevNumber + 1);
                    } else {
                      document.getElementById(number).style.backgroundColor =
                        'red';
                      props.setErrors((prevErrors) => prevErrors + 1);
                    }
                  }
                }}
                className={`bg-zinc-900 p-4 text-green-900 font-bold text-center`}
                key={number}
                id={number}
              >
                {number}
              </button>
            );
          }
        } else {
          if (number % 2 !== 0) {
            return (
              <button
                onClick={() => {
                  if (props.start) {
                    if (number === props.activeNumber) {
                      document.getElementById(number).style.backgroundColor =
                        'green';
                      props.setActiveNumber((prevNumber) => prevNumber + 1);
                    } else {
                      document.getElementById(number).style.backgroundColor =
                        'red';
                      props.setErrors((prevErrors) => prevErrors + 1);
                    }
                  }
                }}
                className={`bg-zinc-800 p-4 text-green-900 font-bold text-center`}
                key={number}
                id={number}
              >
                {number}
              </button>
            );
          } else {
            return (
              <button
                onClick={() => {
                  if (props.start) {
                    if (number === props.activeNumber) {
                      document.getElementById(number).style.backgroundColor =
                        'green';
                      props.setActiveNumber((prevNumber) => prevNumber + 1);
                    } else {
                      document.getElementById(number).style.backgroundColor =
                        'red';
                      props.setErrors((prevErrors) => prevErrors + 1);
                    }
                  }
                }}
                className={`bg-zinc-900 p-4 text-green-900 font-bold text-center`}
                key={number}
                id={number}
              >
                {number}
              </button>
            );
          }
        }
      })}
    </div>
  );
};

export default Keypad;
