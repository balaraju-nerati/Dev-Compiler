import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import RenderCode from "@/components/RenderCode";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Compiler() {
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
          <RenderCode/>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
