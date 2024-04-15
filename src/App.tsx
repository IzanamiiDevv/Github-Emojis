import { useEffect, useState } from 'react';
import Image from './Image';
import './App.css';

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [ emojis, updateEmojis ] = useState<object[] | null>(null);
  const [ value, setValue ] = useState('');

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await fetch('https://api.github.com/emojis');
        if (!response.ok) {
          throw new Error('Failed to fetch emojis');
        }
        const data = await response.json();
        updateEmojis(Object.entries(data).map(([name, url])=>{
          return {
            name:name,
            url:url
          }
        }));
      } catch (error:any) {
        setError(error.message || 'Failed to fetch emojis');
      } finally {setLoading(false);}
    };

    fetchEmojis();
  }, []);

  //Loading Point

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="Home">
      <h1>Explore All Github Emojis!!</h1>
      <input type="text" onChange={e => setValue(e.target.value)} value={value}/>
      <div className='display'>
        {((function(){
          
          type EmojisArray = {
            name:string;
            url:string;
          }

          const newSet:any = emojis?.filter((item:any)=>{
            return item.name.includes(value.toLowerCase());
          });

          return newSet.map((item:EmojisArray,index:number)=>{
            return (
              <Image url={item.url} key={index}/>
            );
          });
        })())}
      </div>
    </div>
  );
}
