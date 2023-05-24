import { DOTS, usePagination } from './usePagination';
import './Pagination.css';

interface PaginationProps {
  onPageChange: (currentPage: number) => void;
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || !paginationRange || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  let lastPage = 3;

  const updatedPaginationRange = paginationRange.slice(0, lastPage);

  return (
    <div className={props.className}>
      <ul className="pagination-container">
        {currentPage > 1 && (
          <li className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={onPrevious}>
            <div className="arrow left" />
          </li>
        )}
        {updatedPaginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots" key={index}>&#8230;</li>;
          }

          return (
            <li
              className={`pagination-item ${pageNumber === currentPage ? 'selected' : ''}`}
              onClick={() => {
                onPageChange(pageNumber as number);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              key={index}
            >
              {pageNumber}
            </li>
          );
        })}
        {currentPage !== lastPage && (
          <li className={`pagination-item ${currentPage === lastPage ? 'disabled' : ''}`} onClick={onNext}>
            <div className="arrow right" />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;