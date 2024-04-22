import React, { useState, useEffect, useRef} from "react";

const DragAndDrop = ({className, handleChange, handleDrop, filesMap, filesUnloadedMap, files, loading, ...props}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const _handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      for (let i = 0; i < e.target.files["length"]; i++) {
        if(handleChange)handleChange(e.target.files[i])
      }
    }
  }

  const _handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        if(handleDrop)handleDrop(e.dataTransfer.files[i])
      }
    }
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  const openFileExplorer = () => {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div className={"w-full flex flex-col items-center justify-center mt-6 " + className} >
      <form
        className={`${
          dragActive ? "bg-blue-400" : "bg-blue-100"
        }  p-4 w-full rounded-lg min-h-[10rem] text-center flex flex-col items-center justify-center cursor-pointer hover:bg-blue-400 hover:text-white draganddrop-hover`}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={_handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <div className="flex w-full flex-wrap max-h-[200px] overflow-auto">                
            {files.map((file, idx) => filesMap(file, idx))}
            {files.map((file, idx) => filesUnloadedMap(file, idx))}
        </div>
        {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={_handleChange}
          accept=".doc, .docx, .pdf"
        />
        {
            !loading ?                
            <div onClick={openFileExplorer} className="w-full h-[60px]">                
                <p>
                  Нажмите чтобы выбрать документы для загрузки или перетащите файлы в эту зону.
                </p>
            </div>
            :
            <></>
        }

        {/* <button
          className="bg-black rounded-lg p-2 mt-3 w-auto"
          onClick={handleSubmitFile}
        >
          <span className="p-2 text-white">Submit</span>
        </button> */}
      </form>
    </div>
  );
}

DragAndDrop.displaynames = "DragAndDrop"

export default DragAndDrop