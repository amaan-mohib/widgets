import React, { useCallback } from "react";
import { IWidgetElement } from "../../../types/manifest";
import ButtonComponent from "../ButtonComponent";
import { useVariableStore } from "../../stores/useVariableStore";
import { invoke } from "@tauri-apps/api/core";

interface NextButtonProps {
  component: IWidgetElement;
}

const NextButton: React.FC<NextButtonProps> = ({ component }) => {
  const currentMedia = useVariableStore((state) => state.currentMedia);
  const mediaList = useVariableStore((state) => state.media);
  const isSelectedMediaCurrentSession =
    mediaList.find((item) => item.is_current_session)?.player_id ===
    currentMedia?.player_id;
  const nextEnabled =
    !!currentMedia?.playback_info.controls?.next_enabled &&
    isSelectedMediaCurrentSession;

  const onClick = useCallback(async () => {
    if (!currentMedia) return;
    await invoke("media_action", {
      playerId: currentMedia?.player_id,
      action: "next",
    }).catch(console.log);
  }, [currentMedia]);

  return (
    <ButtonComponent
      component={{
        ...component,
        data: { ...(component.data || {}), icon: "NextRegular" },
      }}
      onClick={onClick}
      disabled={!nextEnabled || !currentMedia}
    />
  );
};

export default NextButton;
