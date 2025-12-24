export type LoadState<T> =
  | { status: 'success'; data: T }
  | { status: 'error' }
  | { status: 'loading' };
