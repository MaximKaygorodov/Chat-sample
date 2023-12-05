import { useEffect, useRef, useState, useCallback } from "react";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import Cookies from "js-cookie";

import { fetchPage, postComment } from "./api.js";

import Container from "@mui/material/Container";

import ActionGroup from "./components/ActionGroup";
import CommentsSection from "./components/CommentsSection";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import "./styles.css";

function CommentsContainer() {
  const [comments, setComments] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const scrollableRef = useRef(null);

  const fetchData = useRef(async () => {
    try {
      const page = await fetchPage();

      setComments(page.data);
    } catch (e) {
      enqueueSnackbar("Server is not avaliable", { variant: "error" });
      console.log(e);
    }
  });

  const getCookieAuthor = useRef(() => {
    try {
      const savedAuthor = Cookies.get("author");
      if (savedAuthor) {
        setAuthor(savedAuthor);
      } else {
        const userAuthor = prompt("Please enter your nickname:");
        if (userAuthor) {
          Cookies.set("author", userAuthor);
          setAuthor(userAuthor);
        }
      }
    } catch (e) {
      enqueueSnackbar("Couldn't find nickname", { variant: "error" });
      console.log(e);
    }
  });

  useEffect(() => {
    getCookieAuthor.current();
    fetchData.current();
  }, []);

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [comments]);

  useEffect(() => {}, [author, message]);

  const { current: handleInput } = useRef((e) => {
    const { value } = e.target;

    setMessage(value);
  });

  const handleSubmit = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        if (message.length) {
          await postComment({
            author,
            message,
          });
          fetchData.current();
          enqueueSnackbar("Message sent", { variant: "success" });
        } else {
          enqueueSnackbar("Please enter message", { variant: "warning" });
        }
      } catch (e) {
        enqueueSnackbar("Couldn't save data", { variant: "error" });
        console.log(e);
      }
    },
    [message, author]
  );

  return (
    <Container maxWidth="md">
      <SnackbarProvider
        preventDuplicate
        style={{ font: "1rem 'Fira Sans', sans-serif" }}
      />
      <Card>
        <CardContent className="chatbox secondaryColor" ref={scrollableRef}>
          {comments && <CommentsSection comments={comments} />}
        </CardContent>
        <CardActions className="primaryColor">
          <ActionGroup onChange={handleInput} onSubmit={handleSubmit} />
        </CardActions>
      </Card>
    </Container>
  );
}

export default CommentsContainer;
