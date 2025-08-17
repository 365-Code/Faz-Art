import React, { useCallback, useState } from "react";
import useEyeDropper from "use-eye-dropper";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { PipetteIcon, AlertCircleIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type DropperError = {
  message: string;
  canceled?: boolean;
};

const isError = <T,>(err: DropperError | T): err is DropperError =>
  !!err && err instanceof Error && !!err.message;

const isNotCanceled = <T,>(err: DropperError | T): err is DropperError =>
  isError(err) && !err.canceled;

interface ColorEyeDropperProps {
  onColorChange: (color: string) => void;
}

const ColorEyeDropper: React.FC<ColorEyeDropperProps> = ({ onColorChange }) => {
  const { open, isSupported } = useEyeDropper();
  const [color, setColor] = useState<string>("#ffffff");
  const [error, setError] = useState<DropperError>();

  const pickColor = useCallback(async () => {
    try {
      const result = await open();
      setColor(result.sRGBHex);
      onColorChange(result.sRGBHex);
      setError(undefined); // Clear previous errors
    } catch (e) {
      if (isNotCanceled(e)) {
        setError(e);
      }
    }
  }, [open]);

  return (
    <div className="flex flex-col gap-4">
      {isSupported() ? (
        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={pickColor}>
                <PipetteIcon className="h-4 w-4" />
                <span className="sr-only">Pick a color</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to pick a color from your screen</p>
            </TooltipContent>
          </Tooltip>

          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded border"
              style={{ backgroundColor: color }}
            />
            <Badge variant="outline">{color}</Badge>
          </div>
        </div>
      ) : (
        <div className="flex items-center text-sm text-muted-foreground">
          <AlertCircleIcon className="h-4 w-4 mr-1 text-red-500" />
          <span>EyeDropper API not supported in this browser</span>
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 flex items-center gap-2">
          <AlertCircleIcon className="h-4 w-4" />
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );
};

export default ColorEyeDropper;
