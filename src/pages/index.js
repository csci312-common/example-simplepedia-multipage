import {useState, useEffect} from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';


export default function Home() {
  const [titles, setTitles] = useState([]);

  useEffect(()=>{
    const fetchTitles = async ()=>{
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}api/titles`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const titleList = await response.json();

      setTitles(titleList);
    };

    fetchTitles();

  }, []);


  const titleList = titles.map((titleItem)=>(
    <li key={titleItem.id}>
      <Link href={`/article/${titleItem.id}`}>
        <a>{titleItem.title}</a>
      </Link>
    </li>
  ));


  return (
    <Layout>
    <ul>
      {titleList}
    </ul>

    </Layout>
  )
}
