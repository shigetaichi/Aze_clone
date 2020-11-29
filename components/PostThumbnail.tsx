import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
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
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export default PostThumbnail
