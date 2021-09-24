import './Tile.scss';

interface Props {
    piece?: string;
    number: number;
}

export default function Tile({number, piece}: Props) {
    if ((Math.floor(number/8)+ number%8) % 2 === 0) {
        return <div className="tile white">
            <div className={`piece ${piece ? piece : ''}`}></div>
        </div>
    } else {
        return <div className="tile black">
                <div className={`piece ${piece ? piece : ''}`}></div>
            </div>
    }
}