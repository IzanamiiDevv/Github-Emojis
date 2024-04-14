import { useEffect, useState } from 'react';
import Image from './Image';
import './App.css';

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [ emojis, updateEmojis ] = useState<string[] | null>(null);
  const [ value, setValue ] = useState('');

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await fetch('https://api.github.com/emojis');
        if (!response.ok) {
          throw new Error('Failed to fetch emojis');
        }
        const data = await response.json();
        updateEmojis(Object.values(data));
      } catch (error:any) {
        setError(error.message || 'Failed to fetch emojis');
      } finally {setLoading(false);}
    };

    fetchEmojis();
  }, []);

  //Loading Point

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  //Search
  function search(input:string) {
    return (<div>{input}</div>)
  }

  return (
    <div className="Home">
      <h1>Explore All Github Emojis!!</h1>
      <input type="text" onChange={e => setValue(e.target.value)} value={value}/>
      <div className='display'>
        {((function(){
          if(value != '') return (search(value));
          
          return emojis?.map((item, key) => {
            return (
              <Image url={item} key={key}/>
            );
          })

        })())}
      </div>
    </div>
  );
}
