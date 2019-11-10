import React, { useRef, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";

import BoardContext from "../Board/context";

import { Container, Label } from "./styles";

export default function Card({ data, index, listIndex, length }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: "CARD", index, listIndex, length },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  // const [, dropRef] = useDrop({
  //   accept: "CARD",
  //   hover(item, monitor) {
  //     // console.log(item.index); // sendo arrastado
  //     // console.log(index); // Recebendo arraste

  //     const draggedListIndex = item.listIndex;
  //     const targetListIndex = listIndex;

  //     const draggedIndex = item.index;
  //     const targetIndex = index;

  //     if (
  //       draggedIndex === targetIndex &&
  //       draggedListIndex === targetListIndex
  //     ) {
  //       return;
  //     }

  //     const targetSize = ref.current.getBoundingClientRect();
  //     const targetCenter = (targetSize.bottom - targetSize.top) / 2;
  //     const draggedOffset = monitor.getClientOffset();
  //     const draggetTop = draggedOffset.y - targetSize.top;

  //     if (draggedIndex < targetIndex && draggetTop < targetCenter) {
  //       return;
  //     }

  //     if (draggedIndex > targetIndex && draggetTop > targetCenter) {
  //       return;
  //     }

  //     move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

  //     item.index = targetIndex;
  //     item.listIndex = targetListIndex;
  //   }
  // });

  dragRef(ref);

  return (
    <Container isDragging={isDragging} ref={ref}>
      <header>
        {data.labels.map(label => (
          <Label color={label} key={label} />
        ))}
      </header>
      <p>{data.content}</p>
      {data.user && <img alt="" src={data.user} />}
    </Container>
  );
}
