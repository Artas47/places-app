import React, { useEffect, useState } from "react";
import UsersList from "../components/users-list/users-list";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Spinner from "../../shared/components/spinner/spinner";
import Searchbar from "../../shared/components/searchbar/searchbar";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [pageNumber, setPageNumber] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { sendRequest, isLoading } = useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users?page=${currentPage}&limit=6`,
          "GET"
        );
        if (responseData.next) {
          setNextPage(responseData.next);
        }
        if (responseData.previous) {
          setPreviousPage(responseData.previous);
        }

        setPageNumber(responseData.pageNumber);
        setUsers(responseData.results);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, currentPage]);

  // console.log("users", users);
  // console.log("nextPage", nextPage);

  const pagesArray = Array.from({ length: pageNumber }, (_, i) => i + 1);

  const renderUsersContent = () => {
    if (isLoading) {
      return <Spinner className={["centered", "color-white"]} />;
    } else if (!users?.length) {
      return <div>No users</div>;
    } else {
      return (
        <>
          <Searchbar />
          <UsersList items={users} />
        </>
      );
    }
  };

  return (
    <div>
      {renderUsersContent()}{" "}
      <div
        style={{
          position: "fixed",
          bottom: "0",
          height: "5rem",
          left: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translate(-50%,0)",
          fontSize: "2rem",
          textAlign: "center",
          margin: "0 auto",
          width: "100%",
          color: "#fff",
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      >
        {pagesArray.map((page) => (
          <span
            style={{
              margin: "0 1rem",
              color: "#fff",
              fontSize: currentPage === page ? "2.5rem" : "2rem",
              // color: currentPage === page ? "" : "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              padding: "1rem",
            }}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Users;
