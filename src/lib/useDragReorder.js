'use client';

import { useRef, useState } from 'react';

export function useDragReorder(onMove) {
  const dragIndex = useRef(null);
  const [overIndex, setOverIndex] = useState(null);
  const [draggingIndex, setDraggingIndex] = useState(null);

  const reset = () => {
    dragIndex.current = null;
    setOverIndex(null);
    setDraggingIndex(null);
  };

  const getItemProps = (index) => ({
    draggable: true,
    onDragStart: (e) => {
      dragIndex.current = index;
      setDraggingIndex(index);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(index));
    },
    onDragOver: (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (overIndex !== index) setOverIndex(index);
    },
    onDrop: (e) => {
      e.preventDefault();
      const from = dragIndex.current;
      if (from !== null && from !== index) onMove(from, index);
      reset();
    },
    onDragEnd: reset,
  });

  return { getItemProps, overIndex, draggingIndex };
}

export function moveItem(list, from, to) {
  const copy = [...list];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}