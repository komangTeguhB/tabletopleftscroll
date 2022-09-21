import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const TableFooter = ({ range, changePage, page }) => {
  const handleChangePrevNext = (mode) => {
    if (mode === "next" && page !== range) {
      changePage(page + 1);
    }
    if (mode === "prev" && page !== 0) {
      changePage(page - 1);
    }
  };

  const renderButton = () => {
    let buttons = [];
    const prev = "<";
    const next = ">";
    const first = "<<";
    const last = ">>";
    for (let i = 1; i < range + 1; i++) {
      buttons.push(
        <button
          key={i}
          className={`${"button"} ${
            page === i ? "active-button" : "inactive-button"
          }`}
          onClick={() => changePage(i)}
        >
          {i}
        </button>
      );
    }
    return (
      <>
        <div>
          <button
            className="button inactive-button"
            onClick={() => changePage(1)}
            disabled={page === 1}
          >
            {first}
          </button>
          <button
            className="button inactive-button"
            onClick={() => handleChangePrevNext("prev")}
            disabled={page === 1}
          >
            {prev}
          </button>
          {buttons}
          <button
            className="button inactive-button"
            onClick={() => handleChangePrevNext("next")}
            disabled={page === range}
          >
            {next}
          </button>
          <button
            className="button inactive-button"
            onClick={() => changePage(range)}
            disabled={page === range}
          >
            {last}
          </button>
        </div>
      </>
    );
  };
  return <div className="tableFooter">{renderButton()}</div>;
};

TableFooter.propTypes = {
  range: PropTypes.number,
  changePage: PropTypes.func,
  page: PropTypes.number,
};

export default TableFooter;
