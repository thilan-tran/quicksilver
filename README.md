<p align="center">
  <img
    width="500"
    src="https://user-images.githubusercontent.com/44995807/92296179-a8cb3580-eee6-11ea-8b58-6d27145ed5da.jpg"
  />
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@thilan-tran/qss">
    <img src="https://img.shields.io/npm/v/@thilan-tran/qss" />
  </a>
  <a href="https://www.npmjs.com/package/@thilan-tran/qss">
    <img src="https://img.shields.io/bundlephobia/minzip/@thilan-tran/qss/1.0.0" />
  </a>
</p>
<h1 align="center">Quicksilver</h1>

**Quicksilver** is a minimal library of material design inspired React components for common, medium-complexity UI elements
such as date pickers, time pickers, dropdowns, and other inputs (with more componetns coming in the future!).

As of `v1`, the `DatePicker`, `TimePicker`, and `DatetimePicker` components are supported.

The library is very lightweight at under only `5kb` zipped, with no external libraries.

- [Screens](#screens)
- [Installation](#installation)
- [Usage](#usage)

## Screens
<p align="center">
  <img
    width="500"
    src="https://user-images.githubusercontent.com/44995807/92985956-1984cb80-f46c-11ea-846a-7095ce393e33.gif"
  />
</p>

## Installation
```bash
$ npm install @thilan-tran/qss # qss == quicksilver styles
```
## Usage
```js
import { DatePicker, TimePicker, DatetimePicker } from '@thilan-tran/qss';

import '@thilan-tran/qss/lib/main.css'; // import styles
```
As of `v1`, the following time and datepicker components are supported by the library:
- `TimePicker`, `DatePicker`, and `DatetimePicker`.

Each support the following `props`:
- `value: Date object or ISO timestamp` - Default value of the picker. If this value is changed, the picker will update accordingly *as well*.
- `onChange: (val) => {}` - Function that is called whenever the date or time is changed. `val` is a JS `Date` object. For the `DatetimePicker`, all the fields are up to date, and seconds and milliseconds are zeroed out. For the `DatePicker`, hours, minutes, seconds, and milliseconds are zeroed out. For the `TimePicker`, the current date of the object is set to the current day.
- `disabled: boolean` - Disable the picker.
