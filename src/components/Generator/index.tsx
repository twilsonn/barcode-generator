import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import {
  Barcode,
  barcodesAtom,
  BarcodeType,
  maxBarcodeHeightAtom,
  maxBarcodeWidthAtom,
} from "../../store";

import { useResize } from "../../hooks/useResize";

import bwipJS from "bwip-js";

import { CSSGrid, layout, measureItems } from "react-stonecutter";

const Grid = measureItems(CSSGrid, { measureImages: true, background: true });

const ReactBarcode: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > &
    Barcode
> = (props) => {
  const { value, id, type, size, height } = props;
  const [maxWidth, setMaxWidth] = useAtom(maxBarcodeWidthAtom);
  const [maxHeight, setMaxHeight] = useAtom(maxBarcodeHeightAtom);

  const [url, setUrl] = useState("");

  const disabledHeight: BarcodeType[] = ["qrcode", "azteccode"];

  useLayoutEffect(() => {
    try {
      let canvas = document.createElement("canvas");

      bwipJS.toCanvas(canvas, {
        bcid: type,
        text: value,
        scale: size || 2,
        width: 25,
        height: disabledHeight.includes(type) ? 25 : height,
        includetext: true,
        textxalign: "center",
      });

      setUrl(canvas.toDataURL("image/png"));
      setMaxWidth(Math.max(canvas.width, maxWidth));
      setMaxHeight(Math.max(canvas.height, maxHeight));
    } catch (e) {}
  });

  return <img id={id} src={url} />;
};

const Generator: React.FC = () => {
  const [barcodes] = useAtom(barcodesAtom);
  const [maxWidth] = useAtom(maxBarcodeWidthAtom);
  const [maxHeight] = useAtom(maxBarcodeHeightAtom);

  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useResize(ref);

  const columns = Math.floor(width / (maxWidth + 48));

  return (
    <main className="generator w-3/4 ml-[25%] min-h-screen p-12">
      <div ref={ref} className="flex justify-center">
        <Grid
          component="ul"
          columns={columns}
          columnWidth={maxWidth}
          gutterWidth={48}
          gutterHeight={48}
          duration={200}
          layout={layout.pinterest}
          children={barcodes.map((b) => {
            return (
              <li key={b.id} itemHeight={maxHeight}>
                <div
                  className="flex justify-center"
                  style={{ width: maxWidth }}
                >
                  <ReactBarcode
                    id={b.id}
                    value={b.value}
                    type={b.type}
                    size={b.size}
                    height={b.height}
                  />
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
