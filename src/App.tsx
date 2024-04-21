import { useEffect, useState } from 'react';
import Card from './card';
import './App.css';

type EmojisArray = {
  name: string;
  url: string;
}

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [emojis, updateEmojis] = useState<EmojisArray[] | null>(null);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await fetch('https://api.github.com/emojis');
        if (!response.ok) {
          throw new Error('Failed to fetch emojis');
        }
        const data = await response.json();
        updateEmojis(Object.entries(data).map(([name, url]) => ({
          name: name,
          url: url as string
        })));
      } catch (error:any) {
        setError(error.message || 'Failed to fetch emojis');
      } finally {
        setLoading(false);
      }
    };

    fetchEmojis();
  }, []);

  // Loading Point

  if (loading) return <h1 className='load'>Loading...</h1>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="Home">
      <h1>Explore All Github Emojis!!</h1>
      <label htmlFor="textbox">Search a Emoji: </label>
      <input type="text"  id='textbox' onChange={e => setValue(e.target.value)} value={value}/>
      <div className='display'>
        {emojis?.filter((item) => item.name.includes(value.toLowerCase()))
        .map((item, index) => (
          <Card content={item} key={index}/>
        ))}
      </div>
    </div>
  );
}
