import React, { Component } from 'react';
import ResizeDetector from 'react-resize-detector';

const hiddenStyle = {
  maxHeight: '0px',
  margin: '0',
  overflowY: 'hidden',
}

export default (effectStyle, speed = 300) => (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        attached: false,
        effectStyle: effectStyle,
      }
    };

    getMaxHeight = () => {
      return this.WrappedComponentRef.scrollHeight.toString() + 'px';
    }

    removeOverflow = () => {
      const overflowY = 'hidden';
      const { effectStyle } = this.state;
      this.setState({ scrollStyle: { ...effectStyle, overflowY }});
    }

    onResize = () => {
      const { effectStyle } = this.state;
      const maxHeight = this.getMaxHeight();
      this.setState({ effectStyle: { ...effectStyle, maxHeight } });
    }

    componentDidAppear() {
      const maxHeight = this.getMaxHeight();
      const { effectStyle } = this.state;
      this.setState({ effectStyle: { ...effectStyle, maxHeight }, attached: true });
    }

    componentWillEnter(next) {
      const { effectStyle } = this.state;
      this.setState({ effectStyle: { ...effectStyle, ...hiddenStyle }, attached: true });
      setTimeout(next, 10); // Required to prevent transition from being optimized out by browser
    }

    componentDidEnter() {
      const overflowY = 'hidden';
      const maxHeight = this.getMaxHeight();
      const { effectStyle } = this.state;
      this.setState({ effectStyle: { ...effectStyle, maxHeight, overflowY }, attached: true });
      setTimeout(this.removeOverflow, speed);
    }

    componentWillLeave(next) {
      const { effectStyle } = this.state;
      this.setState({ effectStyle: { ...effectStyle, ...hiddenStyle }});
      setTimeout(next, speed);
    }

    render() {
      const { effectStyle, attached } = this.state;

      return (
        <>
          <WrappedComponent
            ref={ref => {
              // The following check will allow this hoc to be used with a
              // redux connected component
              if (ref && ('getWrappedInstance' in ref)) {
                this.WrappedComponentRef = ref.getWrappedInstance();
              } else if (ref) {
                this.WrappedComponentRef = ref;
              }
            }}
            animationStyle={effectStyle}
            {...this.props}
          />
          { attached &&
            <ResizeDetector
              handleWidth
              refreshMode="debounce"
              refreshRate={25}
              onResize={this.onResize}
            />
          }
        </>
      )
    }
  }
}