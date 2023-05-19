import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { backendUrl } from "../../http";
import { AuthContext } from "../context/AuthContext";

export default function CreateList({ fetchLists }) {
  const [isClicked, setIsClicked] = useState(false);
  const [isListNameEntered, setIsListNameEntered] = useState(false);
  const [listName, setListName] = useState("");
  const [title, setTitle] = useState("");
  const [listItems, setListItems] = useState([]);

  const { user } = useContext(AuthContext);

  const checkIfListNameEnteredAndSetTitle = () => {
    if (listName !== "") {
      setIsListNameEntered(true);
    } else {
      alert("please enter list name");
    }
  };

  const addItemToArray = () => {
    if (title === "") {
      return alert("please enter item title");
    }
    setListItems([...listItems, { title }]);
    setTitle("");
  };

  const submitList = async () => {
    let username = user?.username;
    let payload = {
      username,
      listName,
      lists: listItems,
    };

    let res = await fetch(`${backendUrl}/list/create-list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    let data = await res.json();
    fetchLists();

    setIsClicked(false);
    setIsListNameEntered(false);
    setListName("");
    setTitle("");
    setListItems([]);
  };

  return (
    <Box
      sx={{
        border: "1px solid black",
        minWidth: "10rem",
        maxWidth: "15rem",
      }}
    >
      <Typography
        sx={{
          backgroundColor: "lightgray",
          textAlign: "center",
        }}
      >
        Create New List
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
        }}
        component="h2"
        variant="h6"
      >
        {listName}
      </Typography>
      {listItems?.map((item, ind) => (
        <Box key={ind}>
          <Typography
            sx={{
              textAlign: "center",
            }}
          >
            {item.title}
          </Typography>
        </Box>
      ))}
      <Box
        sx={{
          display: "flex",
          padding: "0.2rem 0.5rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!isClicked && (
          <Typography
            sx={{
              cursor: "pointer",
            }}
            onClick={() => setIsClicked(true)}
          >
            Add New
          </Typography>
        )}
        {isClicked && !isListNameEntered && (
          <>
            <input
              type="text"
              name="listName"
              placeholder="enter list name"
              onChange={(e) => setListName(e.target.value)}
            />
            <Button onClick={checkIfListNameEnteredAndSetTitle}>Add</Button>
          </>
        )}
        {isClicked && isListNameEntered && (
          <>
            <input
              type="text"
              name="title"
              placeholder="enter list item title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button onClick={addItemToArray}>Add</Button>
          </>
        )}
      </Box>
      {isClicked && isListNameEntered && listItems.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button onClick={submitList}>Submit List</Button>
        </Box>
      )}
    </Box>
  );
}
