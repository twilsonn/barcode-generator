import { atom } from "jotai";

const barcodeTypes = [
  "azteccode",
  "code128",
  "code39",
  "ean13",
  "isbn",
  "qrcode",
  "sscc18",
  "upca",
];

type BarcodeType =
  | "azteccode"
  | "code128"
  | "code39"
  | "ean13"
  | "isbn"
  | "qrcode"
  | "sscc18"
  | "upca";

type Barcode = {
  id: string;
  type: BarcodeType;
  value: string;
  size?: number;
  height?: number;
};

const barcodesAtom = atom<Barcode[]>([]);

const maxBarcodeWidthAtom = atom<number>(0);
const maxBarcodeHeightAtom = atom<number>(0);

if (process.env.NODE_ENV !== "production") {
  barcodesAtom.debugLabel = "barcodes";
  // debugLabel is 'count' now
}

export type { Barcode, BarcodeType };
export {
  barcodesAtom,
  barcodeTypes,
  maxBarcodeWidthAtom,
  maxBarcodeHeightAtom,
};
