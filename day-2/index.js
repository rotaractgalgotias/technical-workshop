import express from "express";
import NodeCache from "node-cache";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const myCache = new NodeCache({ stdTTL: 60 }); // Cache duration is 60 seconds

app.get("/users", async (req, res) => {
  const cachedUsers = myCache.get("users");

  if (cachedUsers) {
    console.log("Returning cached data");
    return res.json(cachedUsers);
  }

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const users = await response.json();

    myCache.set("users", users);

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const cachedUsers = myCache.get(`users/${userId}`);
  console.log(userId);

  if (cachedUsers) {
    console.log("Returning cached data");
    return res.json(cachedUsers);
  }

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/" + userId
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const users = await response.json();

    myCache.set(`users/${userId}`, users);

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
