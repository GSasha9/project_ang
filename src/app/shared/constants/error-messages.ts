export const ERROR_MESSAGES: Record<string, string | ((error: any) => string)> = {
  required: 'This field is required',
  minlength: (e: any) => `Minimum length is ${e.requiredLength}`,
  email: 'Invalid email address',
};
