import PropTypes from 'prop-types';

export const medidation = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired
  })
});

export const medidations = PropTypes.arrayOf(medidation);
