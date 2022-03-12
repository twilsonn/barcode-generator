import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { barcodesAtom, maxBarcodeWidthAtom } from "../../store";

import { useResize } from "../../hooks/useResize";

import bwipJS from "bwip-js";

import { SpringGrid, measureItems, CSSGrid } from "react-stonecutter";

const Barcode: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > & { value: string; id: string }
> = (props) => {
  const { value, id } = props;
  const [maxWidth, setMaxWidth] = useAtom(maxBarcodeWidthAtom);

  useLayoutEffect(() => {
    try {
      // The return value is the canvas element
      let canvas = bwipJS.toCanvas(id, {
        bcid: "code128", // Barcode type
        text: value, // Text to encode
        scale: 3, // 3x scaling factor
        height: 10, // Bar height, in millimeters
        includetext: true, // Show human-readable text
        textxalign: "center", // Always good to set this
      });

      setMaxWidth(Math.max(canvas.width, maxWidth));
    } catch (e) {
      // `e` may be a string or Error object
    }
  });

  return <canvas id={id}></canvas>;
};

const Generator: React.FC = () => {
  const [barcodes] = useAtom(barcodesAtom);
  const [maxWidth] = useAtom(maxBarcodeWidthAtom);

  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useResize(ref);

  const columns = Math.floor(width / (maxWidth + 64));

  return (
    <main className="generator w-3/4 ml-[25%] min-h-screen p-4">
      <div ref={ref} className="flex justify-center">
        <CSSGrid
          component="ul"
          columns={columns}
          columnWidth={maxWidth}
          gutterWidth={64}
          gutterHeight={64}
          duration={10}
          children={barcodes.map((b) => {
            return (
              <li key={b.id}>
                <Barcode id={b.id} value={b.value} />
              </li>
            );
          })}
        />
      </div>
    </main>
  );
};

export default Generator;
