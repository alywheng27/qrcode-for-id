"use client";

import { Download } from "lucide-react";
import QRCode from "qrcode";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Person } from "./PeopleList";

interface QRDisplayProps {
  person: Person | null;
}

export function QRDisplay({ person }: QRDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRValue = useCallback(() => {
    if (!person) return "";
    return `Name: ${person.NameOfEmployee}\nOffice: ${person.Office}`;
  }, [person]);

  useEffect(() => {
    if (!person || !canvasRef.current) return;

    setIsGenerating(true);
    QRCode.toCanvas(
      canvasRef.current,
      generateQRValue(),
      {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
        errorCorrectionLevel: "H",
      },
      (error: Error | null | undefined) => {
        if (error) console.error("Error generating QR code:", error);
        setIsGenerating(false);
      },
    );
  }, [person, generateQRValue]);

  const downloadQR = async (format: "png" | "jpg") => {
    if (!canvasRef.current || !person) return;

    try {
      const link = document.createElement("a");
      link.href = canvasRef.current.toDataURL(
        format === "jpg" ? "image/jpeg" : "image/png",
      );
      link.download = `${person.NameOfEmployee.replace(/\s+/g, "_")}_QR.${format}`;
      link.click();
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-[#333333] p-4">
        <h2 className="text-[#0fe76f] text-lg font-bold">
          $ QR CODE GENERATOR
        </h2>
      </div>

      {!person ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-[#666666] text-sm font-mono">
              &gt; select a person to generate QR code
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
          <div className="bg-[#0a0a0a] p-6 border border-[#33ff00] glow-border">
            <canvas
              ref={canvasRef}
              style={{
                display: isGenerating ? "none" : "block",
              }}
            />
          </div>

          <div className="text-center max-w-xs">
            <div className="text-[#0fe76f] font-mono font-semibold text-sm">
              {person.NameOfEmployee}
            </div>
            <div className="text-[#ffffff] font-mono text-xs mt-2">
              {person.Office}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => downloadQR("png")}
              disabled={isGenerating}
              className="terminal-button px-4 py-2 text-sm font-mono flex items-center gap-2 hover:bg-[#2eeb00] disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              download png
            </button>
            <button
              type="button"
              onClick={() => downloadQR("jpg")}
              disabled={isGenerating}
              className="terminal-button px-4 py-2 text-sm font-mono flex items-center gap-2 hover:bg-[#2eeb00] disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              download jpg
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
