import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { ITask, useTasks, useTasksDispatch } from "../../Tasks/TasksContext";
import { StrictModeDroppable } from "../DndList/StrictModeDroppable";
import Task from "../Task/Task";
import "./dndtaskslist.css";

interface IDndTasksListProps {
    tasks?: ITask[];
}

function DndTasksList({ tasks }: IDndTasksListProps) {
    if (!tasks) {
        tasks = useTasks();
    }
    const dispatchTasks = useTasksDispatch();
    return (
        <div className="tasklist">
            <DragDropContext
                onDragEnd={(result: DropResult) => {
                    console.log(result);
                }}
            >
                <StrictModeDroppable droppableId="tasklist">
                    {(provided) => (
                        <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {tasks?.map((task, index) => {
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
        </div>
    );
}

export default DndTasksList;
