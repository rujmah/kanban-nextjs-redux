"use client";

import { Column } from "@/types/Tasks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setColumns } from "@/redux/kanbanSlice";
import { TaskCard } from "./TaskCard";
import Confetti from "react-confetti";
import React, { useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";

export const KanbanBoard: React.FC = () => {
  const columns = useAppSelector(state => state.kanban.columns);
  const dispatch = useAppDispatch();
  const [confetti, setConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent, column: Column) => {
    const itemId = e.dataTransfer.getData("itemId");
    const columnName = e.dataTransfer.getData("columnName");
    const item = columns.flatMap(col => col.items).find(i => i.id === itemId);

    if (item && column.name !== columnName) {
      const newColumns = columns.map(col => {
        if (col.name === column.name) {
          return { ...col, items: [...col.items, item] };
        } else {
          return { ...col, items: col.items.filter(i => i.id !== item.id) };
        }
      });
      if (column.name === "Done") {
        console.log("done");
        setConfetti(true);
        setTimeout(() => setConfetti(false), 5000);
      }
      dispatch(setColumns(newColumns));
    }
  };

  return (
    <div className="column-box">
      {columns.map((column, colIdx) => (
        <div
          key={colIdx}
          className={`column ${column.name
            .toLowerCase()
            .replace(/\s/, "")}-column`}
          onDragOver={onDragOver}
          onDrop={e => onDrop(e, column)}
        >
          {confetti && <Confetti width={width} height={height} />}
          <h2 className="column-header">
            {column.name} ({column.items.length}){" "}
          </h2>
          {column.items.map(item => (
            <TaskCard key={item.id} item={item} columnName={column.name} />
          ))}
        </div>
      ))}
    </div>
  );
};
