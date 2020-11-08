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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '24%',
    margin: 5,
    "@media (max-width: 1024px)":{
      margin: '0 0 10px 0.5%',
    },
    "@media (max-width: 900px)":{
      width: '31%',
      margin: '0 0 10px 2%',
    },
    "@media (max-width: 480px)":{
      width: '48%',
      margin: '0 0 10px 1%',
    },
    "@media (max-width: 380px)":{
      width: '92%',
      margin: '0 auto 10px',
    }
  },
  media: {
    height: 140,
  },
  content: {
    "@media (max-width: 1024px)":{
      padding: '10px',
    },
    "@media (max-width: 480px)":{
      padding: '5px',
    }
  }
}));

const PostThumbnail = (props) => {
  const classes = useStyles();
  
  return (
    <Link href="/posts/[id]" as={`/posts/${props.id}`}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.image}
            title="Contemplative Reptile"
          />
          <CardContent className={classes.content}>
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