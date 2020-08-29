import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './fade.css';

const Fade = ({ children, classNames, ...props }) => {
  return (
    <CSSTransition classNames={classNames} timeout={1000} {...props} appear>
      {children}
    </CSSTransition>
  );
};

export default Fade;
