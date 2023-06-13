// Imports
import {
    DndContext,
    DragEndEvent,
    DragMoveEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    DropAnimation,
    UniqueIdentifier,
    defaultDropAnimation,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";

import { CSS } from "@dnd-kit/utilities";
import { SortableTreeItem } from "./components";
import type { FlattenedItem, TreeItems } from "./types";
import {
    buildTree,
    flattenTree,
    getChildCount,
    getProjection,
    removeChildrenOf,
    removeItem,
    setProperty,
} from "./utilities";

// Only items list
const initialItems: TreeItems = [
    {
        id: "Home",
        children: [],
    },
    {
        id: "Collections",
        children: [
            { id: "Spring", children: [] },
            { id: "Summer", children: [] },
            { id: "Fall", children: [] },
            { id: "Winter", children: [] },
        ],
    },
    {
        id: "About Us",
        children: [],
    },
    {
        id: "My Account",
        children: [
            { id: "Addresses", children: [] },
            { id: "Order History", children: [] },
        ],
    },
];

// The drop animation > https://docs.dndkit.com/api-documentation/draggable/drag-overlay#drop-animation
const dropAnimationConfig: DropAnimation = {
    keyframes({ transform }) {
        return [
            {
                opacity: 1,
                transform: CSS.Transform.toString(transform.initial),
            },
            {
                opacity: 0,
                transform: CSS.Transform.toString({
                    ...transform.final,
                    x: transform.final.x + 5,
                    y: transform.final.y + 5,
                }),
            },
        ];
    },
    easing: "ease-out",
    sideEffects({ active }) {
        active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: defaultDropAnimation.duration,
            easing: defaultDropAnimation.easing,
        });
    },
};

export function SortableTree() {
    // Literaly as it sounds
    const indentationWidth = 25;

    // The useState of the list, nothing unusual
    const [items, setItems] = useState(initialItems);

    // The item being dragged
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    // The item being dragged under
    const [overId, setOverId] = useState<UniqueIdentifier | null>(null);

    // The physical x position
    const [offsetLeft, setOffsetLeft] = useState(0);

    // The "logical" position, the item under and the parent
    const [currentPosition, setCurrentPosition] = useState<{
        parentId: UniqueIdentifier | null;
        overId: UniqueIdentifier;
    } | null>(null);

    // Basically for visual representations (What we see)
    const flattenedItems = useMemo(() => {
        const flattenedTree = flattenTree(items);
        const collapsedItems = flattenedTree.reduce<string[]>(
            (acc, { children, collapsed, id }) =>
                collapsed && children.length ? [...acc, String(id)] : acc,
            []
        );

        return removeChildrenOf(
            flattenedTree,
            activeId ? [activeId, ...collapsedItems] : collapsedItems
        );
    }, [activeId, items]);

    // The one we actively dragging
    const projected =
        activeId && overId
            ? getProjection(
                  flattenedItems,
                  activeId,
                  overId,
                  offsetLeft,
                  indentationWidth
              )
            : null;

    // Id only flattend
    const sortedIds = useMemo(
        () => flattenedItems.map(({ id }) => id),
        [flattenedItems]
    );

    // The activeId item
    const activeItem = activeId
        ? flattenedItems.find(({ id }) => id === activeId)
        : null;

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragMove={({ delta }: DragMoveEvent) => setOffsetLeft(delta.x)}
            onDragOver={({ over }: DragOverEvent) =>
                setOverId(over?.id ?? null)
            }
            onDragEnd={handleDragEnd}
            onDragCancel={resetState}
        >
            <SortableContext
                items={sortedIds}
                strategy={verticalListSortingStrategy}
            >
                {flattenedItems.map(({ id, children, collapsed, depth }) => (
                    <SortableTreeItem
                        key={id}
                        id={id}
                        value={String(id)}
                        depth={
                            id === activeId && projected
                                ? projected.depth
                                : depth
                        }
                        indentationWidth={indentationWidth}
                        indicator={false}
                        collapsed={Boolean(collapsed && children.length)}
                        onCollapse={
                            children.length
                                ? () => handleCollapse(id)
                                : undefined
                        }
                        onRemove={() => handleRemove(id)}
                    />
                ))}
                {createPortal(
                    <DragOverlay dropAnimation={dropAnimationConfig}>
                        {activeId && activeItem ? (
                            <SortableTreeItem
                                id={activeId}
                                depth={activeItem.depth}
                                clone
                                childCount={getChildCount(items, activeId) + 1}
                                value={activeId.toString()}
                                indentationWidth={indentationWidth}
                            />
                        ) : null}
                    </DragOverlay>,
                    document.body
                )}
            </SortableContext>
        </DndContext>
    );

    function handleDragStart({ active: { id: activeId } }: DragStartEvent) {
        setActiveId(activeId);
        setOverId(activeId);

        const activeItem = flattenedItems.find(({ id }) => id === activeId);

        if (activeItem) {
            setCurrentPosition({
                parentId: activeItem.parentId,
                overId: activeId,
            });
        }

        document.body.style.setProperty("cursor", "grabbing");
    }

    function handleDragEnd({ active, over }: DragEndEvent) {
        resetState();

        if (projected && over) {
            const { depth, parentId } = projected;
            const clonedItems: FlattenedItem[] = JSON.parse(
                JSON.stringify(flattenTree(items))
            );
            const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
            const activeIndex = clonedItems.findIndex(
                ({ id }) => id === active.id
            );
            const activeTreeItem = clonedItems[activeIndex];

            clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

            const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
            const newItems = buildTree(sortedItems);

            setItems(newItems);
        }
    }

    // Resets states back to begginings
    function resetState() {
        setOverId(null);
        setActiveId(null);
        setOffsetLeft(0);
        setCurrentPosition(null);

        document.body.style.setProperty("cursor", "");
    }

    // Removes items recursivly
    function handleRemove(id: UniqueIdentifier) {
        setItems((items) => removeItem(items, id));
    }

    // Set collaped false recursively
    function handleCollapse(id: UniqueIdentifier) {
        setItems((items) =>
            setProperty(items, id, "collapsed", (value) => {
                return !value;
            })
        );
    }
}
