import { render } from '@testing-library/react';
import { Card } from 'components';

test('Card', () => {
  const props = {
    id: 102693,
    sol: 1000,
    camera: {
      id: 20,
      name: 'FHAZ',
      rover_id: 5,
      full_name: 'Front Hazard Avoidance Camera'
    },
    img_src: 'http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG',
    earth_date: '2015-05-30',
    rover: {
      id: 5,
      name: 'Curiosity',
      landing_date: '2012-08-06',
      launch_date: '2011-11-26',
      status: 'active'
    }
  };
  const component = render(<Card { ...props } />);

  component.getByText('Curiosity');
  component.getByText('2012-08-06');
  component.getByText('2011-11-26');
  component.getByText('2015-05-30');
  component.getByText(1000);
  component.getByText('active');
})
