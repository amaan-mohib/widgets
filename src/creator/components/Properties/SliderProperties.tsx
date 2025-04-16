import { Select } from "@fluentui/react-components";
import React from "react";
import { useDataTrackStore } from "../../stores/useDataTrackStore";
import { useManifestStore } from "../../stores/useManifestStore";
import Panel from "./Panel";
import TemplateEditor from "../TemplateEditor";

interface SliderPropertiesProps {
  disableDynamic?: boolean;
}

const SliderProperties: React.FC<SliderPropertiesProps> = ({
  disableDynamic,
}) => {
  const selectedId = useDataTrackStore((state) => state.selectedId);
  const elementMap = useManifestStore((state) => state.elementMap);

  if (!selectedId || !elementMap[selectedId]) return null;

  const sliderData = elementMap[selectedId].data;

  return (
    <Panel
      title="Slider"
      items={[
        {
          label: "Properties",
          value: "properties",
          fields: [
            {
              label: "Minimum",
              control: (
                <TemplateEditor
                  disabled={disableDynamic}
                  value={sliderData?.min || "0"}
                  onChange={(value) => {
                    useManifestStore
                      .getState()
                      .updateElementProperties(selectedId, {
                        data: { min: value || "" },
                      });
                  }}
                  placeholder="Enter minimum"
                />
              ),
            },
            {
              label: "Maximum",
              control: (
                <TemplateEditor
                  disabled={disableDynamic}
                  value={sliderData?.max || "0"}
                  onChange={(value) => {
                    useManifestStore
                      .getState()
                      .updateElementProperties(selectedId, {
                        data: { max: value || "" },
                      });
                  }}
                  placeholder="Enter maximum"
                />
              ),
            },
            {
              label: "Current",
              control: (
                <TemplateEditor
                  disabled={disableDynamic}
                  value={sliderData?.current || "0"}
                  onChange={(value) => {
                    useManifestStore
                      .getState()
                      .updateElementProperties(selectedId, {
                        data: { current: value || "" },
                      });
                  }}
                  placeholder="Enter current"
                />
              ),
            },
            {
              label: "Size",
              control: (
                <Select
                  value={sliderData?.size || "medium"}
                  onChange={(_, { value }) => {
                    useManifestStore
                      .getState()
                      .updateElementProperties(selectedId, {
                        data: { size: value || "medium" },
                      });
                  }}>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                </Select>
              ),
            },
          ],
        },
      ]}
      selectedId={selectedId}
    />
  );
};

export default SliderProperties;
