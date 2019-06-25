import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  CardArea,
  LockedEntryCard,
  ReleasedEntryCard,
} from 'components';
// import useWindowSize from '@rehooks/window-size';

const S = {};

S.Div = styled.div`
  grid-area: ${props => props.gridArea};
`;

S.VerticallyScrollableArea = styled.div`
  height: 89.9vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
      display: none;
    }
`;

S.Tabs = styled(Tabs)`
  margin-right: 1.5rem;
  margin-left: 1.5rem;
  background-color: white;
  box-shadow: ${props => props.theme.boxShadow};
`;

const styles = theme => ({});

function CardAreaTabs(props) {
  // const windowSize = useWindowSize();
  const {
    entries,
    gridArea,
    refresh,
    theme,
  } = props;

  const [value, setValue] = useState(0);

  const handleChange = (event, v) => setValue(v);
  const handleChangeIndex = index => setValue(index);

  return (
    <S.Div gridArea={gridArea}>
      <S.Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        variant='fullWidth'
      >
        <Tab label='Unlocked' />
        <Tab label='Locked' />
      </S.Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <S.VerticallyScrollableArea>
          <CardArea
            mt={2}
            id='card-area-released'
            Card={ReleasedEntryCard}
            delayIncrement={100}
            entries={entries.released}
            refresh={refresh}
          />
        </S.VerticallyScrollableArea>
        <S.VerticallyScrollableArea>
          <CardArea
            id='card-area-locked'
            Card={LockedEntryCard}
            delayIncrement={100}
            entries={entries.locked}
            refresh={refresh}
          />
        </S.VerticallyScrollableArea>
      </SwipeableViews>
    </S.Div>
  );
}

CardAreaTabs.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  entries: PropTypes.shape({
    locked: PropTypes.array,
    released: PropTypes.array,
  }).isRequired,
  gridArea: PropTypes.string.isRequired,
  refresh: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
};

S.Div.propTypes = {
  gridArea: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(CardAreaTabs);
