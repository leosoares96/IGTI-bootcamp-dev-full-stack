import React from 'react';

export default function className(props) {
  const { value, title, step } = props;
  const handleValueInput = (event) => {
    const { value } = event.target;
    props.onChangeInput(value);
  };
  return (
    <div className="input-field col s4">
      <input
        id="email"
        type="number"
        value={value}
        step={step}
        onChange={handleValueInput}
      />
      <label htmlFor="email" className="active">
        {title}:
      </label>
    </div>
  );
}
