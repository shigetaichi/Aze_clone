import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {PostThumbnail} from '../components';
import styles from '../components-style/Slick.module.css';

const Slick = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrow: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },{
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
  };
  
  return (
    <React.Fragment>
    <Slider {...settings} className={styles.slick}>
      {props.thumbnailDataArray.map((thumbnailData, i) => (
        <PostThumbnail
          key={i}
          id={thumbnailData.id}
          title={thumbnailData.title}
          image={thumbnailData.mainVisual.url}
          description={thumbnailData.description}
        />
      ))}
    </Slider>
    </React.Fragment>
  )
}

export default Slick
