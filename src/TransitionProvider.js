import React from 'react';
import withTransitionEffect from './withTransitionEffect';

const time = 900; // time in ms that the transition lasts for

// We can make providers for different effect types that
// want to have in your application.
// So in this case we might want to call this component ScrollProvider
// based on the styling below.
const scrollTransition = {
  transition: `max-height ${time}ms ease-in-out, margin ${time}ms ease-in-out`,
}

const TransitionProvider = React.forwardRef(({ animationStyle, children, ...otherProps }, ref) => {
  return (
    <div ref={ref} style={animationStyle} {...otherProps}>
      {children}
    </div>
  );
});

export default withTransitionEffect(scrollTransition, time)(TransitionProvider);
