import React, { useState, useEffect, useRef } from 'react';

const months = [
  { name: 'JAN', days: 31 },
  { name: 'FEB', days: 28 },
  { name: 'MAR', days: 31 },
  { name: 'APR', days: 30 },
  { name: 'MAY', days: 31 },
  { name: 'JUN', days: 30 },
  { name: 'JUL', days: 31 },
  { name: 'AUG', days: 31 },
  { name: 'SEP', days: 30 },
  { name: 'OCT', days: 31 },
  { name: 'NOV', days: 30 },
  { name: 'DEC', days: 31 }
];

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// find the offset in days from Sunday for the first of a month
const getOffset = (month, year) => {
  const date = new Date();
  date.setDate(1);
  date.setMonth(month);
  date.setFullYear(year);
  return date.getDay();
};

const makeCleanDate = (val) => {
  const date = val ? new Date(val) : new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0, 0);
  return date;
};

const formatDate = (date) =>
  `${(date.getMonth() + 1 + '').padStart(2, '0')}/${(
    date.getDate() + ''
  ).padStart(2, '0')}/${date.getFullYear()}`;

const cursorBreakpoints = [
  // cursor position breakpoints for the format:
  // 'mm/dd/yyyy'
  [0, 2],
  [3, 5],
  [6, 10]
];

const lambda = () => {};

const DatePicker = ({
  value,
  onChange = lambda,
  disabled = false,
  standalone = true,
  unshift = false
}) => {
  const [date, setDate] = useState(makeCleanDate(value));
  const [viewDate, setViewDate] = useState([
    // current month and date in view
    date.getMonth(),
    date.getFullYear()
  ]);
  const [offset, setOffset] = useState(getOffset(viewDate[0], viewDate[1]));
  const [closed, setClosed] = useState(true);
  const [cursorPos, setCursorPos] = useState([0, 0]);

  const ref = useRef();
  const inputRef = useRef();

  useEffect(() => {
    setDate(makeCleanDate(value));
  }, [value]);

  useEffect(() => {
    inputRef.current &&
      inputRef.current.setSelectionRange(cursorPos[0], cursorPos[1]);
  }, [cursorPos]);

  useEffect(() => {
    // update offset when view month/date changes
    setOffset(getOffset(viewDate[0], viewDate[1]));
  }, [viewDate]);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setClosed(true); // click outside picker closes dropdown
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // highlight currently selected day and round border for certain grid items
  const checkClasses = (day) => {
    let hl = '',
      rnd = '';
    if (
      day === date.getDate() &&
      viewDate[0] === date.getMonth() &&
      viewDate[1] === date.getFullYear()
    ) {
      hl = 'highlight';
    }
    if (months[viewDate[0]].days === 28 && offset === 0) {
      // special case, only 28 days in Feb
      if (day === 22) {
        // bot left corner: 7 * 3 + 1
        rnd = 'round-bot-left';
      } else if (day === 28) {
        // bot left corner: 7 * 4
        rnd = 'round-bot-right';
      }
    } else {
      if (day + offset === 29) {
        // bot left corner: 7 * 4 + 1
        rnd = 'round-bot-left';
      } else if (day + offset === 35) {
        // bot right corner: 7 * 5
        rnd = 'round-bot-right';
      }
    }
    return `${hl} ${rnd}`;
  };

  const generateNewDate = (day, month, year) => {
    const date = new Date();
    date.setMonth(month);
    date.setFullYear(year);
    date.setDate(day);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0, 0);
    return date;
  };

  const setInitCursorPositions = (currPos) => {
    if (currPos < cursorBreakpoints[1][0]) {
      setCursorPos([...cursorBreakpoints[0]]);
    } else if (currPos < cursorBreakpoints[2][0]) {
      setCursorPos([...cursorBreakpoints[1]]);
    } else {
      setCursorPos([...cursorBreakpoints[2]]);
    }
  };

  const setNextCursorPositions = (currPos, month, day, year) => {
    if (currPos <= cursorBreakpoints[1][0]) {
      month > 1
        ? setCursorPos([...cursorBreakpoints[1]])
        : setCursorPos([currPos + 1, currPos + 1]);
    } else if (currPos <= cursorBreakpoints[2][0]) {
      day > parseInt(months[month - 1].days / 10)
        ? setCursorPos([...cursorBreakpoints[2]])
        : setCursorPos([currPos + 1, currPos + 1]);
    } else {
      year > 2000
        ? setCursorPos([...cursorBreakpoints[0]])
        : setCursorPos([currPos + 1, currPos + 1]);
    }
  };

  const handleInputChange = (e) => {
    const str = e.target.value;
    const currPos = e.target.selectionStart;
    let newDate, month, day, year;

    try {
      const matches = str.match(/(\d*)\/(\d*)\/(\d*)/);
      if (!matches || matches.length < 4) {
        throw 'Invalid string.';
      }
      month = parseInt(matches[1]);
      day = parseInt(matches[2]);
      year = parseInt(matches[3]);

      if (isNaN(month) || isNaN(day) || isNaN(year)) {
        throw 'Not a number.';
      }
      month = month < 1 ? 1 : month > 12 ? 12 : month;
      const maxDays = months[month - 1].days;
      day = day < 1 ? 1 : day > maxDays ? maxDays : day;
      newDate = generateNewDate(day, month - 1, year);
    } catch (err) {
      console.log(err, 'Invalid input string', str);
      setInitCursorPositions(currPos);
      return;
    }
    setViewDate([newDate.getMonth(), newDate.getFullYear()]);
    setDate(newDate);
    onChange(newDate);
    setNextCursorPositions(currPos, month, day, year);
  };

  return (
    <div
      className={`quicksilver-styles dropdown-grid ${
        standalone ? 'standalone' : ''
      }`}
    >
      <input
        type="text"
        className={`input ${disabled ? 'disable' : ''}`}
        ref={inputRef}
        placeholder="dd/mm/yyyy"
        value={formatDate(date)}
        onChange={handleInputChange}
        onClick={(e) => {
          if (!disabled) {
            setClosed(false);
          }
          setInitCursorPositions(e.target.selectionStart);
        }}
      />
      <div
        className={`content date-grid-columns ${
          disabled || closed ? '' : 'expand'
        } ${unshift ? 'unshift' : ''}`}
        ref={ref}
      >
        <div
          className="round-top-left"
          style={{ gridColumn: '1/3' }}
          onClick={() => {
            if (viewDate[0] === 0) {
              setViewDate([11, viewDate[1] - 1]);
            } else {
              setViewDate([viewDate[0] - 1, viewDate[1]]);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={{ height: '20px' }}
          >
            <path
              d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"
              fill="#777"
            />
          </svg>
        </div>
        <div
          style={{ gridColumn: '3/6', lineHeight: '23px' }}
          onClick={() => setViewDate([date.getMonth(), date.getFullYear()])}
        >
          {months[viewDate[0]].name} {viewDate[1]}
        </div>
        <div
          className="round-top-right"
          style={{ gridColumn: '6/8' }}
          onClick={() => {
            if (viewDate[0] === 11) {
              setViewDate([0, viewDate[1] + 1]);
            } else {
              setViewDate([viewDate[0] + 1, viewDate[1]]);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={{ height: '20px' }}
          >
            <path
              d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"
              fill="#777"
            />
          </svg>
        </div>
        {days.map((day) => (
          <div
            key={day}
            style={{ backgroundColor: '#ddd', fontSize: '13px' }}
            className="no-hover"
          >
            {day}
          </div>
        ))}
        {[...Array(offset).keys()].map((num) => (
          <div key={num} className="no-hover" />
        ))}
        {[...Array(months[viewDate[0]].days).keys()].map((num) => (
          <div
            key={num}
            className={checkClasses(num + 1)}
            onClick={() => {
              const newDate = generateNewDate(
                num + 1,
                viewDate[0],
                viewDate[1]
              );
              onChange(newDate);
              setDate(newDate);
              setClosed(true);
            }}
          >
            {num + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
