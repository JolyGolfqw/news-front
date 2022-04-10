import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { loadNews } from "../redux/features/news";
import { Form, Button } from "react-bootstrap";
import {addComment, deleteComment, loadComments,} from "../redux/features/comments";
import CircularProgress from "@mui/material/CircularProgress";

export default function FullNews() {
  const dispatch = useDispatch();

  const [commentText, setCommentText] = useState("");

  const loader = useSelector((state) => state.news.loading);
  const commentLoader = useSelector((state) => state.comments.loading);
  const error = useSelector((state) => state.comments.error);
  const news = useSelector((state) => state.news.news);
  const comments = useSelector((state) => state.comments.comments);
  const user = useSelector((state) => state.application.user);
  const token = useSelector((state) => state.application.token);

  const { id } = useParams();
  const userName = localStorage.getItem("name");

  useEffect(() => {
    dispatch(loadNews());
    dispatch(loadComments());
  }, [dispatch]);


  const commentsLength = [];
  const reversed = [...comments].reverse();

  const handleAddComment = (e) => {
    setCommentText(e.target.value);
  };

  const addCom = () => {
    if (!commentText) {
      return alert("Содержимое комментария не может быть пустым!");
    }

    if (!token) {
      return alert("Авторизуйтесь чтобы оставлять комментарии!");
    }
    dispatch(addComment(commentText, id, user, userName));
    setCommentText("");
  };

  const deleteCommentaries = (comId, userId) => {
    if (user !== userId) {
      return alert(
        `${userName}, упс ты можешь удалять только свои комментарии!`
      );
    }
    dispatch(deleteComment(comId));
  };

  if (loader) {
    return (
      <div className={"loader"}>
        <CircularProgress />
      </div>
    );
  }

  return news.map((item, index) => {
    if (item._id === id) {
      return (
        <div key={index} className={"fullNews"}>
          <div className="fnews_title">
            <h1>{item.title}</h1>
          </div>
          <img className="fnews_img" src={item.img} alt={item.title} />
          {item.text.split("  ").map((tab, index) => {
            return (
              <span key={index}>
                <p>{tab}</p>
              </span>
            );
          })}

          {comments.forEach((item) => {
            if (item.news === id) {
              return commentsLength.push(item);
            }
          })}

          <div className="title_comments">{`Комментарии: ${commentsLength.length}`}</div>

          {commentLoader && (
            <div className={"loader"}>
              <CircularProgress />
            </div>
          )}
          {error ? (
            <div>{error}</div>
          ) : (
            <div className="comments">
              {reversed.map((comment, index) => {
                const data = comment.date.toString();
                const year = data.slice(0, 10);
                const time = data.slice(11, 20);
                const date = `${year} ${time}`;

                if (comment.news === id) {
                  return (
                    <div key={index * 100} className="comment">
                      <div className="comment_head">
                        <div className="author">
                          <div>{comment.author}</div>
                          <span>{date}</span>
                        </div>
                        <button
                          onClick={() =>
                            deleteCommentaries(comment._id, comment.user)
                          }
                        >
                          x
                        </button>
                      </div>
                      <div className="comment_text">{comment.text}</div>
                    </div>
                  );
                }
              })}
            </div>
          )}
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Оставьте комментарий</Form.Label>
              <Form.Control
                value={commentText}
                onChange={(e) => handleAddComment(e)}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Button disabled={loader} onClick={addCom}>
              Добавить
            </Button>
          </Form>
        </div>
      );
    }
  });
}
