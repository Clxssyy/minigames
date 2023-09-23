const Keypad = (props) => {
  return (
    <div className='grid grid-cols-4'>
      {props.numbers.map((number, index) => {
        const row = Math.floor(index / 4);
        let color;
        if (row % 2 === 0) {
          if (index % 2 === 0) {
            color = 'bg-zinc-800';
          } else {
            color = 'bg-zinc-900';
          }
        } else {
          if (index % 2 === 0) {
            color = 'bg-zinc-900';
          } else {
            color = 'bg-zinc-800';
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
                }
              }
            }}
            className={`${color} p-4 text-green-900 font-bold text-center`}
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
