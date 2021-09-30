import './Tile.scss';
import {Piece} from '../../constants';

interface Props {
    piece?: string;
    number: number;
}

export default function Tile({number, piece}: Props) {
    if ((Math.floor(number/8)+ number%8) % 2 === 0) {
        return <div className="tile white">
            {piece && <div className={`piece ${piece ? piece : ''}`}>{number}</div>}
        </div>
    } else {
        return <div className="tile black">
                {piece && <div className={`piece ${piece ? piece : ''}`}>{number}</div>}
            </div>
    }
}