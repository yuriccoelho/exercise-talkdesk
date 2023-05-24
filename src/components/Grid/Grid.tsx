import { ReactNode } from 'react';
import './Grid.css';

interface GridProps {
    children: ReactNode;
};

const Grid:React.FC<GridProps> = ({ children }) => (
  <section className="grid">
    {children}
  </section>
)

export default Grid;
