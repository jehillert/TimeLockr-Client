import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#b2dfdb',
  },
  barColorPrimary: {
    backgroundColor: '#00695c',
  },
})(LinearProgress);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function ProgressBar(props) {
  const { loading } = props;
  const classes = useStyles();
  const [query, setQuery] = React.useState('idle');

  return (
    <div className={classes.placeholder}>
      <Fade
        in={loading}
        style={{
          transitionDelay: loading ? '800ms' : '0ms',
        }}
        unmountOnExit
      >
       <ColorLinearProgress />
      </Fade>
    </div>
  );
}

ProgressBar.propTypes = {
  loading:PropTypes.bool.isRequired,
}
