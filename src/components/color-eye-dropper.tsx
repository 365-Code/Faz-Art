"use client";

import type React from "react";
import { useCallback, useState, useEffect } from "react";
import useEyeDropper from "use-eye-dropper";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { PipetteIcon, AlertCircleIcon } from "lucide-react";
import { Input } from "./ui/input";

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
  selectedColor?: string;
}

const ColorEyeDropper: React.FC<ColorEyeDropperProps> = ({
  onColorChange,
  selectedColor = "#ffffff",
}) => {
  const { open, isSupported } = useEyeDropper();
  const [color, setColor] = useState<string>(selectedColor);
  const [error, setError] = useState<DropperError>();

  useEffect(() => {
    setColor(selectedColor);
  }, [selectedColor]);

  const pickColor = useCallback(async () => {
    try {
      const result = await open();
      setColor(result.sRGBHex);
      onColorChange(result.sRGBHex);
      setError(undefined);
    } catch (e) {
      if (isNotCanceled(e)) {
        setError(e);
      }
    }
  }, [open, onColorChange]);

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4">
        {isSupported() ? (
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={pickColor}
                  type="button"
                >
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
                className="w-6 h-6 rounded border border-border"
                style={{ backgroundColor: color }}
              />
              {/* <Badge variant="outline"> */}
              <Input
                type="text"
                value={color}
                onChange={(e) => onColorChange(e.target.value)}
                className="w-[100px]"
              />
              {/* {color} */}
              {/* </Badge> */}
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
    </TooltipProvider>
  );
};

export default ColorEyeDropper;
