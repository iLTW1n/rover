import React, { memo } from 'react';
import './styles.scss';

const Card = ({ earth_date, rover, sol, img_src }) => (
  <div className='component-card'>
    <img
      src={img_src}
      alt={rover.id}
      className='component-card__image'
    />
    <div className='component-card__description'>
      <div className='component-card__detail'>
        <span>Name:</span>{ rover.name }
      </div>
      <div className='component-card__detail'>
        <span>Landing Date:</span>{ rover.landing_date }
      </div>
      <div className='component-card__detail'>
        <span>Launch Date:</span>{ rover.launch_date }
      </div>
      <div className='component-card__detail'>
        <span>Earth Date:</span>{ earth_date }
      </div>
      <div className='component-card__detail'>
        <span>Sol:</span>{ sol }
      </div>
      <div className='component-card__detail'>
        <span>Status:</span>{ rover.status }
      </div>
    </div>
  </div>
);

export default memo(Card);
