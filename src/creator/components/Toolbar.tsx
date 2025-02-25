import {
  Button,
  Input,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  Tooltip,
} from "@fluentui/react-components";
import { useManifestStore } from "../stores/useManifestStore";
import { useCallback, useRef, useState } from "react";
import {
  CheckmarkRegular,
  DismissRegular,
  EditRegular,
  SaveRegular,
} from "@fluentui/react-icons";
import { message } from "@tauri-apps/plugin-dialog";

interface ToolbarProps {}

const CreatorToolbar: React.FC<ToolbarProps> = () => {
  const projectName = useManifestStore((obj) => obj.label);
  const [editName, setEditName] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = useCallback(async (key: string, label: string) => {
    if (key in (window.__INITIAL_STATE__?.existingKeys || {})) {
      await message("A widget with same label already exist", {
        title: "Error",
        kind: "error",
      });
      return;
    }

    useManifestStore.setState({ key, label });
    setEditName(false);
  }, []);

  return (
    <Toolbar style={{ gap: "5px", justifyContent: "space-between" }}>
      <ToolbarGroup style={{ display: "flex", alignItems: "center" }}>
        {!editName ? (
          <Tooltip content="Project name" relationship="label">
            <Button
              appearance="secondary"
              icon={<EditRegular />}
              onClick={() => {
                setEditName(true);
                setTimeout(() => {
                  nameInputRef.current?.focus();
                }, 100);
              }}>
              {projectName}
            </Button>
          </Tooltip>
        ) : (
          <form
            style={{ gap: "5px", display: "flex", alignItems: "center" }}
            onSubmit={(e) => {
              e.preventDefault();
              const label = nameInputRef.current?.value || "";
              const key = label.replace(/ /g, "").toLowerCase();
              onSubmit(key, label);
            }}>
            <Input size="small" ref={nameInputRef} defaultValue={projectName} />
            <ToolbarButton icon={<CheckmarkRegular />} type="submit" />
            <ToolbarButton
              icon={<DismissRegular />}
              onClick={() => setEditName(false)}
            />
          </form>
        )}
        <ToolbarDivider />
        <Tooltip content="Save" relationship="label">
          <ToolbarButton icon={<SaveRegular />} />
        </Tooltip>
      </ToolbarGroup>
      <ToolbarGroup></ToolbarGroup>
    </Toolbar>
  );
};

export default CreatorToolbar;
