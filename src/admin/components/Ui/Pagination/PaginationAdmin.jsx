import React from "react";

import styles from "./PaginationActive.module.css"

export default function Pagination({ somethingPerPage, total , paginate, currentPage }) {
  const pageNumber = [];
  for (let index = 1; index <= Math.ceil(total / somethingPerPage); index++) {
    pageNumber.push(index);
  }

 const hadnleActivePage = (number) => {
   if (number === currentPage) {
     return ["page-link" , styles.Clicable,  styles.PaginationActive] 
   } else {
     return ["page-link" , styles.Clicable] 
   }
 }
  
  // console.log(total);
  // console.log(pageNumber);
  // console.log(somethingPerPage);
  
  return (
    
        <nav className="float-right">
          <ul className={["pagination" , styles.PaginationCustom]}>
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