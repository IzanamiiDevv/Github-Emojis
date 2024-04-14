import './Image.css';

type ImageTypes = {
    url:string;
    key?:number;
}

export default function Image({url, key}:ImageTypes) {
    return (
        <img src={url} alt="Image Not Been Loaded" key={key || 0}/>
    );
}