import React, { useState, useEffect } from "react";
import { Button, Input, List, Row, Col, Divider } from "antd";
import Todo from "./Todo";
import axios from "../../config/axios";
import { Link } from "react-router-dom";
export default function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [inputField, setInputField] = useState("");

  const fetchTodoList = async () => {
    const httpResponse = await axios.get("/todo-list");
    setTodoList(httpResponse.data);
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  const addTodoItem = async () => {
    await axios.post("/todo-list", { task: inputField });
    fetchTodoList();
    setInputField("")
  };

  const deleteTodoItem = async (id) => {
    await axios.delete(`/todo-list/${id}`);
    fetchTodoList();
  };

  return (
    <Row justify={"center"}>
      <Col>
        <Row justify={"center"}>
          <Link to="/profile"><Button>Go to Profile</Button></Link>
        </Row>
        <Divider />
        <Row justify={"center"}>Add New Todo List</Row>
        <Row justify={"center"}>
          <Col span={20}>
            <Input
              value={inputField}
              placeholder="Todo"
              onChange={(e) => setInputField(e.target.value)}
            />
          </Col>
          <Col>
            <Button style={{ width: "100%" }} onClick={addTodoItem}>
              Add
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row justify={"center"}>
          <List
            header={<div>Todo List Page</div>}
            style={{ width: "450px" }}
            bordered
            dataSource={todoList}
            renderItem={(todo) => (
              <List.Item>
                <Todo todo={todo} fetchTodoList={fetchTodoList} deleteTodoItem={deleteTodoItem} />
              </List.Item>
            )}
          />
        </Row>
      </Col>
    </Row>
  );
}
