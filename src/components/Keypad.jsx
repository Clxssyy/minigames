const Keypad = (props) => {
  return (
    <div className='grid grid-cols-4'>
      {props.numbers.map((number, index) => {
        const row = Math.floor(index / 4);
        let color;
        if (row % 2 === 0) {
          if (number % 2 === 0) {
            color = '800';
          } else {
            color = '900';
          }
        } else {
          if (number % 2 === 0) {
            color = '900';
          } else {
            color = '800';
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
                } else {
                  document.getElementById(number).style.backgroundColor = 'red';
                  props.setErrors((prevErrors) => prevErrors + 1);
                }
              }
            }}
            className={`bg-zinc-${color} p-4 text-green-900 font-bold text-center`}
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
