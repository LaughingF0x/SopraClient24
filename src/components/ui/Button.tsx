import React from "react";
import PropTypes from "prop-types";
import "../../styles/ui/Button.scss";

export const Button = props => (
  <button
    {...props}
    style={{width: props.width, ...props.style}}
    className={`primary-button ${props.className}`}>
    {props.children}
  </button>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.string,
  onClick: PropTypes.func,
};


