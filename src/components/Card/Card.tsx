import clsx from 'clsx'

import './Card.css'
import { AnyObject } from '../types';

export interface CardProps {
    image: AnyObject;
    label: AnyObject;
    title: string;
    content: AnyObject;
}

const Card:React.FC<CardProps> = ({ image, label, title, content }) => {
  return (
    <div className="card card__link">
      <div className="card__media">
        <img {...image} />
      </div>

      <div className={clsx('card__text')}>
          {label.text}

        <h5 className="card__title" >
          {title}
        </h5>

        <p className="card__description">{content?.text}</p>
      </div>
    </div >
  )
}

export default Card
