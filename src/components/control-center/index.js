import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import moment from 'moment';
import { Button } from 'components';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

const rovers = [
  { value: 'curiosity', label: 'Curiosity' },
  { value: 'opportunity', label: 'Opportunity' },
  { value: 'spirit', label: 'Spirit' },
];

const cameras = [
  { value: 'FHAZ', label: 'Front Hazard Avoidance Camera', rovers: ['curiosity', 'opportunity', 'spirit'] },
  { value: 'RHAZ', label: 'Rear Hazard Avoidance Camera', rovers: ['curiosity', 'opportunity', 'spirit'] },
  { value: 'MAST', label: 'Mast Camera', rovers: ['curiosity'] },
  { value: 'CHEMCAM', label: 'Chemistry and Camera Complex', rovers: ['curiosity'] },
  { value: 'MAHLI', label: 'Mars Hand Lens Imager', rovers: ['curiosity'] },
  { value: 'MARDI', label: 'Mars Descent Imager', rovers: ['curiosity'] },
  { value: 'NAVCAM', label: 'Navigation Camera', rovers: ['curiosity', 'opportunity', 'spirit'] },
  { value: 'PANCAM', label: 'Panoramic Camera', rovers: ['opportunity', 'spirit'] },
  { value: 'MINITES', label: 'Miniature Thermal Emission Spectrometer (Mini-TES)', rovers: ['opportunity', 'spirit'] },
];

const ControlCenter = ({ onChange }) => {
  const [rover, setRover] = useState(rovers[0]);
  const [camera, setCamera] = useState(null);
  const [sol, setSol] = useState('1000');
  const [earthDate, setEarthDate] = useState(moment().subtract(1, 'days').toDate());
  const [isEarthDate, setIsEarthDate] = useState(true);

  const handleRoverChange = (rover) => {
    setRover(rover);
    setCamera(null);
  };

  const handleSearchClick = () => {
    const data = {
      rover,
      camera,
      sol: !isEarthDate ? sol : undefined,
      earth_date: isEarthDate ? earthDate : undefined,
    };

    onChange(data);
  };

  const handleSearchDisabled = () => {
    if (!isEarthDate) return !sol.length;
    return false;
  };

  useEffect(() => {
    handleSearchClick();
  }, []);

  return (
    <div className='component-control-center'>
      <div className='component-control-center__rover'>
        <span>Rover</span>
        <Select
          value={rover}
          onChange={handleRoverChange}
          options={rovers}
          className='component-control-center__select'
        />
      </div>
      <div className='component-control-center__rover'>
        <span>Camera</span>
        <Select
          value={camera}
          isClearable
          onChange={setCamera}
          options={cameras.filter((camera) => camera.rovers.some((rvr) => rvr === rover.value))}
          className='component-control-center__select'
        />
      </div>
      <div className='component-control-center__earth-date'>
        <div className='component-control-center__earth-date-header'>
          <input
            name='earth_date'
            id='earth_date'
            type='radio'
            checked={isEarthDate}
            onChange={() => setIsEarthDate(true)}
          />
          <label htmlFor='earth_date'>Earth Date</label>
        </div>
        <DatePicker
          selected={earthDate}
          onChange={(date) => setEarthDate(date)}
          maxDate={new Date()}
          disabled={!isEarthDate}
          className='component-control-center__calendar'
          onChangeRaw={(event) => event.preventDefault()}
        />
      </div>
      <div className='component-control-center__earth-date'>
        <div className='component-control-center__earth-date-header'>
          <input
            name='sol'
            id='sol'
            type='radio'
            checked={!isEarthDate}
            onChange={() => setIsEarthDate(false)}
          />
          <label htmlFor='sol'>Sol</label>
        </div>
        <input
          type='text'
          maxLength={4}
          pattern='\d{1,5}'
          disabled={isEarthDate}
          className='component-control-center__sol'
          value={sol}
          onChange={(event) => {
            const value = event.target.value.replace(/[^0-9/]+/g, '');
            setSol(value);
          }}
        />
      </div>
      <div className='component-control-center__search'>
        <Button onClick={handleSearchClick} disabled={handleSearchDisabled()}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default ControlCenter;
