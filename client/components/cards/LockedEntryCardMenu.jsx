/* eslint-disable react-hooks/exhaustive-deps */
/*
  ! NEXT TIME THERE ARE TWO THINGS THAT OPEN, GIVE THEM DISTINCT NAMES.  VERY DISTINCT NAMES
*/
import * as Debug from 'debug';
import React, { useEffect, useState } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { deleteEntry } from 'utilities';
import { TimeExtensionDialog } from 'components';

const debug = Debug('client:components:locked-entry-card-menu');

const S = {};

S.IconButton = styled(IconButton)`
  &.s-icon-button {
    padding: 11px 5px 11px 5px;
  }
`;

function LockedEntryCardMenu(props) {
  const { entryId, releaseDate, refresh } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [shouldRenderDialog, setShouldRenderDialog] = useState(false);

  useEffect(() => {
    debug(`
      entryId:  ${entryId}
      selected: ${selected}
      open:     ${open}
      anchorEl: ${anchorEl}
    `);

    if (selected === 'extend') {
      setShouldRenderDialog(sRD => !sRD);
    }

    if (selected === 'delete') {
      deleteEntry(entryId)
        .then(() => refresh());
    }

    // "the function passed to useEffect may return a clean-up function"
    return () => {
      setOpen(false);
      setAnchorEl(null);
      setSelected('');
    };
  }, [entryId, refresh, selected]);

  useEffect(() => setShouldRenderDialog(false), [releaseDate]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleShouldRenderDialog = () => {
    setShouldRenderDialog(false);
  };

  return (
    <>
      {shouldRenderDialog
        && (
          <TimeExtensionDialog
            entryId={entryId}
            releaseDate={releaseDate}
            refresh={refresh}
            handleOpen={handleShouldRenderDialog}
            open={shouldRenderDialog}
          />
        )
      }
      <S.IconButton
        aria-label='More'
        aria-owns={open ? 'right-card-menu' : undefined}
        aria-haspopup='true'
        className='s-icon-button'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </S.IconButton>
      {open
        && (
          <ClickAwayListener onClickAway={() => setSelected('noSelection')}>
            <Paper>
              <Menu
                id='right-card-menu'
                anchorEl={anchorEl}
                open={open}
              >
                <MenuItem data-value='extend' onClick={() => setSelected('extend')}>
                  <ListItemIcon>
                    <HourglassEmptyIcon />
                  </ListItemIcon>
                  <ListItemText inset primary='Extend Time' />
                </MenuItem>
                <MenuItem data-value='delete' onClick={() => setSelected('delete')}>
                  <ListItemIcon>
                    <DeleteOutlineIcon />
                  </ListItemIcon>
                  <ListItemText inset primary='Delete Entry' />
                </MenuItem>
                <MenuItem data-value='close' onClick={() => setSelected('noSelection')}>
                  <ListItemIcon>
                    <CloseIcon />
                  </ListItemIcon>
                  <ListItemText inset primary='Exit' />
                </MenuItem>
              </Menu>
            </Paper>
          </ClickAwayListener>
        )}
    </>
  );
}

LockedEntryCardMenu.propTypes = {
  entryId: PropTypes.number.isRequired,
  releaseDate: PropTypes.string.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default LockedEntryCardMenu;
