import { v4 as uuid } from "uuid";
import { useAtom } from "jotai";
import React, { ChangeEvent, useDebugValue, useState } from "react";
import { barcodesAtom, BarcodeType, barcodeTypes } from "../../store";

const Sidebar: React.FC = () => {
  const [barcodes, setBarcodes] = useAtom(barcodesAtom);
  const [barcodeInput, setBarcodeInput] = useState("");
  const [barcodeTypeInput, setBarcodeTypeInput] =
    useState<BarcodeType>("code128");

  const changeBarcodeTypeInput = (e: ChangeEvent<HTMLSelectElement>) =>
    setBarcodeTypeInput(e.target.value as BarcodeType);

  return (
    <aside className="side-bar fixed w-1/4 h-screen bg-stone-100 border-r border-stone-300 p-4">
      <header className="prose pb-4 select-none">
        <h1>
          Barcode
          <br />
          Generator
        </h1>
      </header>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (!barcodeInput || !barcodeTypeInput) {
            return;
          }

          setBarcodes(
            barcodeInput
              .replace(/(^[ \t]*\n)/gm, "")
              .split("\n")
              .map((b) => {
                return {
                  id: uuid(),
                  value: b,
                  type: barcodeTypeInput,
                };
              })
          );
        }}
      >
        <div className="flex flex-col mb-2">
          <label htmlFor="barcode-type" className="select-none">
            Barcode Type
          </label>
          <select
            name="barcode-type"
            id="barcode-type"
            className="form-select"
            onChange={changeBarcodeTypeInput}
            value={barcodeTypeInput}
          >
            {barcodeTypes.map((type) => {
              return (
                <option key={type} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="barcode-input" className="select-none">
            Text input (one code per line)
          </label>
          <textarea
            name="barcode-input"
            id="barcode-input"
            className="form-textarea max-h-96"
            cols={20}
            rows={10}
            onChange={(e) => setBarcodeInput(e.target.value)}
          ></textarea>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 select-none">
          <button
            type="button"
            className="bg-white text-black px-3 py-4 text-center border border-black"
          >
            Clear
          </button>

          <button
            type="submit"
            className="col-span-4 bg-black text-white px-3 py-4 text-center border border-black"
          >
            Generate
          </button>
        </div>
      </form>

      <div className="text-right">Generated {barcodes.length} barcodes</div>
    </aside>
  );
};

export default Sidebar;
