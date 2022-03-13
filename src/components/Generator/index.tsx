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
  const [url, setUrl] = useState("");

  useLayoutEffect(() => {
    try {
      let canvas = document.createElement("canvas");
      bwipJS.toCanvas(canvas, {
        bcid: "code128", // Barcode type
        text: value, // Text to encode
        scale: 2, // 3x scaling factor
        // height: 20, // Bar height, in millimeters
        includetext: true, // Show human-readable text
        textxalign: "center", // Always good to set this
      });

      setUrl(canvas.toDataURL("image/png"));
      setMaxWidth(Math.max(canvas.width, maxWidth));
    } catch (e) {
      // `e` may be a string or Error object
    }
  });

  return <img id={id} src={url} />;
};

const Generator: React.FC = () => {
  const [barcodes] = useAtom(barcodesAtom);
  const [maxWidth] = useAtom(maxBarcodeWidthAtom);

  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useResize(ref);

  const columns = Math.floor(width / (maxWidth + 32));

  return (
    <main className="generator w-3/4 ml-[25%] min-h-screen p-4">
      <div ref={ref} className="flex justify-center">
        <CSSGrid
          component="ul"
          columns={columns}
          columnWidth={maxWidth}
          gutterWidth={32}
          gutterHeight={32}
          duration={200}
          children={barcodes.map((b) => {
            return (
              <li key={b.id}>
                <div
                  className="flex justify-center"
                  style={{ width: maxWidth }}
                >
                  <Barcode id={b.id} value={b.value} />
                </div>
              </li>
            );
          })}
        />
      </div>
    </main>
  );
};

export default Generator;
