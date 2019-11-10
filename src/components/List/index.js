import React, { useRef, useContext } from "react";
import { useDrop } from "react-dnd";

import { MdAdd } from "react-icons/md";

import BoardContext from "../Board/context";

import Card from "../Card";

import { Container } from "./styles";

export default function List({ data, index: listIndex }) {
  const ref = useRef();

  const { move } = useContext(BoardContext);

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      if (listIndex === item.listIndex) {
        return;
      }
      const draggedIndex = item.index;
      move(item.listIndex, listIndex, draggedIndex);
      item.listIndex = listIndex;
      item.length = data.cards.length + 1;
      item.index = item.length - 1;
    }
  });

  dropRef(ref);

  return (
    <Container done={data.done} ref={ref}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#fff" />
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card, i) => (
          <Card
            key={card.id}
            data={card}
            index={i}
            listIndex={listIndex}
            length={data.cards.length}
          />
        ))}
      </ul>
    </Container>
  );
}
