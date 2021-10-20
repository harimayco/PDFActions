import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import styles from "../styles/filelist.module.css";
import FilePreview from "./FilePreview";

//Drag handler
const DragHandle = sortableHandle(() => (
  <span className={styles.dragHandler}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-grip-horizontal"
      viewBox="0 0 16 16"
    >
      <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  </span>
));

//Drag area
const SortableContainer = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});

const arrayMoveMutate = (array, from, to) => {
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
};

const arrayMove = (array, from, to) => {
  array = array.slice();
  arrayMoveMutate(array, from, to);
  return array;
};

export default function PDFList({ files, setFiles }) {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setFiles(arrayMove(files, oldIndex, newIndex));
  };

  // Functions
  const deleteFileHandler = (file) => {
    const newFiles = files;
    newFiles.forEach((fileNew) => {
      if (fileNew == file) {
        fileNew.deleted = true;
      }
    });
    setFiles([...newFiles]);
  };

  //Draggable elements
  const SortableItem = sortableElement(({ value }) => (
    <div className={styles.dragElement}>
      <DragHandle />
      <FilePreview file={value} deleteFileHandler={deleteFileHandler} />
    </div>
  ));

  let allDeleted = true;
  return (
    <SortableContainer onSortEnd={onSortEnd} useDragHandle>
      {files.map((file, index) => {
        if (!file.deleted) {
          allDeleted = false;
          return (
            <SortableItem key={`item-${index}`} index={index} value={file} />
          );
        }
      })}
      {allDeleted && <h2>No Files</h2>}
    </SortableContainer>
  );
}