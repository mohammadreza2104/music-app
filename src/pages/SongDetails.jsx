import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';

const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailQuery({ songid });
  const { data, isFetchingRelatedSongs, error } = useGetSongRelatedQuery({ songid });
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };
  if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Searching song details" />;

  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">
          Lyrics:
        </h2>
        <div className="mt-5">
          {songData?.sections[1].type === 'LYRICS' ? songData?.sections[1].text.map((Line, index) => (
            <p className="text-gray-400 text-base my-1">{Line}</p>

          ))
            : (
              <p className="text-gray-400 text-base my-1">
                Sorry, No Lyrics Found!
              </p>
            )}

        </div>
      </div>
      <RelatedSongs data={data} isPlaying={isPlaying} activeSong={activeSong} handlePause={handlePauseClick} handlePlay={handlePlayClick} />

    </div>

  );
};

export default SongDetails;
