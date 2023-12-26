import React from "react";
import TodoList from "./components/TodoList";
import Modal from "./components/modal";
import Edit from "./components/edit";
import Delete from "./components/delete";
import "./App.css";
import Top from "./components/top";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const App: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.combined.modal.isOpen);
  const isEdited = useSelector((state: RootState) => state.combined.edit.editIsOpen);
  const isDeleted = useSelector(
    (state: RootState) => state.combined.delete.deleteIsOpen
  );
  

  return (
    <main>
      {isOpen && <Modal />}
      {isEdited && <Edit />}
      {isDeleted && <Delete />}
     
      
        <Top />
      
      <TodoList />
    </main>
  );
};

export default App;
