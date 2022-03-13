import { v4 as uuid } from "uuid";
import { useAtom } from "jotai";
import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  barcodesAtom,
  BarcodeType,
  barcodeTypes,
  maxBarcodeHeightAtom,
  maxBarcodeWidthAtom,
} from "../../store";

import { Select, TextArea, Button, Range } from "../FormElements";

const Sidebar: React.FC = () => {
  const [barcodes, setBarcodes] = useAtom(barcodesAtom);
  const [maxWidth, setMaxWidth] = useAtom(maxBarcodeWidthAtom);
  const [maxHeight, setMaxHeight] = useAtom(maxBarcodeHeightAtom);

  const [barcodeInput, setBarcodeInput] = useState("");

  const [barcodeTypeInput, setBarcodeTypeInput] =
    useState<BarcodeType>("code128");
  const [barcodeSizeInput, setBarcodeSizeInput] = useState<string>("3");

  const changeBarcodeTypeInput = (e: ChangeEvent<HTMLSelectElement>) =>
    setBarcodeTypeInput(e.target.value as BarcodeType);

  const changeBarcodeSizeInput = (e: ChangeEvent<HTMLInputElement>) =>
    setBarcodeSizeInput(e.target.value);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!barcodeInput || !barcodeTypeInput) {
      return;
    }

    setMaxWidth(0);
    setMaxHeight(0);

    setBarcodes(
      barcodeInput
        .replace(/(^[ \t]*\n)/gm, "")
        .split("\n")
        .map((b) => {
          return {
            id: uuid(),
            value: b,
            type: barcodeTypeInput,
            size: parseInt(barcodeSizeInput),
          };
        })
    );
  };

  return (
    <aside className="side-bar fixed w-1/4 h-screen bg-stone-100 border-r border-stone-300 p-4">
      <header className="prose pb-4 select-none">
        <h1>
          Barcode
          <br />
          Generator
        </h1>
        {barcodeTypeInput}
      </header>
      <form onSubmit={submit}>
        <Select
          id="barcode-type"
          title="Barcode Type"
          value={barcodeTypeInput}
          onChange={changeBarcodeTypeInput}
        >
          {barcodeTypes.map((type) => {
            return (
              <option key={type} value={type}>
                {type}
              </option>
            );
          })}
        </Select>

        <TextArea
          id="barcode-input"
          title="Text input (one code per line)"
          className="max-h-96"
          cols={20}
          rows={10}
          onChange={(e) => setBarcodeInput(e.target.value)}
        />

        <Range
          id="barcode-size"
          name="barcode-size"
          value={barcodeSizeInput}
          onChange={changeBarcodeSizeInput}
          title="Barcode Size"
          min="1"
          max="10"
        />

        <p
          className="text-right text-sm hover:text-blue-600 select-none cursor-pointer mb-2"
          data-bs-toggle="collapse"
          data-bs-target="#moreOptions"
          aria-expanded="false"
          aria-controls="moreOptions"
        >
          More Options
        </p>

        <div className="collapse" id="moreOptions">
          <div className="block pb-4">
            <Range
              id="barcode-height"
              name="barcode-height"
              value={barcodeSizeInput}
              onChange={changeBarcodeSizeInput}
              title="Barcode Height"
              min="1"
              max="10"
              disabled={barcodeTypeInput === "qrcode"}
            />

            <Range
              id="barcode-grid-columns"
              name="barcode-grid-columns"
              value={barcodeSizeInput}
              onChange={changeBarcodeSizeInput}
              title="Grid Columns"
              min="1"
              max="10"
            />

            <Range
              id="barcode-grid-gap"
              name="barcode-grid-gap"
              value={barcodeSizeInput}
              onChange={changeBarcodeSizeInput}
              title="Grid Gap"
              min="1"
              max="10"
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 select-none">
          <Button
            type="button"
            title="Clear"
            buttonType="secondary"
            buttonInputType="button"
          />
          <Button
            type="button"
            title="Generate"
            buttonInputType="submit"
            buttonType="primary"
            className="col-span-4"
          />
        </div>
      </form>

      {barcodes.length > 0 && (
        <div className="text-right">Generated {barcodes.length} barcodes</div>
      )}
    </aside>
  );
};

export default Sidebar;
