import React from 'react';
import Link from 'next/link';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styles from '../components-style/PostThumbnail.module.css';
import ClassNames from 'classnames';
import { useThemeContext } from '../context/context';
import { useLangContext } from '../context/langContext';

const PostThumbnail = (props) => {
  const themeNames = useThemeContext();
  const langTheme = useLangContext();
  const PostThumbnailStyle = ClassNames(styles.content, {
    [styles.contentDark]: themeNames.themeName === 'dark'
  });
  let dummy;
  let tagsArray;
  if(props.tags){
    dummy = props.tags.map(tag => {
      let arr = [];
      for (const [key, value] of Object.entries(tag)) {
        arr.push({'id': key, 'value': value});
      }
      return arr;
    });
    tagsArray = dummy[0];
  }
  
  return (
    <Link href={`/posts/${langTheme.langName}/[id]`} as={`/posts/${langTheme.langName}/${props.id}`}>
      <Card className={styles.root}>
        <CardActionArea>
          <CardMedia
            className={styles.media}
            image={props.image}
            title="Contemplative Reptile"
          />
          <CardContent className={PostThumbnailStyle}>
            <Typography gutterBottom variant="h6" component="h6" className={styles.postThumbnail_title}>
              {props.title}
            </Typography>
            <div className={styles.tagArea}>
              {tagsArray && tagsArray.map((tag, i) => (
                <Link key={i} href={`/tags/${tag.id}`}>
                  <div className={styles.eachTag}>{tag.value}</div>
                </Link>
              ))}
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export default PostThumbnail
