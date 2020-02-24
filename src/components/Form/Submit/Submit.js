import React from 'react';
import { useFormikContext } from 'formik';
import Button from '../../Button/Button';

const Submit = ({ text, style = {}, ...props }) => {
  const form = useFormikContext();
  return (
    <Button
      type="submit"
      style={{
        width: '100%',
        height: 58,
        marginTop: 32,
        textTransform: 'none',
        ...style,
      }}
      {...props}
      onClick={form.handleSubmit}
      title={text}
    />
  );
};

export default Submit;
