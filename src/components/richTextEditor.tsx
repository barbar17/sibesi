"use client";

import React, { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import ImageTipTap from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Heading, { Level } from "@tiptap/extension-heading";
import Image from "next/image";
import { toast } from "react-toastify";
import LoadingStore from "@/store/loadingStore";
import "@/style/rte.css";
import ApiRoute from "@/api/apiRoute";

export default function RichTextEditor({
  value,
  handleChange,
  isClear,
  jenis,
}: {
  value: any;
  handleChange: (value: string) => void;
  isClear?: boolean;
  jenis: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      Link,
      ImageTipTap,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Placeholder.configure({ placeholder: "" }),
    ],
    content: "",
    immediatelyRender: false,
  });

  const fileSize = {
    maxWidthOrHeight: 2560,
    maxSizeMB: 0.5,
  };

  const colorRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const setLoading = LoadingStore((state) => state.setLoading);
  const [valueNew, setValueNew] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const handleImage = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage("");
      // setLoading(true);

      // console.log("coba", file);
      // ApiRoute.postImage(jenis, file)
      //   .then((res) => {
      //     console.log("coba", res);
      //     setLoading(false);
      //   })
      //   .catch((err) => {
      //     toast.error(err);
      //     setLoading(false);
      //   });

      const imageUrl = URL.createObjectURL(file);
      editor?.chain().focus().setImage({ src: imageUrl }).run();
      // MasterApi.postUploadFile({ file: renamedFile, bucketName: "core-dev", filePath: "cms-pajakmas" })
      //   .then((res) => {
      //     setLoading(false);
      //     editor?.chain().focus().setImage({ src: res?.ossLink }).run();
      //   })
      //   .catch(() => {
      //     setLoading(false);
      //     toast.error("Upload Image Failed");
      //   });
      // const imageUrl = URL.createObjectURL(file);
      // editor?.chain().focus().setImage({ src: imageUrl }).run();
    }
  };

  const handleFile = (e: any) => {
    const file = e.target.files?.[0];
    editor?.chain().focus().insertContent(`<u><a href='https:google.com'>${file?.name}</a></u>`).run();
  };

  useEffect(() => {
    if (image) {
      setLoading(false);
    }
  }, [image]);

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      setText(editor.getText());
      setValueNew(editor.getHTML());

      // console.log("coba Current text:", textSplit[textSplit?.length - 1]);
      // console.log("coba result:", editor.getHTML());
    };

    editor.on("update", handleUpdate);
    editor.commands.setContent(value ? value : "");
    setText(value ? value : "");

    return () => {
      editor.off("update", handleUpdate);
      editor.destroy();
    };
  }, [editor]);

  useEffect(() => {
    handleChange(valueNew);
  }, [valueNew]);

  useEffect(() => {
    editor?.commands.setContent("");
    setText(editor?.getText() || "");
  }, [isClear]);

  if (!editor) return null;

  return (
    <div className="w-full relative mt-3">
      <input type="file" accept="image/*" ref={imageRef} onChange={handleImage} className="hidden" />
      <input type="file" ref={fileRef} onChange={handleFile} className="hidden" />

      <EditorContent editor={editor} />

      <div className="absolute top-0 flex flex-row lg:py-0 py-4 flex-wrap h-fit mx-[2px] border-b items-center border-[#E2E8F0] w-[calc(100%-4px)] text-[#475569] font-[700] text-[16px]">
        <select
          value={"Paragraph"}
          className="px-3 cursor-pointer text-[16px]"
          onChange={(e) => {
            const level = e.target.value;
            if (level === "paragraph") {
              editor?.chain().focus().setParagraph().run();
            } else {
              editor
                .chain()
                .focus()
                .toggleHeading({ level: parseInt(level) as Level })
                .run();
            }
          }}
        >
          <option value="paragraph">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
          <option value="6">Heading 6</option>
        </select>
        <div className="flex flex-row h-[44px] px-2 gap-2 items-center border-l border-r border-[#E2E8F0]">
          <div className="flex flex-col relative w-[30px]">
            <button className="cursor-pointer w-[30px]" onClick={() => colorRef.current?.click()}>
              <Image src={"/richTextEditorIcon/IconWarna.svg"} alt="icon" width={30} height={30} />
            </button>
            <input type="color" onChange={(e) => editor.chain().focus().setColor(e.target.value).run()} className="h-0 bottom-0 bg-white" ref={colorRef} />
          </div>
          <button className="cursor-pointer" onClick={() => editor.chain().focus().toggleHighlight().run()}>
            <Image src={"/richTextEditorIcon/IconHighlight.svg"} alt="icon" width={30} height={30} />
          </button>
          <button className="cursor-pointer" onClick={() => editor.chain().focus().toggleBold().run()}>
            <Image src={"/richTextEditorIcon/IconBold.svg"} alt="icon" width={30} height={30} />
          </button>
          <button className="cursor-pointer" onClick={() => editor.chain().focus().toggleItalic().run()}>
            <Image src={"/richTextEditorIcon/IconItalic.svg"} alt="icon" width={30} height={30} />
          </button>
          <button className="cursor-pointer" onClick={() => editor.chain().focus().toggleUnderline().run()}>
            <Image src={"/richTextEditorIcon/IconUnderline.svg"} alt="icon" width={30} height={30} />
          </button>
          <button className="cursor-pointer" onClick={() => editor.chain().focus().toggleStrike().run()}>
            <Image src={"/richTextEditorIcon/IconStrike.svg"} alt="icon" width={30} height={30} />
          </button>
        </div>

        <div className="flex flex-row h-[44px] px-2 gap-2 items-center">
          <button className="cursor-pointer" onClick={() => editor.chain().focus().setTextAlign("left").run()}>
            <Image src={"/richTextEditorIcon/IconLeft.svg"} alt="icon" width={30} height={30} />
          </button>
          <button className="cursor-pointer" onClick={() => editor.chain().focus().setTextAlign("center").run()}>
            <Image src={"/richTextEditorIcon/IconCenter.svg"} alt="icon" width={30} height={30} />
          </button>
          <button className="cursor-pointer" onClick={() => editor.chain().focus().setTextAlign("right").run()}>
            <Image src={"/richTextEditorIcon/IconRight.svg"} alt="icon" width={30} height={30} />
          </button>
        </div>

        <div className="flex flex-row h-[44px] px-2 gap-2 items-center border-l border-r border-[#E2E8F0]">
          <button className="cursor-pointer" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            <Image src={"/richTextEditorIcon/IconNumber.svg"} alt="icon" width={30} height={30} />
          </button>
          <button className="cursor-pointer" onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <Image src={"/richTextEditorIcon/IconPoin.svg"} alt="icon" width={30} height={30} />
          </button>
        </div>

        <div className="flex flex-row h-[44px] px-2 gap-2 items-center">
          <button className="cursor-pointer" onClick={() => fileRef.current?.click()}>
            <Image src={"/richTextEditorIcon/IconFile.svg"} alt="icon" width={30} height={30} />
          </button>
          <button className="cursor-pointer" onClick={() => imageRef.current?.click()}>
            <Image src={"/richTextEditorIcon/IconImage.svg"} alt="icon" width={30} height={30} />
          </button>
        </div>
      </div>
    </div>
  );
}
