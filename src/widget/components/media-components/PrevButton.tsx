import React, { useCallback } from "react";
import { IWidgetElement } from "../../../types/manifest";
import ButtonComponent from "../ButtonComponent";
import { useVariableStore } from "../../stores/useVariableStore";
import { invoke } from "@tauri-apps/api/core";

interface PrevButtonProps {
  component: IWidgetElement;
}

const PrevButton: React.FC<PrevButtonProps> = ({ component }) => {
  const currentMedia = useVariableStore((state) => state.currentMedia);
  const mediaList = useVariableStore((state) => state.media);
  const isSelectedMediaCurrentSession =
    mediaList.find((item) => item.is_current_session)?.player_id ===
    currentMedia?.player_id;
  const prevEnabled =
    !!currentMedia?.playback_info.controls?.prev_enabled &&
    isSelectedMediaCurrentSession;

  const onClick = useCallback(async () => {
    if (!currentMedia) return;
    await invoke("media_action", {
      playerId: currentMedia?.player_id,
      action: "prev",
    }).catch(console.log);
  }, [currentMedia]);

  return (
    <ButtonComponent
      component={{
        ...component,
        data: { ...(component.data || {}), icon: "PreviousRegular" },
      }}
      onClick={onClick}
      disabled={!prevEnabled || !currentMedia}
    />
  );
};

export default PrevButton;
