import React, { useState, useCallback, useEffect } from "react";
import CustomModal from "./components/CustomModal/index";
import "./App.css";
import Table from "./components/Table";
import { getUsers } from "./utils/api";

function App() {
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [userData, setUserData] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [show, setShow] = useState(false);

  const getData = useCallback(async (page) => {
    try {
      const response = await getUsers(page);
      setRowsPerPage(response.per_page);
      setTotalPages(response.total_pages);
      setCurrentPage(response.page);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const showUserDetail = (id) => {
    const user = userData.find((element) => element.id === id);
    setUserDetail(user);
    setShow(true);
  };

  const renderUserDetail = () => {
    return (
      <>
        <div className="user-detail-container">
          <div className="detail-label-container">
            <div className="detail-label">ID:</div>
            <div className="detail-label">First Name:</div>
            <div className="detail-label">Last Name: </div>
            <div className="detail-label">Email:</div>
          </div>
          <div className="detail-container">
            <div className="detail profilePicture">
              <img src={userDetail.avatar} alt="userpicture"></img>
            </div>
            <div className="detail">{userDetail.id}</div>
            <div className="detail">{userDetail.first_name}</div>
            <div className="detail">{userDetail.last_name}</div>
            <div className="detail">{userDetail.email}</div>
          </div>
        </div>
        <div className="button-close-container">
          <button
            className="button buttonClose inactiveButton"
            onClick={() => setShow(false)}
          >
            Close
          </button>
        </div>
      </>
    );
  };

  return (
    <main className="container">
      <CustomModal show={show} title="Profile">
        {renderUserDetail()}
      </CustomModal>
      <div className="wrapper">
        <Table
          data={userData}
          rowsPerPage={rowsPerPage}
          thisPage={currentPage}
          range={totalPages}
          getDataOnPage={getData}
          showDetail={showUserDetail}
        />
      </div>
    </main>
  );
}

export default App;
