export const getSizes = (size: string) => {
  switch (size) {
    case 'sm':
      return {
        avatar: 'md',
        image: 8,
        button: 16,
        container: 12,
      };
    case 'md':
      return {
        avatar: 'lg',
        image: 12,
        button: 20,
        container: 16,
      };
    case 'lg':
      return {
        avatar: 'xl',
        image: 20,
        button: 28,
        container: 24,
      };
    case 'xl':
      return {
        avatar: '2xl',
        image: 24,
        button: 36,
        container: 32,
      };
    default:
      return {
        avatar: 'lg',
        image: 12,
        button: 24,
        container: 24,
      };
  }
};
