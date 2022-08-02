import React from 'react';
import jsonData from '../../data/card-data.json';
import './Cards.scss';

const Cards = () => (
  <div className="cards">
    <div className="cards__container">
      <div className="cards__outercontainer">
        {jsonData.map(record => (
          <div className="cards__content" key={record.cardHeading}>
            <div className="cards__text">
              <h6 className="cards__heading">{record.cardHeading}</h6>
            </div>
            <div className="cards__subtext">
              <ul className="cards__list">
                <li className="cards__item">{record.cardList}</li>
                <li className="cards__item">{record.cardListItem}</li>
                <li className="cards__item">{record.cardListItems}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Cards;
