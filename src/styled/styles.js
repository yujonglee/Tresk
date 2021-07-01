export const button = {
  border: 0,
  textDecoration: 'none',
  '&:hover': {
    fontWeight: 'bold',
  },
};

export const actionButton = {
  ...button,
  backgroundColor: 'beige',
};

export const titleButton = {
  ...button,
  background: 'transparent',
  marginBottom: 8,

};

const styles = { button, actionButton, titleButton };

export default styles;
