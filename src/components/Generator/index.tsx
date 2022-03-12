import { useAtom } from "jotai";
import React, { createRef, useRef } from "react";
import { barcodesAtom } from "../../store";
import ReactBarcode from "../JsBarcode";

const Generator: React.FC = () => {
  const [barcodes] = useAtom(barcodesAtom);

  return (
    <main className="w-3/4 ml-[25%] min-h-screen p-4">
      {barcodes.map((b) => {
        return (
          <ReactBarcode
            key={b.id}
            value={b.value}
            options={{ format: "code128" }}
          />
        );
      })}
    </main>
  );
};

export default Generator;
