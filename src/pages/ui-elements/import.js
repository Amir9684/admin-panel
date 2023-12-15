// ** React Imports
import { useCallback, useMemo, useState } from "react";

// ** Third Party Components
import { useDropzone } from "react-dropzone";
import { DownloadCloud } from "react-feather";

// ** Styles
import "@styles/react/libs/file-uploader/file-uploader.scss";
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const Import = ({ imgFile = "", setImgFile }) => {
  // ** States
  const [preview, setPreview] = useState("");
  const onDrop = useCallback((acceptedFile) => {
    const file = new FileReader();

    file.onload = () => setPreview(file.result);
    setImgFile(acceptedFile[0]);
    file.readAsDataURL(acceptedFile[0]);
  });

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      multiple: false,
      accept: { "image/*": [] },
      onDrop,
    });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  return (
    <div
      {...getRootProps({ className: "dropzone", style })}
      style={{
        position: "relative",
      }}
    >
      <input {...getInputProps()} />
      {preview.length || imgFile ? (
        <img
          style={{
            width: "100%",
            height: "320px",
            objectFit: "fill",
          }}
          src={preview || imgFile}
          alt="preview"
        />
      ) : (
        <div
          className="d-flex align-items-center justify-content-center flex-column"
          style={{ width: "100%" }}
        >
          <DownloadCloud size={64} />
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.16)",
          boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(3.2px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          zIndex: 999999,
          width: "100%",
          alignContent: "center",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            textAlign: "center",
            marginTop: "10px",
            color: "#e6e6e6",
          }}
        >
          {preview.length ? "انتخاب عکس جدید" : "انتخاب عکس"}
        </p>
      </div>
    </div>
  );
};

export default Import;
