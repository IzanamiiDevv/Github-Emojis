import './Card.css';

type CardType = {
    content: {
        name:string;
        url:string;
    };
    key?:number;
}

export default function Card({content,key}:CardType) {
    console.log(content);
    console.log(key);
    return (
        <div className='Card'>
            <div className='box'>
                <img src={content.url} alt="Image Not Found" />
            </div>
            <div className='contents'>
                <p>Name:{content.name}</p>
            </div>
        </div>
    );
}