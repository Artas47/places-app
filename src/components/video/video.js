import React from 'react';
import * as Styled from './video.styles';
import clip from '../../video/background-video.mp4';

const BackgroundVideo = () => {
  return (
    <Styled.Video autoPlay loop muted>
      <source src={clip} type='video/mp4' />
      <source src={clip} type='video/ogg' />
    </Styled.Video>
  );
};

export default BackgroundVideo;
