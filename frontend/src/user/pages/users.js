import React, { useEffect, useState, useContext } from "react";
import UsersList from "../components/users-list/users-list";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Spinner from "../../shared/components/spinner/spinner";
import Footer from "../../shared/components/footer/footer";
import HeaderSecondary from "../../shared/components/header-secondary/header-secondary";
import { AuthContext } from "../../shared/context/auth-context";

const Users = () => {
  const [pageNumber, setPageNumber] = useState(null);
  const { sendRequest, isLoading } = useHttpClient();

  const {
    setUsers,
    users,
    searchParam,
    currentPage,
    setCurrentPage,
  } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users?page=${currentPage}&limit=6&search=${searchParam}`,
          "GET"
        );
        setPageNumber(responseData.pageNumber);
        setUsers(responseData.results);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, currentPage, searchParam, setUsers]);

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
      <HeaderSecondary setCurrentPage={setCurrentPage} />
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
