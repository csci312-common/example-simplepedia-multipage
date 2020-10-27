import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/Layout';
import styles from '../../styles/Article.module.css';

export default function Article() {
  const [article, setArticle] = useState();
  const router = useRouter();

  useEffect(()=>{
    const fetchArticle = async ()=>{
      const url = `${process.env.NEXT_PUBLIC_HOSTNAME}api/articles/${router.query.id}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const articleData = await response.json();

      setArticle(articleData);
    };

    if (router.query.id){
      fetchArticle();
    }
    
  }, [router.query]);

  let content;

  if (article) {
    content = (<div className={styles.article}>
        <h2 className={styles['article-title']}>{article.title}</h2>
        <p className={styles['article-text']}>{article.extract}</p>
        <p className={styles['article-timestamp']}>
          {new Date(article.edited).toLocaleString()}
        </p>
      </div>)
  }else{
    content = (<p>Loading...</p>);
  }




  return (
    <Layout>
      {content}


      <Link href="/"><a>Table of contents</a></Link>
    </Layout>
  )
}

