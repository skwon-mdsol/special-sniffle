import React from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import FormControl from 'react-bootstrap/lib/FormControl';

// TODO: Move all of these to lego

// a generic wrapper for all the bootstrap parts of a redux-form field
// other than the actual input, so the rest can be shared between different types
export const FormField = ({
  input: {name},
  meta: {dirty, invalid, error, form},
  label, children, showErr}) => {
  const validationState = showErr ? 'error' : undefined;
  return <FormGroup id={`${form}-${name}`} validationState={validationState}>
    <ControlLabel>{label}</ControlLabel>
    {children}
    {showErr && <HelpBlock>{error}</HelpBlock>}
  </FormGroup>;
};

// a component to encapsulate a redux-form Field for a text input
export const TextField = (props) => {
  const {input: {value, onChange},
         meta: {dirty, invalid, submitFailed}} = props;
  const showErr = (dirty && invalid) || (submitFailed && invalid);
  return <FormField {...props} showErr={showErr}>
    <FormControl type='text' value={value} onChange={onChange} />
  </FormField>;
};

// a component to encapsulate a redux-form Field for a select input
export const SelectField = (props) => {
  const {input: {value, onChange},
         meta: {touched, invalid, submitFailed},
         options, placeholder} = props;
  const showErr = (touched && invalid) || (submitFailed && invalid);
  return <FormField {...props} showErr={showErr}>
    <FormControl componentClass='select' placeholder={placeholder} value={value} onChange={onChange}>
      <option />
      {options}
    </FormControl>
  </FormField>;
};
