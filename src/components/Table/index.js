import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./style.css";
import TableFooter from "./../TableFooter/index";

const Table = ({ data, thisPage, range, getDataOnPage, showDetail }) => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentData, setCurrentData] = useState([]);
  const [, setScrollMove] = useState(false);
  const mainScroller = useRef(null);
  const scroller = useRef(null);

  const headerTitle = ["ID", "GIVEN NAME", "FAMILY NAME", "EMAIL"];

  useEffect(() => {
    if (thisPage > 0) {
      setPage(thisPage);
    }
    if (range > 0) {
      setTotalPages(range);
    }
    if (data.length > 0) {
      setCurrentData(data);
    }
  }, [data, range, thisPage, scroller]);

  const handleChangePage = (page) => {
    getDataOnPage(page);
  };

  const handleOnScroll = (e) => {
    scroller.current.scrollLeft = e.target.scrollLeft;
    setScrollMove(true);
  };

  const renderHeader = () => {
    let thArr = [];
    for (let i = 0; i < headerTitle.length; i++) {
      thArr.push(
        <th
          className={i === 0 ? "table-header first-header" : "table-header"}
          key={i}
        >
          {headerTitle[i]}
        </th>
      );
    }
    return <>{thArr}</>;
  };

  return (
    <>
      <div className="table-header-container">
        <table id="table-header" className="table">
          <thead
            className="flipped"
            ref={mainScroller}
            onScroll={handleOnScroll}
          >
            <tr className="table-row-header content">{renderHeader()}</tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="table-container">
                  <table className="table">
                    {currentData.length > 0 && (
                      <tbody className="table-body-content" ref={scroller}>
                        {currentData.map((el) => (
                          <tr
                            className="table-row-items"
                            key={el.id}
                            onClick={() => showDetail(el.id)}
                          >
                            <td className="table-cell">{el.id}</td>
                            <td className="table-cell other-cell">
                              {el.first_name}
                            </td>
                            <td className="table-cell other-cell">
                              {el.last_name}
                            </td>
                            <td className="table-cell other-cell">
                              {el.email}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <TableFooter
        range={totalPages}
        changePage={handleChangePage}
        page={page}
      />
    </>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  thisPage: PropTypes.number,
  range: PropTypes.number,
  getDataOnPage: PropTypes.func,
  showDetail: PropTypes.func,
};

export default Table;
