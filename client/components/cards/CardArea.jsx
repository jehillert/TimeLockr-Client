import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Box,
  CardWrapper,
  Header,
} from 'components';

const S = {};

S.CardArea = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
  margin-top: 1rem;
  max-width: ${props => props.theme.cardAreaWidth};
`;

const CardArea = (props) => {
  const {
    id,
    Card,
    delayIncrement,
    entries,
    refresh,
    title,
  } = props;

  const hasChildren = !!entries.length;

  const [showEntries, updateShowEntries] = useState(false);

  useEffect(() => {
    updateShowEntries(true);
  }, []);

  return (
    <S.CardArea id={id} >
      {title && <Header text={title} level='3' mx={2} />}
      {(hasChildren && showEntries) && (
        entries.map((entry, index) => (
          <CardWrapper
            key={entry.entryId.toString()}
            delay={index * delayIncrement}
            render={wrapper => (
              <Card
                key={entry.entryId.toString()}
                wrapper={wrapper}
                entry={entry}
                refresh={refresh}
              />
            )}
          />
        ))
      )}
    </S.CardArea>
  );
};

CardArea.defaultProps = {
  id: 'card-area',
  title: '',
};

CardArea.propTypes = {
  id: PropTypes.string,
  Card: PropTypes.elementType.isRequired,
  delayIncrement: PropTypes.number.isRequired,
  entries: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  title: PropTypes.string,
  refresh: PropTypes.func.isRequired,
};

export default CardArea;
