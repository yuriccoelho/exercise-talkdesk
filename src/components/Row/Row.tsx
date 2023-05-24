import { ReactNode } from 'react';
import './Row.css';

interface RowProps {
    children: ReactNode;
};

const Row:React.FC<RowProps> = ({ children }) => (
  <section className="row">
    {children}
  </section>
)

export default Row;
