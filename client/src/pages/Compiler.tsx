import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import RenderCode from "@/components/RenderCode";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { handleError } from "@/utils/handleError";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateFullCode } from "@/redux/slices/compilerSlice";
import { useLoadCodeMutation } from "@/redux/slices/api";
import Loader from "@/components/Loader/Loader";

export default function Compiler() {
  const { urlId } = useParams();
  const [loadExistingCode, { isLoading }] = useLoadCodeMutation();
  const dispatch = useDispatch();
  const loadCode = async () => {
    try {
      if (urlId) {
        const response = await loadExistingCode({ urlId }).unwrap();
        dispatch(updateFullCode(response.fullCode));
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    if (urlId) {
      loadCode();
    }
  }, [urlId]);

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100dvh-60px)] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={50}
          className="h-[calc(100dvh-60px)] min-w-[350px]"
        >
          <HelperHeader />
          <CodeEditor />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={50}
          className="h-[calc(100dvh-60px)] min-w-[350px]"
        >
          <RenderCode />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
