import React from "react";

export default function Pagination({ somethingPerPage, total , paginate, currentPage }) {
  const pageNumber = [];
  for (let index = 1; index <= Math.ceil(total / somethingPerPage); index++) {
    pageNumber.push(index);
  }

 const hadnleActivePage = (number) => {
   if (number === currentPage) {
     return "page-link clicableA paginationActive"
   } else {
     return "page-link clicableA"
   }
 }
  
  // console.log(total);
  // console.log(pageNumber);
  // console.log(somethingPerPage);
  
  return (
    
        <nav className="float-right padding-bottom-1rem">
          <ul className="pagination pagination-custom">
            {pageNumber.map(number => (
              <li key={number} className="page-item">
                <a onClick={() => paginate(number)}  className={hadnleActivePage(number)}>
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      
  );
}
