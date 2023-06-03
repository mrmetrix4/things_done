import { useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";

const finalSpaceCharacters = [
    {
        id: "gary",
        name: "Gary Goodspeed",
        thumb: "/assets/window_close.svg",
    },
    {
        id: "cato",
        name: "Little Cato",
        thumb: "/assets/window_close.svg",
    },
    {
        id: "kvn",
        name: "KVN",
        thumb: "/assets/window_close.svg",
    },
    {
        id: "mooncake",
        name: "Mooncake",
        thumb: "/assets/window_close.svg",
    },
    {
        id: "quinn",
        name: "Quinn Ergon",
        thumb: "/assets/window_close.svg",
    },
];

function DndList() {
    const [dragList, setDragList] = useState(finalSpaceCharacters);

    return (
        <DragDropContext
            onDragEnd={(result: DropResult) => {
                setDragList((prevState) => {
                    if (!result.destination) return prevState;
                    const char = prevState.splice(result.source.index, 1)[0];
                    prevState.splice(result.destination.index, 0, char);
                    return prevState;
                });
            }}
        >
            <StrictModeDroppable droppableId="characters">
                {(provided) => (
                    <ul
                        className="characters"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {dragList.map(({ id, name, thumb }, index) => {
                            return (
                                <Draggable
                                    key={id}
                                    draggableId={id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <div className="characters-thumb">
                                                <img
                                                    src={thumb}
                                                    alt={`${name} Thumb`}
                                                />
                                            </div>
                                            <p>{name}</p>
                                        </li>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </ul>
                )}
            </StrictModeDroppable>
        </DragDropContext>
    );
}

export default DndList;
