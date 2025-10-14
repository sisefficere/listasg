'use client';
 
import { ProgressProvider } from '@bprogress/next/app';
 
const ProgressBar = ({ children }) => {
  return (
    <ProgressProvider 
      height="5px"
      color="#0000FF"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};
 
export default ProgressBar;