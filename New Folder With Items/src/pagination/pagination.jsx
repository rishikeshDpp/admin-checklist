import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import './pagination.scss';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const onFirst = () => {
    onPageChange(1);
  };

  const onLast = () => {
    onPageChange(lastPage);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div
      className={classnames('pagination-container py-2', { [className]: className })}
    >
      <div
        className={classnames('pagination-item first-page', {
          disabled: currentPage === 1
        })}
        key={'first'}
        onClick={onFirst}
      >
        <div className="arrow left" />
        <div className="arrow left" />
      </div>
      <div
        className={classnames('pagination-item previous-page', {
          disabled: currentPage === 1
        })}
        key={'previous'}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </div>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <div className="pagination-item dots" key={index}>&#8230;</div>;
        }

        return (
          <div
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            key={index}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </div>
        );
      })}
      <div
        className={classnames('pagination-item next-page', {
          disabled: currentPage === lastPage
        })}
        key={'next'}
        onClick={onNext}
      >
        <div className="arrow right" />
      </div>
      <div
        className={classnames('pagination-item last-page', {
          disabled: currentPage === lastPage
        })}
        key={'last'}
        onClick={onLast}
      >
        <div className="arrow right" />
        <div className="arrow right" />
      </div>
    </div>
  );
};

export default Pagination;
