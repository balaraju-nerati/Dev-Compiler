import { Code, Copy, Loader2, Save, Share2 } from "lucide-react";
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
import { useSaveCodeMutation } from "@/redux/slices/api";

export default function HelperHeader() {
  const [shareBtn, setShareBtn] = useState<boolean>(false);

  const navigate = useNavigate();

  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );

  const [saveCode, { isLoading }] = useSaveCodeMutation();

  const { urlId } = useParams();
  useEffect(() => {
    if (urlId) {
      setShareBtn(true);
    } else {
      setShareBtn(false);
    }
  }, [urlId]);

  const handleSaveCode = async () => {
    try {
      const response = await saveCode(fullCode).unwrap();
      navigate(`/compiler/${response.url}`, { replace: true });
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
        <Button
          variant="success"
          className="flex justify-center items-center gap-1"
          onClick={handleSaveCode}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className=" animate-spin" /> Saving
            </>
          ) : (
            <>
              <Save size={16} /> Save
            </>
          )}
        </Button>
        {shareBtn && (
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
