import React from 'react';
import Button from '@material-ui/core/Button';

const ButtonWrapper = (props) => <Button {...props}>{props.children}</Button>;

export default ButtonWrapper;
