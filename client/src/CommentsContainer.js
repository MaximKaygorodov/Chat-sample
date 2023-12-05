import { useEffect, useRef, useState, useCallback } from "react";
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
    const page = await fetchPage();

    setComments(page.data);
  });

  useEffect(() => {
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
      e.preventDefault();
      if (message.length) {
        await postComment({
          author,
          message,
        });
      } else {
        // add snackbar
      }
      fetchData.current();
    },
    [message, author]
  );

  return (
    <Container maxWidth="md">
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
