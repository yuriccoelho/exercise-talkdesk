import clsx from 'clsx';
import { useState } from 'react';

import data from './Dropdown.data.json';

import './Dropdown.css';

const Dropdown = () => {
  const { options, title } = data;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(-1);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (i: number) => {
    setIsOpen(!isOpen);
    setSelectedOption(i);
  };

  return (
    <div className="dropdown">
      <div
        onClick={toggleDropdown}
        className={clsx('dropdown__toggle', 'dropdown__list-item', isOpen && 'dropdown__toggle--active')}
      >
        {title}
        <i className="fa fa-angle-down" aria-hidden="true"></i>
      </div>

      <ul className={clsx('dropdown__list', isOpen && 'dropdown__list--active')}>
        {options.map((option, i) => (
          <li
            key={i}
            onClick={(evt) => handleClick(i)}
            className={clsx('dropdown__list-item', i === selectedOption && 'dropdown__list-item--active')}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
