import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

import { Row } from './styled/Layout';
import Input, { Shared } from './styled/Input';
import Icon, { StaticIcon } from './styled/Icon';
import { Text } from './styled/Global';
import { FullButton } from './styled/Button';

const StyledTaskSection = styled.div`
  position: relative;
  .content {
    visibility: ${(props) => (props.closed ? 'hidden' : 'visible')};
    max-height: ${(props) =>
      props.closed ? 0 : props.customHeight ? props.customHeight : '55vh'};
    overflow: ${(props) => (props.scroll ? 'auto' : 'hidden')};
    opacity: ${(props) => (props.closed ? 0 : 1)};
    transition: all 0.3s ease-in-out, max-height 0.3s ease-in-out;
  }
`;

export const TaskSection = ({
  title,
  emptyPrompt,
  children,
  customHeight,
  onToggle = () => {},
  actionButton = '',
  emptyOpen = false
}) => {
  const [closed, setClosed] = useState(true);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    onToggle(closed);
    // hide scrollbar until animation completes
    if (!closed) {
      setTimeout(() => setScroll(true), 300);
    } else {
      setScroll(false);
    }
  }, [closed]);

  useEffect(() => {
    if (!emptyOpen) {
      setClosed(!children.length);
    } else {
      setClosed(false);
    }
  }, [children.length]);

  const content = children.length ? (
    <>{children}</>
  ) : (
    <FullButton info>{emptyPrompt}</FullButton>
  );

  return (
    <StyledTaskSection
      closed={closed}
      customHeight={customHeight}
      scroll={scroll}
    >
      <Row style={{ margin: '0' }}>
        <Text primary style={{ marginRight: 'auto' }}>
          {title}
        </Text>
        <Icon
          src={closed ? '/arrow-down.svg' : '/arrow-up.svg'}
          onClick={() => setClosed(!closed)}
        />
      </Row>
      <div className="content">{content}</div>
      <div className="content" style={{ overflow: 'visible' }}>
        {actionButton}
      </div>
    </StyledTaskSection>
  );
};

const SelectionWrapper = styled.div`
  ${Shared}

  width: 90%;
  max-height: 250px;
  overflow-y: auto;
  margin: 15px auto;
  padding: 0;
  color: #666;

  .selected {
    background-color: rgba(255, 255, 255, 0.9);
  }

  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 7px;
  transition: opacity 0.25s;

  p {
    margin: 0;
    padding: 10px 15px;
    border-top: 1px solid #909090;
  }

  p:hover {
    background-color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
  }

  p:first-of-type {
    border-radius: 7px 7px 0 0;
    border-top: none;
  }

  p:last-of-type {
    border-radius: 0 0 7px 7px;
  }
`;

export const Selection = ({ selected, onSelect, options }) => {
  return (
    <SelectionWrapper>
      {options.map((option) => (
        <p
          className={selected.includes(option) ? 'selected' : ''}
          key={option}
          onClick={() => {
            onSelect(option);
          }}
        >
          {option}
        </p>
      ))}
    </SelectionWrapper>
  );
};

const SelectionWrapperS = styled.div`
  ${Shared}

  width: 90%;
  max-height: 250px;
  overflow-y: auto;
  margin: 15px auto;
  padding: 0;
  color: #666;

  .selected {
    background-color: rgba(255, 255, 255, 1);
  }

  background-color: rgba(240, 240, 240, 1);
  border: none;
  border-radius: 7px;
  transition: opacity 0.25s;

  p {
    margin: 0;
    padding: 10px 15px;
    border-top: 1px solid #909090;
  }

  p:hover {
    background-color: rgba(248, 248, 248, 1);
    cursor: pointer;
  }

  p:first-of-type {
    border-radius: 7px 7px 0 0;
    border-top: none;
  }

  p:last-of-type {
    border-radius: 0 0 7px 7px;
  }
`;

export const SelectionS = ({ selected, onSelect, options }) => {
  return (
    <SelectionWrapperS>
      {options.map((option) => (
        <p
          className={selected.includes(option) ? 'selected' : ''}
          key={option}
          onClick={() => {
            onSelect(option);
          }}
        >
          {option}
        </p>
      ))}
    </SelectionWrapperS>
  );
};

const DropdownWrapperS = styled.div`
  ${Shared}

  position: relative;
  width: ${(props) => (props.mini ? '100%' : '90%')};
  margin: 15px auto;
  margin: ${(props) => (props.mini ? '15px 0' : '15px auto')};

  font-size: ${(props) => (props.mini ? '12px' : '14px')};
  padding: 0;
  color: #666;
  background-color: rgba(255, 255, 255, 1);
  border-radius: ${(props) => (props.closed ? '7px' : '7px 7px 0 0')};

  & .content {
    position: absolute;
    opacity: ${(props) => (!props.myDisabled && !props.closed ? '1' : '0')};
    width: 100%;
    max-height: ${(props) =>
      !props.myDisabled && !props.closed ? '300px' : '0'};
    overflow: auto;
    margin-top: 2px;

    background-color: rgba(240, 240, 240, 1);
    border: none;
    border-radius: 0 0 7px 7px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    transition: opacity 0.25s;
  }

  & .content-outside {
    position: absolute;
    opacity: ${(props) => (!props.myDisabled && !props.closed ? '1' : '0')};
    // width: 76%;
    width: 100%;
    max-height: ${(props) =>
      !props.myDisabled && !props.closed ? '300px' : '0'};
    overflow: auto;
    margin-top: 2px;
    margin-left: -8px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 0 0 7px 7px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    transition: opacity 0.25s;
  }

  & .content-outside {
    position: absolute;
    opacity: ${(props) => (!props.myDisabled && !props.closed ? '1' : '0')};
    // width: 76%;
    width: 100%;
    max-height: ${(props) =>
      !props.myDisabled && !props.closed ? '300px' : '0'};
    overflow: auto;
    margin-top: 2px;
    margin-left: -8px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 0 0 7px 7px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    transition: opacity 0.25s;
  }

  .content::webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  &:hover {
    cursor: ${(props) => (props.myDisabled ? 'default' : 'pointer')};
  }

  & .content p {
    margin: 0;
    padding: ${(props) => (props.mini ? '5px 10px' : '10px 15px')};
    border-top: 1px solid #909090;
  }

  & .content-outside p {
    margin: 0;
    padding: 10px 15px;
    border-top: 1px solid #909090;
  }

  & .content-outside p {
    margin: 0;
    padding: 10px 15px;
    border-top: 1px solid #909090;
  }

  // & .content p:first-of-type {
  //   border-radius: 10px 10px 0 0;
  // }

  & .content p:last-of-type {
    border-radius: 0 0 7px 7px;
  }

  & .content p:hover {
    background-color: #f8f8f8;
    cursor: pointer;
  }

  .selected {
    background-color: #fff;
  }

  .disabled {
    background-color: rgba(0, 0, 0, 0.1);
  }

  & p.disabled:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: default;
  }
`;

export const DropdownS = ({
  selected,
  onSelect,
  options,
  disabled,
  onClose,
  mini,
  interior = true
}) => {
  /* parent element controls disabled property,
     selecting an option changes the closed property */
  const [closed, setClosed] = useState(true);
  const node = useRef();
  const selectedRef = useRef();

  const scrollRef = (ref, offset) => {
    const elem = ref.current;
    if (elem) {
      const parent = elem.parentNode;
      parent.scrollTop = elem.offsetTop - parent.offsetTop - offset;
    }
  };

  useEffect(() => {
    scrollRef(selectedRef, 80);
  }, [selected]);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setClosed(true);
    onClose(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <DropdownWrapperS
      myDisabled={disabled}
      closed={closed}
      ref={node}
      mini={mini}
    >
      <Row
        onClick={() => {
          if (!disabled) {
            setClosed(!closed);
            onClose(!closed);
          }
        }}
        style={{
          padding: mini ? '5px 10px' : '10px 15px'
        }}
      >
        {disabled ? (
          <div
            style={{
              padding: '2px 12px',
              height: '30px',
              backgroundColor: '#f2bd3f'
            }}
          >
            {selected}
          </div>
        ) : (
          <div style={{ borderRadius: '0px' }}>{selected}</div>
        )}
        {disabled || mini ? (
          ''
        ) : (
          <StaticIcon src={closed ? '/arrow-down.svg' : '/arrow-up.svg'} />
        )}
      </Row>
      <div className={interior ? 'content' : 'content-outside'}>
        {options.map((option) => (
          <p
            ref={
              selected === option || (option.text && selected === option.text)
                ? selectedRef
                : null
            }
            className={
              selected === option || (option.text && selected === option.text)
                ? 'selected'
                : option.disabled
                ? 'disabled'
                : ''
            }
            key={option.key ? option.key : option}
            onClick={() => {
              if (!option.disabled) {
                onSelect(option);
                setClosed(true);
                onClose(true);
              }
            }}
          >
            {option.text ? option.text : option}
          </p>
        ))}
      </div>
    </DropdownWrapperS>
  );
};

const DropdownWrapper = styled.div`
  ${Shared}

  position: relative;
  width: ${(props) => (props.mini ? '100%' : '90%')};
  margin: 15px auto;
  margin: ${(props) => (props.mini ? '15px 0' : '15px auto')};

  font-size: ${(props) => (props.mini ? '12px' : '14px')};
  padding: 0;
  color: #666;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: ${(props) => (props.closed ? '7px' : '7px 7px 0 0')};

  & .content {
    position: absolute;
    opacity: ${(props) => (!props.myDisabled && !props.closed ? '1' : '0')};
    width: 100%;
    max-height: ${(props) =>
      !props.myDisabled && !props.closed ? '300px' : '0'};
    overflow: auto;
    margin-top: 2px;

    background-color: rgba(255, 255, 255, 0.7);
    border: none;
    border-radius: 0 0 7px 7px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    transition: opacity 0.25s;
  }

  & .content-outside {
    position: absolute;
    opacity: ${(props) => (!props.myDisabled && !props.closed ? '1' : '0')};
    // width: 76%;
    width: 100%;
    max-height: ${(props) =>
      !props.myDisabled && !props.closed ? '300px' : '0'};
    overflow: auto;
    margin-top: 2px;
    margin-left: -8px;
    // background-color: #fff;
    background-color: rgba(255, 255, 255, 0.7);
    border: none;
    border-radius: 0 0 7px 7px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    transition: opacity 0.25s;
  }

  & .content-outside {
    position: absolute;
    opacity: ${(props) => (!props.myDisabled && !props.closed ? '1' : '0')};
    // width: 76%;
    width: 100%;
    max-height: ${(props) =>
      !props.myDisabled && !props.closed ? '300px' : '0'};
    overflow: auto;
    margin-top: 2px;
    margin-left: -8px;
    // background-color: #fff;
    background-color: rgba(255, 255, 255, 0.7);
    border: none;
    border-radius: 0 0 7px 7px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    transition: opacity 0.25s;
  }

  .content::webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  &:hover {
    cursor: ${(props) => (props.myDisabled ? 'default' : 'pointer')};
  }

  & .content p {
    margin: 0;
    padding: ${(props) => (props.mini ? '5px 7px' : '10px 15px')};
    border-top: 1px solid #909090;
  }

  & .content-outside p {
    margin: 0;
    padding: 10px 15px;
    border-top: 1px solid #909090;
  }

  & .content-outside p {
    margin: 0;
    padding: 10px 15px;
    border-top: 1px solid #909090;
  }

  // & .content p:first-of-type {
  //   border-radius: 10px 10px 0 0;
  // }

  & .content p:last-of-type {
    border-radius: 0 0 7px 7px;
  }

  & .content p:hover {
    background-color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
  }

  .selected {
    background-color: #fff;
  }

  .disabled {
    background-color: rgba(0, 0, 0, 0.1);
  }

  & p.disabled:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: default;
  }
`;

const Dropdown = ({
  selected,
  onSelect,
  options,
  disabled,
  onClose,
  mini,
  interior = true
}) => {
  /* parent element controls disabled property,
     selecting an option changes the closed property */
  const [closed, setClosed] = useState(true);
  const node = useRef();
  const selectedRef = useRef();

  const scrollRef = (ref, offset) => {
    const elem = ref.current;
    if (elem) {
      const parent = elem.parentNode;
      parent.scrollTop = elem.offsetTop - parent.offsetTop - offset;
    }
  };

  useEffect(() => {
    scrollRef(selectedRef, 80);
  }, [selected]);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setClosed(true);
    onClose(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <DropdownWrapper
      myDisabled={disabled}
      closed={closed}
      ref={node}
      mini={mini}
    >
      <Row
        onClick={() => {
          if (!disabled) {
            setClosed(!closed);
            onClose(!closed);
          }
        }}
        style={{
          padding: mini ? '5px 7px' : '10px 15px'
        }}
      >
        {disabled ? (
          <div
            style={{
              padding: '2px 12px',
              height: '30px',
              backgroundColor: '#f2bd3f'
            }}
          >
            {selected}
          </div>
        ) : (
          <div style={{ borderRadius: '0px' }}>{selected}</div>
        )}
        {disabled || mini ? (
          ''
        ) : (
          <StaticIcon src={closed ? '/arrow-down.svg' : '/arrow-up.svg'} />
        )}
      </Row>
      <div className={interior ? 'content' : 'content-outside'}>
        {options.map((option) => (
          <p
            ref={
              selected === option || (option.text && selected === option.text)
                ? selectedRef
                : null
            }
            className={
              selected === option || (option.text && selected === option.text)
                ? 'selected'
                : option.disabled
                ? 'disabled'
                : ''
            }
            key={option.key ? option.key : option}
            onClick={() => {
              if (!option.disabled) {
                onSelect(option);
                setClosed(true);
                onClose(true);
              }
            }}
          >
            {option.text ? option.text : option}
          </p>
        ))}
      </div>
    </DropdownWrapper>
  );
};

const NumberInput = styled.input`
  ${Shared}

  padding: 5px;
  height: 20px;
  width: 25px;
  border: none;
  border-radius: 10px;
  text-align: center;

  /* Hide spin buttons */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

const DropdownGrid = css`
  & .content {
    position: absolute;
    visibility: ${(props) =>
      !props.myDisabled && !props.closed ? 'visible' : 'hidden'};
    opacity: ${(props) => (!props.myDisabled && !props.closed ? '1' : '0')};
    max-height: ${(props) => (!props.myDisabled && !props.closed ? '' : '0')};
    display: grid;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
    transition: opacity 0.25s;
    z-index: 2;
  }

  & .content div {
    padding: 5px 3px;
  }

  & .content div:hover {
    cursor: pointer;
    color: #000;
    background-color: #e5e5e5;
  }
`;

const DropdownNumpadGrid = styled.div`
  ${DropdownGrid}

  & .content {
    grid-template-columns: 50px 50px 50px;
    margin-top: -5px;
    margin-left: -53px;
  }

  /* round corners */

  & .content div:first-of-type {
    border-radius: 10px 0 0 0;
  }

  & .content div:nth-of-type(3) {
    border-radius: 0 10px 0 0;
  }

  & .content div:nth-of-type(10) {
    border-radius: 0 0 0 10px;
  }

  & .content div:last-of-type {
    border-radius: 0 0 10px 0;
  }
`;

export const NumpadInput = (props) => {
  /* track which digit numpad is changing */
  const [firstDigit, setFirstDigit] = useState(true);
  const [closed, setClosed] = useState(true);

  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setFirstDigit(true);
    setClosed(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const updateNumber = (num) => {
    props.onChange({
      target: { value: firstDigit ? num : props.value * 10 + num }
    });
    setFirstDigit((prev) => !prev);
  };

  return (
    <DropdownNumpadGrid myDisabled={props.disabled} closed={closed} ref={node}>
      <NumberInput {...props} onClick={() => setClosed(!closed)} />
      <div className="content">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div key={num} onClick={() => updateNumber(num)}>
            {num}
          </div>
        ))}
        <div
          onClick={() => {
            updateNumber(0);
            setFirstDigit(true);
          }}
        >
          <StaticIcon src="/close.svg" />
        </div>
        <div onClick={() => updateNumber(0)}>0</div>
        <div
          onClick={() => {
            setClosed(true);
            setFirstDigit(true);
          }}
        >
          <StaticIcon src="/check.svg" />
        </div>
      </div>
    </DropdownNumpadGrid>
  );
};

const DropdownDateGrid = styled.div`
  ${DropdownGrid}
  text-align: left;
  width: 55%;

  & .content {
    width: 100%;
    grid-template-columns: repeat(7, auto);
    margin-left: 0px;
    margin-top: -5px;
    text-align: center;
  }

  & .content .highlight {
    background-color: #5187ed;
    color: #fff;
  }

  & .content .no-highlight:hover {
    background-color: #fff;
  }

  & .content .no-hover:hover {
    cursor: default;
  }

  /* round corners */

  & .content div:first-of-type {
    border-radius: 10px 0 0 0;
  }

  & .content div:nth-of-type(3) {
    border-radius: 0 10px 0 0;
  }

  & .content .round-left {
    border-radius: 0 0 0 10px;
  }

  & .content .round-right {
    border-radius: 0 0 10px 0;
  }
`;

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

const DropdownTimeGrid = styled.div`
  ${DropdownGrid}
  width: calc(30%);
  margin-right: ${(props) => (props.myDisabled ? '0' : '14px')};
  text-align: left;

  & .content {
    width: 100%;
    margin-left: calc(-1 * (70% - 14px));
    margin-top: -5px;
    grid-template-columns: repeat(3, auto);
  }

  & .content div {
    padding: 0;
    max-height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  & .content .hide-scroll::-webkit-scrollbar {
    width: 0;
  }

  & .content .highlighted {
    background-color: #5187ed;
    color: #fff;
  }

  & .content div:hover {
    cursor: default;
    background-color: #fff;
  }

  & .content p {
    width: 100%;
    padding: 8px 5px;
    margin: 0;
    text-align: center;
  }

  & .content p:hover {
    cursor: pointer;
    color: #000;
    background-color: #e5e5e5;
  }

  & .content div:first-of-type {
    border-radius: 10px 0 0 10px;
  }

  & .content div:last-of-type {
    border-radius: 0 10px 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
`;

export const TimePicker = ({ disabled, placeholder, value, onChange }) => {
  const [closed, setClosed] = useState(true);
  const [date, setDate] = useState(new Date(value));
  const [cursorPos, setCursorPos] = useState([0, 0]);

  const node = useRef();
  const hourRef = useRef();
  const minuteRef = useRef();
  const inputRef = useRef();

  const scrollRef = (ref, offset) => {
    const elem = ref.current;
    const parent = elem.parentNode;
    parent.scrollTop = elem.offsetTop - parent.offsetTop - offset;
  };

  useEffect(() => {
    inputRef.current.setSelectionRange(cursorPos[0], cursorPos[1]);
  }, [date, cursorPos]);

  useEffect(() => {
    setDate(new Date(value));
    scrollRef(hourRef, 80);
    scrollRef(minuteRef, 80);
  }, [value]);

  const getHours = (dateParam = null) => {
    const hours = dateParam ? dateParam.getHours() : date.getHours();
    if (hours === 0 || hours === 12) {
      return 12;
    }
    return hours > 12 ? hours - 12 : hours;
  };
  const getMinutes = (dateParam = null) =>
    dateParam ? dateParam.getMinutes() : date.getMinutes();
  const getAmpm = (dateParam = null) => {
    const hrs = dateParam ? dateParam.getHours() : date.getHours();
    return hrs >= 12 ? 'PM' : 'AM';
  };

  const formatTime = (date) => {
    let hours = getHours(date);
    hours = hours < 10 ? `0${hours}` : hours;
    let minutes = getMinutes(date);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const ampm = getAmpm(date);

    const str = `${hours}:${minutes} ${ampm}`;
    return str;
  };

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setClosed(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <DropdownTimeGrid myDisabled={disabled} closed={closed} ref={node}>
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={formatTime(date)}
        onChange={(e) => {
          const k = e.target.value.indexOf(':');
          const l = e.target.value.indexOf(' ');

          let hours = parseInt(e.target.value.substring(0, k));
          let minutes = parseInt(e.target.value.substring(k + 1, l));

          hours = hours < 0 ? 0 : hours > 12 ? 12 : hours;
          minutes = minutes < 0 ? 0 : minutes > 59 ? 59 : minutes;

          const newDate = new Date(date);
          if (getAmpm() === 'AM') {
            if (hours === 12) newDate.setHours(0);
            else newDate.setHours(hours);
          } else {
            if (hours === 12) newDate.setHours(12);
            else newDate.setHours(hours + 12);
          }

          newDate.setMinutes(minutes);

          try {
            newDate.toISOString();
          } catch (err) {
            if (e.target.selectionStart <= 3) {
              setCursorPos([0, 2]);
            } else {
              setCursorPos([3, 5]);
            }
            return;
          }

          setDate(newDate);
          onChange({
            target: { value: newDate }
          });
          if (e.target.selectionStart <= 3) {
            if (hours !== 1) {
              setCursorPos([3, 5]);
            } else {
              setCursorPos([2, 2]);
            }
          } else {
            if (minutes > 5) {
              setCursorPos([0, 2]);
            } else {
              setCursorPos([5, 5]);
            }
          }
        }}
        disabled={disabled}
        myDisabled={disabled}
        onClick={(e) => {
          if (!disabled) setClosed(false);

          if (e.target.selectionStart < 2) {
            e.target.setSelectionRange(0, 2);
          } else {
            e.target.setSelectionRange(3, 5);
          }
        }}
        no-hover
      />
      <div className="content">
        <div>
          {[...Array(12).keys()].map((e) => (
            <p
              ref={getHours() === e + 1 ? hourRef : null}
              className={getHours() === e + 1 ? 'highlighted' : ''}
              onClick={() => {
                const newDate = new Date(date);
                if (getAmpm() === 'AM') {
                  if (e + 1 === 12) newDate.setHours(0);
                  else newDate.setHours(e + 1);
                } else {
                  if (e + 13 === 24) newDate.setHours(12);
                  else newDate.setHours(e + 13);
                }
                setDate(newDate);
                onChange({
                  target: { value: newDate }
                });
              }}
            >
              {e + 1 < 10 ? '0' + (e + 1) : e + 1}
            </p>
          ))}
        </div>
        <div>
          {[...Array(60).keys()].map((e) => (
            <p
              ref={getMinutes() === e ? minuteRef : null}
              className={getMinutes() === e ? 'highlighted' : ''}
              onClick={() => {
                const newDate = new Date(date);
                newDate.setMinutes(e);
                setDate(newDate);
                onChange({
                  target: { value: newDate }
                });
              }}
            >
              {e < 10 ? '0' + e : e}
            </p>
          ))}
        </div>
        <div className="hide-scroll">
          {['AM', 'PM'].map((e) => (
            <p
              className={getAmpm() === e ? 'highlighted' : ''}
              onClick={() => {
                const newDate = new Date(date);
                const hours = newDate.getHours();
                if (e === 'PM' && hours < 12) newDate.setHours(hours + 12);
                else if (e === 'AM' && hours >= 12)
                  newDate.setHours(hours - 12);
                setDate(newDate);
                onChange({
                  target: { value: newDate }
                });
              }}
            >
              {e}
            </p>
          ))}
        </div>
      </div>
    </DropdownTimeGrid>
  );
};

export const DatePicker = (props) => {
  const [closed, setClosed] = useState(true);
  const [date, setDate] = useState(new Date(props.value));
  const [viewDate, setViewDate] = useState({
    month: date.getMonth(),
    year: date.getFullYear()
  });

  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setClosed(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  /* find weekdays offset from Sunday before first of month */
  const getOffset = (month, year) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(month);
    date.setFullYear(year);
    return date.getDay();
  };

  const [offset, setOffset] = useState(
    getOffset(viewDate.month, viewDate.year)
  );

  const updateDate = (month, year) => {
    setViewDate({ month, year });
    setOffset(getOffset(month, year));
  };

  /* check if scheduled day */
  const checkDay = (day) => {
    return (
      day === date.getDate() &&
      viewDate.month === date.getMonth() &&
      viewDate.year === date.getFullYear()
    );
  };

  /* highlight and round the border for certain days */
  const checkClasses = (day) => {
    let hl = '',
      rnd = '';
    if (checkDay(day)) {
      hl = 'highlight';
    }
    if (day + offset === 29) {
      rnd = 'round-left';
    } else if (day + offset === 35) {
      rnd = 'round-right';
    }
    return `${hl} ${rnd}`;
  };

  const generateDateString = (day) => {
    const date = new Date();
    date.setMonth(viewDate.month);
    date.setFullYear(viewDate.year);
    date.setDate(day);
    return date.toDateString();
  };

  return (
    <DropdownDateGrid myDisabled={props.disabled} closed={closed} ref={node}>
      <Input
        {...props}
        myDisabled={props.disabled}
        onClick={(e) => {
          e.target.blur();
          if (!props.disabled) setClosed(!closed);
        }}
        no-hover
      />
      <div className="content">
        <div
          style={{ gridColumn: '1/3' }}
          onClick={() => {
            if (viewDate.month === 0) {
              updateDate(11, viewDate.year - 1);
            } else {
              updateDate(viewDate.month - 1, viewDate.year);
            }
          }}
        >
          <StaticIcon src="/arrow-left.svg" />
        </div>
        <div
          style={{ gridColumn: '3/6', lineHeight: '23px' }}
          onClick={() => updateDate(date.getMonth(), date.getFullYear())}
        >
          {months[viewDate.month].name} {viewDate.year}
        </div>
        <div
          style={{ gridColumn: '6/8' }}
          onClick={() => {
            if (viewDate.month === 11) {
              updateDate(0, viewDate.year + 1);
            } else {
              updateDate(viewDate.month + 1, viewDate.year);
            }
          }}
        >
          <StaticIcon src="/arrow-right.svg" />
        </div>
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
          <div
            key={day}
            style={{ backgroundColor: '#ddd', fontSize: '13px' }}
            className="no-hover"
          >
            {day}
          </div>
        ))}
        {[...Array(offset).keys()].map((num) => (
          <div key={num} className="no-highlight" />
        ))}
        {[...Array(months[viewDate.month].days).keys()].map((num) => (
          <div
            key={num}
            className={checkClasses(num + 1)}
            onClick={() => {
              const newDateStr = generateDateString(num + 1);
              const newDate = new Date(newDateStr);
              props.onChange({
                target: { value: newDate }
              });
              setDate(newDate);
              setClosed(true);
            }}
          >
            {num + 1}
          </div>
        ))}
      </div>
    </DropdownDateGrid>
  );
};

const DateTimeWrapper = styled.div``;

export const DateTimePicker = ({ disabled, placeholder, value, onChange }) => {
  const [date, setDate] = useState(new Date(value));
  const [time, setTime] = useState(new Date(value));

  const handleChange = (date, time) => {
    setDate(date);
    setTime(time);
    const newDate = new Date(date);
    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());
    newDate.setSeconds(0, 0);

    onChange({
      target: { value: newDate }
    });
  };

  return (
    <DateTimeWrapper>
      <Row
        spaceBetween
        style={{
          position: 'relative',
          width: 'calc(90% + 16px)',
          margin: '0 auto',
          marginLeft: disabled ? '8px' : 'auto'
        }}
      >
        <DatePicker
          disabled={disabled}
          placeholder={placeholder}
          value={date.toDateString()}
          onChange={(e) => {
            handleChange(e.target.value, time);
          }}
          style={{ marginLeft: '0px' }}
        />
        <TimePicker
          disabled={disabled}
          placeholder="Time"
          value={time}
          onChange={(e) => {
            handleChange(date, e.target.value);
          }}
          style={{ marginLeft: '13px' }}
        />
      </Row>
    </DateTimeWrapper>
  );
};

export default Dropdown;
