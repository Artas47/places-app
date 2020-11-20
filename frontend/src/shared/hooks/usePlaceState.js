const usePlaceState = () => {
  const onDeletePlace = async (id) => {
    await axios.delete(`http://localhost:5000/api/places/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const responseData = await axios.get(
      `http://localhost:5000/api/places/user/${userId}`
    );
    setPlaces(responseData.data.results);
  };
};

export default usePlaceState;
