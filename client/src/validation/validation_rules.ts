export const isNotEmpty = (value: string) => {
  return value ? undefined : `must not be empty`;
};

export const minLength = (value: string, min: number) => {
  return min <= value.length
    ? undefined
    : `must be longer than ${min} characters.`;
};
