import { Box, Typography } from "@mui/material";
import { backendUrl } from "../../http";

export default function Lists({ listItem, fetchLists }) {
  const updateListCheck = async (listItemId) => {
    let res = await fetch(`${backendUrl}/list/update-list-item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listItemId }),
    });
    fetchLists();
  };

  return (
    <Box
      sx={{
        border: "1px solid black",
        minWidth: "15rem",
        minHeight: "300px",
      }}
    >
      <Typography
        sx={{
          backgroundColor: "lightgray",
          textAlign: "center",
        }}
      >
        {listItem?.listName}
      </Typography>
      {listItem?.items?.map((item) => (
        <Box
          key={item._id}
          sx={{
            display: "flex",
            padding: "0.2rem 0.5rem",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            checked={item.isCompleted}
            onChange={() => updateListCheck(item._id)}
          />{" "}
          {item.title}
        </Box>
      ))}
    </Box>
  );
}
