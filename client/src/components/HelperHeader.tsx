import {
  Code,
  Copy,
  Download,
  FilePlus,
  PencilLine,
  Save,
  Share2,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useDispatch, useSelector } from "react-redux";
import {
  CompilerSliceStateType,
  updateCurrantLanguage,
} from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";
import { handleError } from "@/utils/handleError";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useEditCodeMutation, useSaveCodeMutation } from "@/redux/slices/api";
import { Input } from "./ui/input";

export default function HelperHeader() {
  const [shareBtn, setShareBtn] = useState<boolean>(false);
  const [postTitle, setPostTitle] = useState<string>("My Code");
  const [saveState, setSaveState] = useState<boolean>(true);
  const [editCode, { isLoading: codeEditLoading }] = useEditCodeMutation();

  const navigate = useNavigate();

  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );

  const [saveCode, { isLoading }] = useSaveCodeMutation();

  const handleDownloadCode = () => {
    if (
      fullCode.html === "" &&
      fullCode.css === "" &&
      fullCode.javascript === ""
    ) {
      toast("Error: Code is empty");
    } else {
      const htmlCode = new Blob([fullCode.html], { type: "text/html" });
      const cssCode = new Blob([fullCode.css], { type: "text/css" });
      const javascriptCode = new Blob([fullCode.javascript], {
        type: "text/javascript",
      });

      const htmlLink = document.createElement("a");
      const cssLink = document.createElement("a");
      const javascriptLink = document.createElement("a");

      htmlLink.href = URL.createObjectURL(htmlCode);
      htmlLink.download = "index.html";
      document.body.appendChild(htmlLink);

      cssLink.href = URL.createObjectURL(cssCode);
      cssLink.download = "style.css";
      document.body.appendChild(cssLink);

      javascriptLink.href = URL.createObjectURL(javascriptCode);
      javascriptLink.download = "script.js";
      document.body.appendChild(javascriptLink);

      if (fullCode.html !== "") {
        htmlLink.click();
      }
      if (fullCode.css !== "") {
        cssLink.click();
      }
      if (fullCode.javascript !== "") {
        javascriptLink.click();
      }

      document.body.removeChild(htmlLink);
      document.body.removeChild(cssLink);
      document.body.removeChild(javascriptLink);

      toast("Code Downloaded successfully");
    }
  };

  const { urlId } = useParams();
  useEffect(() => {
    if (urlId) {
      setShareBtn(true);
      setSaveState(false);
    } else {
      setShareBtn(false);
      setSaveState(true);
    }
  }, [urlId]);

  const handleSaveCode = async () => {
    const body = { fullCode: fullCode, title: postTitle };
    try {
      const response = await saveCode(body).unwrap();
      navigate(`/compiler/${response.url}`, { replace: true });
      toast("Code successfully saved.");
    } catch (error) {
      handleError(error);
      toast("Error while saving the code");
    }
  };

  const handleNewCode = () => {
    navigate("/compiler");
  };

  const handleEditCode = async () => {
    try {
      if (urlId) {
        await editCode({ fullCode, id: urlId }).unwrap();
        toast("Code Updated Successully!");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );

  return (
    <div className="_helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center">
      <div className="_btn_container flex gap-3">
        {saveState ? (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="success" loading={isLoading}>
                  <Save size={16}  /> Save
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex gap-1 justify-center items-center">
                    <Code />
                    Save your Code!
                  </DialogTitle>
                  <div className="__url flex justify-center items-center gap-1">
                    <Input
                      className="bg-slate-700 focus-visible:ring-0"
                      placeholder="Type your Post title"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                    />
                    <Button
                      variant="success"
                      className="h-full"
                      onClick={handleSaveCode}
                    >
                      Save
                    </Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <>
            <Button
              variant="success"
              loading={isLoading}
              onClick={handleNewCode}
            >
              <FilePlus size={16} /> New
            </Button>
          </>
        )}
        {shareBtn && (
          <>
            <Button
              loading={codeEditLoading}
              onClick={handleEditCode}
              variant="blue"
            >
              <PencilLine size={16} />
              Edit
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <Share2 size={16} /> Share
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="flex flex-col justify-between gap-4">
                  <DialogTitle className="flex gap-2 justify-center items-center">
                    <Code size={20} />
                    Share your Code !
                  </DialogTitle>
                  <DialogDescription className="flex flex-col gap-3">
                    <div className="__url flex gap-1">
                      <input
                        type="text"
                        disabled
                        className="w-full px-2 py-2 rounded bg-slate-800 text-slate-400 select-none"
                        value={window.location.href}
                      />
                      <Button
                        variant="outline"
                        onClick={() => {
                          window.navigator.clipboard.writeText(
                            window.location.href
                          );
                          toast("URL copied to the clipboard!");
                        }}
                      >
                        <Copy size={14} />
                      </Button>
                    </div>
                    <div className="text-center">
                      Share this URL with your friends to collaborate.
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Button onClick={handleDownloadCode} size="icon" variant="secondary">
              <Download size={16} />
            </Button>
          </>
        )}
      </div>
      <div className="_select_language flex justify-center items-center gap-2">
        <p className=" text-sm">Current Language:</p>
        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) =>
            dispatch(
              updateCurrantLanguage(
                value as CompilerSliceStateType["currentLanguage"]
              )
            )
          }
        >
          <SelectTrigger className="w-[120px] bg-gray-800 focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">Javascript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
