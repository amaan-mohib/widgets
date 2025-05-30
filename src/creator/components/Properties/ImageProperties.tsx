import { Checkbox, Select, SpinButton } from "@fluentui/react-components";
import React from "react";
import { useDataTrackStore } from "../../stores/useDataTrackStore";
import {
  IUpdateElementProperties,
  useManifestStore,
} from "../../stores/useManifestStore";
import { spinButtonOnChange } from "../../utils";
import Panel from "./Panel";
import TemplateEditor from "../TemplateEditor";

interface ImagePropertiesProps {}

const ImageProperties: React.FC<ImagePropertiesProps> = () => {
  const selectedId = useDataTrackStore((state) => state.selectedId);
  const elementMap = useManifestStore((state) => state.elementMap);

  const updateProperties = (value: IUpdateElementProperties) => {
    if (!selectedId) return;
    useManifestStore.getState().updateElementProperties(selectedId, value);
  };

  if (!selectedId || !elementMap[selectedId]) return null;

  const imageData = elementMap[selectedId]?.data;

  return (
    <Panel
      title="Image"
      items={[
        {
          label: "Properties",
          value: "properties",
          fields: [
            {
              label: "Source",
              control: (
                <TemplateEditor
                  value={elementMap[selectedId].data?.src}
                  onChange={(value) => {
                    updateProperties({
                      data: { src: value || "" },
                    });
                  }}
                  placeholder="Enter source"
                />
              ),
            },
            {
              label: "Fit",
              control: (
                <Select
                  value={imageData?.fit || "cover"}
                  onChange={(_, { value }) => {
                    updateProperties({
                      data: { fit: value || "cover" },
                    });
                  }}>
                  <option value="default">Default</option>
                  <option value="center">Center</option>
                  <option value="cover">Cover</option>
                  <option value="contain">Contain</option>
                  <option value="none">None</option>
                </Select>
              ),
            },
            {
              label: "Shape",
              control: (
                <Select
                  value={imageData?.shape || "square"}
                  onChange={(_, { value }) => {
                    updateProperties({
                      data: { shape: value || "square" },
                    });
                  }}>
                  <option value="rounded">Rounded</option>
                  <option value="circular">Circular</option>
                  <option value="square">Square</option>
                </Select>
              ),
            },
            {
              label: "Shadow",
              control: (
                <Checkbox
                  checked={imageData?.shadow && imageData?.shadow !== "true"}
                  onChange={(_, { checked }) => {
                    updateProperties({
                      data: {
                        shadow: checked || false,
                      },
                    });
                  }}
                />
              ),
            },
            {
              label: "Bordered",
              control: (
                <Checkbox
                  checked={
                    imageData?.bordered && imageData?.bordered !== "true"
                  }
                  onChange={(_, { checked }) => {
                    updateProperties({
                      data: {
                        bordered: checked || false,
                      },
                    });
                  }}
                />
              ),
            },
          ],
        },
        {
          label: "Size",
          value: "size",
          fields: [
            {
              label: "Width (px)",
              control: (
                <SpinButton
                  min={0}
                  value={parseInt(
                    String(elementMap[selectedId].styles.width || 100),
                    10
                  )}
                  onChange={(event, data) => {
                    spinButtonOnChange(event, data, (value) => {
                      updateProperties({
                        styles: {
                          width: `${value}px`,
                        },
                      });
                    });
                  }}
                />
              ),
            },
            {
              label: "Height (px)",
              control: (
                <SpinButton
                  min={0}
                  value={parseInt(
                    String(elementMap[selectedId].styles.height || 0),
                    10
                  )}
                  onChange={(event, data) => {
                    spinButtonOnChange(event, data, (value) => {
                      updateProperties({
                        styles: {
                          height: `${value}px`,
                        },
                      });
                    });
                  }}
                />
              ),
            },
          ],
        },
      ]}
      selectedId={selectedId}
    />
  );
};

export default ImageProperties;
