import { Button } from "@fluentui/react-components";
import * as icons from "@fluentui/react-icons";
import { IWidgetElement } from "../../types/manifest";

interface ButtonComponentProps {
  component: IWidgetElement;
}

type IconProps = {
  name: string;
};
const DynamicIcon = ({ name }: IconProps) => {
  const IconComponent = (icons as any)[name];
  if (!IconComponent) return null;

  return <IconComponent />;
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({ component }) => {
  return (
    <Button
      style={component.data?.full ? { width: "100%" } : {}}
      appearance={component.data?.type || "secondary"}
      shape={component.data?.shape || "rounded"}
      size={component.data?.size || "medium"}
      iconPosition={component.data?.iconPosition || "before"}
      icon={
        component.data?.icon ? (
          <DynamicIcon name={component.data?.icon} />
        ) : null
      }
      id={`${component.id}-child`}
      onClick={(e) => {
        e.stopPropagation();
      }}>
      {component.data?.text || null}
    </Button>
  );
};

export default ButtonComponent;
