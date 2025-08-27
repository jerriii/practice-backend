import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

export function Loading() {
  return null;
}

// Start progress bar when navigation starts
export function startLoading() {
  nprogress.start();
}

// Complete progress bar when navigation ends
export function completeLoading() {
  nprogress.done();
}
