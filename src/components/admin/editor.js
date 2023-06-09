import dynamic from "next/dynamic";
import { useContext } from "react";
import { fileContext } from "./eventBasicForm";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default function RichEditor() {
  const { description, setDescription, setSaved } = useContext(fileContext);
  const handleChange = (e) => {
    setDescription(e);
    setSaved(false);
  };
  return (
    <QuillNoSSRWrapper
      modules={modules}
      formats={formats}
      value={description}
      // defaultValue={description}
      theme="snow"
      onChange={handleChange}
    />
  );
}
