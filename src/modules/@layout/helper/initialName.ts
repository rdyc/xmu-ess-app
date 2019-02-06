export const initialName = (name: string): string => {
  let result = '';

  const split = name.split(' ');

  result = `${split[0].charAt(0).toUpperCase()}${split.length > 1 ? split[1].charAt(0).toUpperCase() : ''}`;

  return result.trim();
};