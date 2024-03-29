import React from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "@react-spring/web";

const Slide = React.forwardRef(function Slide(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: {
      y: -64,
      opacity: 0,
    },
    to: {
      y: open ? 0 : 64,
      opacity: open ? 1 : 0,
    },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Slide.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default Slide;
