import React from 'react';
import { motion } from 'framer-motion';

const withMotion = (WrappedComponent, animationProps) => {
  return function WithMotionHOC(props) {
    return (
      <motion.div {...animationProps}>
        <WrappedComponent {...props} />
      </motion.div>
    );
  };
};

export default withMotion;