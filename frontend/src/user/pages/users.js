import React, { useEffect, useState } from "react";
import UsersList from "../components/users-list/users-list";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Spinner from "../../shared/components/spinner/spinner";
import Searchbar from "../../shared/components/searchbar/searchbar";
import Fade from "../../shared/components/fade-animation/fade";
import Footer from "../../shared/components/footer/footer";
import HeaderSecondary from "../../shared/components/header-secondary/header-secondary";

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
          <UsersList items={users} />
        </>
      );
    }
  };

  return (
    <div>
      <HeaderSecondary />
      {renderUsersContent()}{" "}
      <Footer
        setCurrentPage={setCurrentPage}
        pages={pagesArray}
        currentPage={currentPage}
        pageNumber={pageNumber}
      />
    </div>
  );
};

export default Users;
