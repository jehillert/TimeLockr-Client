/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { EntryFormDialog } from 'components';
import { ErrorBoundary } from 'utilities';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  fab: {
    margin: theme.spacing(),
  },
});

function EntryFormDialogButton(props) {
  const {
    classes,
    refresh,
    userId,
    username,
  } = props;

  return (
    <>
      <ErrorBoundary>
        <EntryFormDialog
          refresh={refresh}
          userId={userId}
          username={username}
        />
      </ErrorBoundary>
    </>
  );
}

EntryFormDialogButton.propTypes = {
  classes: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
};

export default withStyles(styles)(EntryFormDialogButton);
