"use client";

import { Column } from "@/types/Columns";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setColumns } from "@/redux/kanbanSlice";

const KanbanBoard: React.FC = () => {
  const columns = useAppSelector(state => state.kanban.columns);
  const dispatch = useAppDispatch();

  const onDragStart = (
    e: React.DragEvent,
    itemId: string,
    columnName: string
  ) => {
    e.dataTransfer.setData("itemId", itemId);
    e.dataTransfer.setData("columnName", columnName);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent, column: Column) => {
    const itemId = e.dataTransfer.getData("itemId");
    const item = columns.flatMap(col => col.items).find(i => i.id === itemId);

    if (item && column.name !== e.dataTransfer.getData("columnName")) {
      const newColumns = columns.map(col => {
        if (col.name === column.name) {
          return { ...col, items: [...col.items, item] };
        } else {
          return { ...col, items: col.items.filter(i => i.id !== item.id) };
        }
      });
      dispatch(setColumns(newColumns));
    }
  };

  return (
    <div className="column-box">
      {columns.map((column, colIdx) => (
        <div
          key={colIdx}
          className="column"
          onDragOver={onDragOver}
          onDrop={e => onDrop(e, column)}
        >
          <h2 className="column-header">
            {column.name} ({column.items.length}){" "}
          </h2>
          {column.items.map((item, itemIdx) => (
            <div
              key={itemIdx}
              className="card"
              draggable
              onDragStart={e => onDragStart(e, item.id, column.name)}
            >
              {item.content}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
