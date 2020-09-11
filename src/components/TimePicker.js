import React, { useState, useEffect, useRef } from 'react';

const makeCleanTime = (val) => {
  const date = val ? new Date(val) : new Date();
  date.setSeconds(0, 0);
  return date;
};

// rows to offset from top and bottom of grid columns,
// depends on max height of grid and height of each row:
// 210 / 30 = 7 -> 3 row offset centers first and last row
const offsetRows = 3;

const cursorBreakpoints = [
  // cursor position breakpoints for the format:
  // 'hh:mm am'
  [0, 2],
  [3, 5]
];

const lambda = () => {};

const TimePicker = ({
  value,
  onChange = lambda,
  disabled = false,
  standalone = true,
  unshift = false
}) => {
  const [time, setTime] = useState(makeCleanTime(value));
  const [closed, setClosed] = useState(true);
  const [cursorPos, setCursorPos] = useState([0, 0]);

  const ref = useRef();
  const hourRef = useRef();
  const minuteRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    setTime(makeCleanTime(value));
  }, [value]);

  useEffect(() => {
    inputRef.current &&
      inputRef.current.setSelectionRange(cursorPos[0], cursorPos[1]);
  }, [cursorPos]);

  const scrollRef = (ref, offset) => {
    const elem = ref.current;
    if (!elem) {
      return;
    }
    const parent = elem.parentNode;
    parent.scrollTo({
      top: elem.offsetTop - offset,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    scrollRef(hourRef, 90);
    scrollRef(minuteRef, 90);
  }, [time]);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setClosed(true);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const getHours = (timeParam = null) => {
    const hours = timeParam ? timeParam.getHours() : time.getHours();
    if (hours === 0 || hours === 12) {
      return 12;
    }
    return hours > 12 ? hours - 12 : hours;
  };
  const getMinutes = (timeParam = null) =>
    timeParam ? timeParam.getMinutes() : time.getMinutes();
  const getAmpm = (timeParam = null) => {
    const hrs = timeParam ? timeParam.getHours() : time.getHours();
    return hrs >= 12 ? 'PM' : 'AM';
  };

  const formatTime = (time) => {
    const hours = (getHours(time) + '').padStart(2, '0');
    const minutes = (getMinutes(time) + '').padStart(2, '0');
    const ampm = getAmpm(time);
    const str = `${hours}:${minutes} ${ampm}`;
    return str;
  };

  const setInitCursorPositions = (currPos) => {
    if (currPos < cursorBreakpoints[1][0]) {
      setCursorPos([...cursorBreakpoints[0]]);
    } else {
      setCursorPos([...cursorBreakpoints[1]]);
    }
  };

  const setNextCursorPositions = (currPos, hours, minutes) => {
    if (currPos <= cursorBreakpoints[1][0]) {
      hours > 1
        ? setCursorPos([...cursorBreakpoints[1]])
        : setCursorPos([currPos + 1, currPos + 1]);
    } else {
      minutes > 5
        ? setCursorPos([...cursorBreakpoints[0]])
        : setCursorPos([currPos + 1, currPos + 1]);
    }
  };

  return (
    <div className={`dropdown-grid ${standalone ? 'standalone' : ''}`}>
      <input
        type="text"
        className={`input ${disabled ? 'disable' : ''}`}
        ref={inputRef}
        placeholder="00:00 AM"
        value={formatTime(time)}
        onChange={(e) => {
          const str = e.target.value;
          const currPos = e.target.selectionStart;
          let newTime, hours, minutes;

          try {
            const matches = str.match(/(\d*)\:(\d*).*/);
            if (!matches || matches.length < 3) {
              throw 'Invalid string.';
            }
            hours = parseInt(matches[1]);
            minutes = parseInt(matches[2]);

            hours = hours < 0 ? 0 : hours > 12 ? 12 : hours;
            minutes = minutes < 0 ? 0 : minutes > 59 ? 59 : minutes;
            if (isNaN(hours) || isNaN(minutes)) {
              throw 'Not a number.';
            }
          } catch (err) {
            console.log(err, 'Invalid input string', str);
            setInitCursorPositions(currPos);
            return;
          }

          newTime = new Date(time);
          if (getAmpm() === 'AM') {
            if (hours === 12) newTime.setHours(0);
            else newTime.setHours(hours);
          } else {
            if (hours === 12) newTime.setHours(12);
            else newTime.setHours(hours + 12);
          }
          newTime.setMinutes(minutes);
          setTime(newTime);
          onChange(newTime);
          setNextCursorPositions(currPos, hours, minutes);
        }}
        onClick={(e) => {
          if (!disabled) {
            setClosed(false);
          }
          setInitCursorPositions(e.target.selectionStart);
        }}
      />
      <div
        className={`content time-grid-columns ${
          disabled || closed ? '' : 'expand'
        } ${unshift ? 'unshift' : ''}`}
        ref={ref}
      >
        <div className="no-hover round-left">
          {[...Array(3).keys()].map((i) => (
            <p key={`offsettop-${i}`} className="no-hover" />
          ))}
          {[...Array(12).keys()].map((num) => (
            <p
              key={num}
              ref={getHours() === num + 1 ? hourRef : null}
              className={getHours() === num + 1 ? 'highlight' : ''}
              onClick={() => {
                const newTime = new Date(time);
                if (getAmpm() === 'AM') {
                  if (num + 1 === 12) newTime.setHours(0);
                  else newTime.setHours(num + 1);
                } else {
                  if (num + 13 === 24) newTime.setHours(12);
                  else newTime.setHours(num + 13);
                }
                setTime(newTime);
                onChange(newTime);
                inputRef.current && inputRef.current.focus();
                setCursorPos([...cursorBreakpoints[1]]);
              }}
            >
              {(num + 1 + '').padStart(2, '0')}
            </p>
          ))}
          {[...Array(3).keys()].map((i) => (
            <p key={`offsetbot-${i}`} className="no-hover" />
          ))}
        </div>
        <div className="no-hover">
          {[...Array(3).keys()].map((i) => (
            <p key={`offsettop-${i}`} className="no-hover" />
          ))}
          {[...Array(60).keys()].map((num) => (
            <p
              key={num}
              ref={getMinutes() === num ? minuteRef : null}
              className={getMinutes() === num ? 'highlight' : ''}
              onClick={() => {
                const newTime = new Date(time);
                newTime.setMinutes(num);
                setTime(newTime);
                onChange(newTime);
                inputRef.current && inputRef.current.focus();
                setCursorPos([...cursorBreakpoints[0]]);
              }}
            >
              {(num + '').padStart(2, '0')}
            </p>
          ))}
          {[...Array(3).keys()].map((i) => (
            <p key={`offsetbot-${i}`} className="no-hover" />
          ))}
        </div>
        <div
          className="no-hover round-right"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
          }}
        >
          {['AM', 'PM'].map((id) => (
            <p
              key={id}
              className={getAmpm() === id ? 'highlight' : ''}
              onClick={(e) => {
                const newTime = new Date(time);
                const hours = newTime.getHours();
                if (id === 'PM' && hours < 12) {
                  newTime.setHours(hours + 12);
                } else if (id === 'AM' && hours >= 12) {
                  newTime.setHours(hours - 12);
                }
                setTime(newTime);
                onChange(newTime);
                inputRef.current && inputRef.current.focus();
                setCursorPos([...cursorBreakpoints[0]]);
              }}
            >
              {id}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
