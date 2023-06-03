import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { useTasks, useTasksDispatch } from "../../Tasks/TasksContext";
import { StrictModeDroppable } from "../DndList/StrictModeDroppable";
import Task from "../Task/Task";
import "./dndtaskslist.css";

interface IDndTasksListProps {
    parentTaskID?: string;
}

function DndTasksList(props: IDndTasksListProps) {
    const dispatchTasks = useTasksDispatch();
    const tasks = useTasks();
    const filteredTasks = props.parentTaskID
        ? tasks.filter((task) => task.parentTaskID === props.parentTaskID)
        : tasks.filter((task) => !task.parentTaskID);
    return (
        <DragDropContext
            onDragEnd={(result: DropResult) => {
                dispatchTasks({ type: "reorder", result: result });
            }}
        >
            <StrictModeDroppable droppableId="characters">
                {(provided) => (
                    <ul
                        className="characters"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {filteredTasks.map((task, index) => {
                            return (
                                <Draggable
                                    key={task.id}
                                    draggableId={task.id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Task task={task} />
                                        </div>
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

export default DndTasksList;
