import { Tooltip } from '@chakra-ui/react';
import React from 'react';

const reactsArray = [
  {
    name: 'love',
    image: '../../../reacts/love.gif',
  },
  {
    name: 'haha',
    image: '../../../reacts/haha.gif',
  },
  {
    name: 'wow',
    image: '../../../reacts/wow.gif',
  },
  {
    name: 'sedih',
    image: '../../../reacts/sedih.gif',
  },
  {
    name: 'marah',
    image: '../../../reacts/marah.gif',
  },
];

const ReactsPopup = ({ visible, setVisible, reactHandler }) => {
  return (
    <>
      {visible && (
        <div
          className="react_popup"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
        >
          {reactsArray.map((react, i) => (
            <div
              className="react"
              key={i}
              onClick={() => reactHandler(react?.name)}
            >
              <img src={react?.image} alt={react?.name} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ReactsPopup;
