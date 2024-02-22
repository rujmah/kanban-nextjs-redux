"use client";

import { Item } from "@/types/Tasks";

export const TaskCard = ({
  item,
  columnName,
}: {
  item: Item;
  columnName: string;
}) => {
  const onDragStart: Function = (
    e: React.DragEvent,
    itemId: string,
    columnName: string
  ) => {
    e.dataTransfer.setData("itemId", itemId);
    e.dataTransfer.setData("columnName", columnName);
  };

  return (
    <div
      key={item.id}
      className="card"
      draggable
      onDragStart={e => onDragStart(e, item.id, columnName)}
    >
      {item.content}
    </div>
  );
};
