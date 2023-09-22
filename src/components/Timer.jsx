const Timer = (props) => {
  return (
    <div id='timer'>
      <div id='progress' style={{ width: `${props.width}%` }}></div>
    </div>
  );
};

export default Timer;
