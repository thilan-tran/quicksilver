<p align="center">
  <img
    width="500"
    src="https://user-images.githubusercontent.com/44995807/92296179-a8cb3580-eee6-11ea-8b58-6d27145ed5da.jpg"
  />
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@thilan-tran/quicksilver">
    <img src="https://img.shields.io/npm/v/@thilan-tran/quicksilver" />
  </a>
  <a href="https://www.npmjs.com/package/@thilan-tran/quicksilver">
    <img src="https://img.shields.io/bundlephobia/minzip/@thilan-tran/quicksilver/1.0.1" />
  </a>
</p>
<h1 align="center">Quicksilver</h1>

**Quicksilver** is a minimal library of material design inspired React components for common, medium-complexity UI elements
such as date pickers, time pickers, dropdowns, and other inputs (with more componetns coming in the future!).

As of `v1`, the `DatePicker`, `TimePicker`, and `DatetimePicker` components are supported.

The library is very lightweight at under `50kb` zipped, with no external libraries besides React and ReactDOM.

## Installation
```bash
$ npm install @thilan-tran/quicksilver
```
## Usage
```js
import { DatePicker, TimePicker, DatetimePicker } from '@thilan-tran/quicksilver';
```
As of `v1`, the following time and datepicker components are supported by the library:
- `TimePicker`, `DatePicker`, and `DatetimePicker`.

Each support the following `props`:
- `value: Date object or ISO timestamp` - Default value of the picker. If this value is changed, the picker will update accordingly *as well*.
- `onChange: (val) => {}` - Function that is called whenever the date or time is changed. `val` is a JS `Date` object. For the `DatetimePicker`, all the fields are up to date, and seconds and milliseconds are zeroed out. For the `DatePicker`, hours, minutes, seconds, and milliseconds are zeroed out. For the `TimePicker`, the current date of the object is set to the current day.
- `disabled: boolean` - Disable the picker.
