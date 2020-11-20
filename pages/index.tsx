import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import React from 'react';
import {GetStaticProps} from 'next';
import Container from '@material-ui/core/Container';
import Layout from '../components/globals/Layout';
import { Title, Slick, PostFlex, Button, CategoryArea, Hamburger } from '../components';
import { getSortedPostData } from '../lib/post';
import { getAllCategoryData } from '../lib/category';

const indexStyle = {
  fontFamily: 'serif',
  margin: '0 auto 80px',
}


export const getStaticProps: GetStaticProps = async () => {
  const allPostData = await getSortedPostData();
  const categories = await getAllCategoryData();
  return {
    props: {
      allPostData,
      categories
    }
  }
}

const Home = ({allPostData, categories}) => {
  const thumbnailDataArray = allPostData.map(post => {
    const id = post.id;
    const title = post.title;
    const eyecatch = post.eyecatch;
    const description = post.description;
    const tag = post.tag;
    return {
      id: id,
      title: title,
      eyecatch: eyecatch,
      description: description,
      tag: tag,
    }
  });

  return(
    <Layout home title="ホーム">
    <Hamburger/>
      <Container maxWidth="lg">
        <Container maxWidth="sm">
          <div style={indexStyle}>
            <p>このサイトはアゼルバイジャンと日本をつなぐブログです。</p>
            <p>当サイトの管理者である私は日本人です。</p>
            <p>このサイトを開設した当時は、アゼルバイジャンに関する日本語の記事がネット上にほとんどなく、情報収集に苦労しました。</p>
            <p>そこで、AZERBAIJAPANが日本とアゼルバイジャンの架け橋になればと思っています。</p>
            <p style={{display: "none",}}>Dear S.K.</p>
            <p>This website is a blog to connect Azerbaijan and Japan.</p>
            <p>I am the administrator of this website and I am Japanese.</p>
            <p>At the time of setting up this website, there were very few articles about Azerbaijan in Japanese on the net, so it was very difficult to collect information.</p>
            <p>So, I hope that AZERBAIJAPAN will become a bridge between Japan and Azerbaijan.</p>
          </div>
        </Container>
        <Title title={"SELECTED EIGHT"} subtitle={"当サイトの厳選記事を確認しましょう"} />
        <PostFlex thumbnailDataArray={thumbnailDataArray} isPaginate={false}/>
        <div className="module-spacer--medium"></div>
        <div className="module-spacer--medium"></div>
        <Title title={"POSTS"} subtitle={"出来立ての投稿はいかが？"} />
        {/* <Slick thumbnailDataArray={thumbnailDataArray} /> */}
        <PostFlex thumbnailDataArray={thumbnailDataArray} perPage={8} isPaginate={false}/>
        <div className="module-spacer--medium"></div>
        <Button text={"See All Posts"} path={"/allposts"} />
        <div className="module-spacer--medium"></div>
        <div className="module-spacer--medium"></div>
        <div className="module-spacer--medium"></div>
        <Title title={"CATEGORIES"} subtitle={"アゼルバイジャン語を学ぶならどれでしょうか"}/>
        <CategoryArea categories={categories} />
      </Container>
    </Layout>
  )
}

export default Home;