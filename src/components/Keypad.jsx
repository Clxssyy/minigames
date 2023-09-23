const Keypad = (props) => {
  return (
    <div className='grid grid-cols-4 border border-black'>
      {props.numbers.map((number, index) => {
        const row = Math.floor(index / 4);
        let color;
        if (row % 2 === 0) {
          if (index % 2 === 0) {
            color = 'bg-zinc-600';
          } else {
            color = 'bg-zinc-700';
          }
        } else {
          if (index % 2 === 0) {
            color = 'bg-zinc-700';
          } else {
            color = 'bg-zinc-600';
          }
        }
        return (
          <button
            onClick={() => {
              if (props.start) {
                if (number === props.activeNumber) {
                  document.getElementById(number).style.backgroundColor =
                    'green';
                  props.setActiveNumber((prevNumber) => prevNumber + 1);
                  props.setStatus((x) => [...x, number]);
                } else {
                  document.getElementById(number).style.backgroundColor = 'red';
                  props.setErrors((errors) => errors + 1);
                  props.setStatus((x) => [...x, number]);
                  setTimeout(() => {
                    document.getElementById(number).style.backgroundColor = '';
                  }, 500);
                }
              }
            }}
            className={`${color} p-4 text-green-700 font-bold text-center select-none`}
            key={number}
            id={number}
          >
            {number}
          </button>
        );
      })}
    </div>
  );
};

export default Keypad;
