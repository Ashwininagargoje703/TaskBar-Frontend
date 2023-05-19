import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Lists from "../components/Lists";
import CreateList from "../components/CreateList";
import { backendUrl } from "../../http";
import { AuthContext } from "../context/AuthContext";

export default function ListPage() {
  const [allLists, setAllLists] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchLists = async () => {
    let res = await fetch(`${backendUrl}/list/get-list/${user.username}`);
    let list = await res.json();
    setAllLists(list.allLists);
  };

  useEffect(() => {
    if (!user) return;
    fetchLists();
  }, [user]);

  return (
    <Box
      sx={{
        padding: "2rem",
        width: "100%",
        overflowX: "auto",
        whiteSpace: "nowrap",
        display: "flex", // Add display flex to the container
        gap: "1rem",
      }}
    >
      {allLists.map((item) => {
        return <Lists key={item._id} listItem={item} fetchLists={fetchLists} />;
      })}
      <CreateList fetchLists={fetchLists} />
    </Box>
  );
}
