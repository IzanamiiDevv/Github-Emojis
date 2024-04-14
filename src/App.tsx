import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [emojis, updateEmoji] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [ keys, setKey ] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await fetch('https://api.github.com/emojis');
        if (!response.ok) {
          throw new Error('Failed to fetch emojis');
        }
        const data = await response.json();
        updateEmoji(data);
        setKey(Object.keys(data));
      } catch (error:any) {
        setError(error.message || 'Failed to fetch emojis');
      } finally {
        setLoading(false);
      }
    };

    fetchEmojis();
  }, []);

  console.log(keys)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="Home">
      <h1>Explore All Github Emojis!!</h1>
      <div>Hello</div>
      {emojis && emojis.accept && <img src={emojis.accept} alt="Accept Emoji" />}
    </div>
  );
}
