import React, { useState, useEffect } from 'react';

import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

const lambda = () => {};

const DatetimePicker = ({ value, onChange = lambda, disabled = false }) => {
  const [date, setDate] = useState(value ? new Date(value) : new Date());
  const [time, setTime] = useState(date);

  useEffect(() => {
    const newDate = value ? new Date(value) : new Date();
    setDate(newDate);
    setTime(newDate);
  }, [value]);

  const handleChange = (date, time) => {
    setDate(date);
    setTime(time);
    const newDate = new Date(date);
    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());
    newDate.setSeconds(0, 0);
    onChange(newDate);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          position: 'relative'
        }}
      >
        <DatePicker
          value={date.toDateString()}
          onChange={(date) => handleChange(date, time)}
          disabled={disabled}
          standalone={false}
        />
        <TimePicker
          value={time}
          onChange={(time) => handleChange(date, time)}
          disabled={disabled}
          standalone={false}
          unshift={true}
        />
      </div>
    </div>
  );
};

export default DatetimePicker;
