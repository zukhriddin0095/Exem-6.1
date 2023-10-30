




import PaginationType from "../../types/pagination";



import "./style.scss";
const Pagination: React.FC<PaginationType> = ({
  total,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / 10);
  function renderPageNumbers() {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={number === currentPage ? "active" : ""}
            onClick={() => onPageChange(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    );
  }

  return <div className="pagination-container">{renderPageNumbers()}</div>;
};

export default Pagination;
