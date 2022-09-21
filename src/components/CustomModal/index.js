import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const CustomModal = (props) => {
  const { show, children, title } = props;
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="modal-head">
          <div className="modal-title">
            <b>{title}</b>
          </div>
        </div>
        <div className="modal-body">{children}</div>
      </section>
    </div>
  );
};

CustomModal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object,
  show: PropTypes.bool,
};
export default CustomModal;
