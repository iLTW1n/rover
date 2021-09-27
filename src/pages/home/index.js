import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import { Card, ControlCenter, Loader } from 'components';
import './styles.scss';

const Home = () => {
  const [reloadInfinite, setReloadInfinite] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [controlCenter, setControlCenter] = useState({});
  const [photos, setPhotos] = useState([]);

  const handleLoadMorePhotos = async (props) => {
    const { page, camera, earth_date, sol, rover = 'curiosity', photos } = props;

    setLoading(true);
    setHasMore(false);

    try {
      const { data } = await window.axios({
        method: 'GET',
        url: `mars-photos/api/v1/rovers/${rover}/photos`,
        params: {
          page,
          camera,
          earth_date,
          sol,
        },
      });

      setPhotos([...photos, ...data.photos]);
      setLoading(false);
      setReloadInfinite(true);

      if (data.photos.length) setHasMore(true);
    } catch (error) {
      setPhotos([]);
      setLoading(false);
    }
  };

  const handleLoadMoreItems = (page) => {
    setHasMore(false);

    handleLoadMorePhotos({
      ...controlCenter,
      photos,
      page,
    });
  };

  const handleControlCenterChange = (props) => {
    setReloadInfinite(false);
    const { rover, camera, earth_date, sol } = props;
    const data = {
      photos: [],
      page: 1,
      rover: rover.value,
      camera: camera?.value,
      sol,
      earth_date: earth_date ? moment(earth_date).format('YYYY-MM-DD') : undefined,
    };

    setControlCenter(data);
    handleLoadMorePhotos(data);
  };

  return (
    <div className='page-home'>
      <div className='page-home__content'>
        <h1 className='page-home__title'>
          ROVER
        </h1>
        <div className='page-home__control-center'>
          <ControlCenter onChange={handleControlCenterChange} />
        </div>
        { reloadInfinite && !!photos.length && (
          <InfiniteScroll
            pageStart={1}
            hasMore={hasMore}
            loadMore={handleLoadMoreItems}
            threshold={500}
            className='page-home__cards'
          >
            { photos.map((photo) => <Card key={photo.id} {...photo} />) }
          </InfiniteScroll>
        )}

        { !photos.length && !loading && (
          <div className='page-home__empty'>
            No results found
          </div>
        )}

        { loading && <Loader /> }
      </div>
    </div>
  );
};

export default Home;
