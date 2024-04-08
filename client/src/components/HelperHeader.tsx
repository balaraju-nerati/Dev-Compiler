import { Save, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { CompilerSliceStateType, updateCurrantLanguage } from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";

export default function HelperHeader() {
  const dispatch = useDispatch()
  const currentLanguage = useSelector((state: RootState) => state.compilerSlice.currentLanguage)

  return (
    <div className="_helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center">
      <div className="_btn_container flex gap-1">
        <Button
          variant="success"
          className="flex justify-center items-center gap-1"
        >
          <Save size={16} />
          Save
        </Button>
        <Button
          variant="secondary"
          className="flex justify-center items-center gap-1"
        >
          <Share2 size={16} /> Share
        </Button>
      </div>
      <div className="_select_language flex justify-center items-center gap-2">
        <p className=" text-sm">Current Language:</p>
        <Select defaultValue={currentLanguage} onValueChange={(value) => dispatch(updateCurrantLanguage(value as CompilerSliceStateType["currentLanguage"]))}>
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
