// @/src/components/Table/TableFooter/index.jsx
import React, { useEffect } from "react";

import styles from "./TableFooter.module.css";

/* creacion del componente Table footer para la paginacion, donde se manejara
 el estado y numeros de las de las paginas*/

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  
  /* Retona la renderizacion de la paginacion de la tabla */
  
  return (
    <div className={styles.tableFooter}>
      {range.map((el, index) => (
        <button
          key={index}
          className={`${styles.button} ${
            page === el ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;