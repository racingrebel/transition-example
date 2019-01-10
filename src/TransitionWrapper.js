import React from 'react';
import withTransitionEffect from './withTrasitionEffect';

const TransitionProvider = React.forwardRef(({ animationStyle, children, ...otherProps }, ref) => {
  return (
    <div ref={ref} style={animationStyle} {...otherProps}>
      {children}
    </div>
  );
});

export default withTransitionEffect()(TransitionProvider);
