import React from "react";

import styles from "./AdminPagination.module.css"

export default function AdminPagination({ somethingPerPage, total , paginate, currentPage }) {
  const pageNumber = [];
  for (let index = 1; index <= Math.ceil(total / somethingPerPage); index++) {
    pageNumber.push(index);
  }

 const hadnleActivePage = (number) => {
   if (number === currentPage) {
     return ("page-link" + " " + styles.CursorPinter + " " + styles.PaginationActive ) 
   } else {
     return ("page-link" + " " + styles.CursorPinter )
   }
 }
  
  // console.log(total);
  // console.log(pageNumber);
  // console.log(somethingPerPage);
  
  return (
    
        <nav className="float-right">
          <ul className={"pagination" + " " + styles.Pagination}>
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