import { atom } from "jotai";

const barcodeTypes = ["code128", "code39", "ean", "upc", "qr"];
type BarcodeType = typeof barcodeTypes[number];

type Barcode = {
  id: string;
  type: BarcodeType;
  value: string;
};

const barcodesAtom = atom<Barcode[]>([]);

const maxBarcodeWidthAtom = atom<number>(0);

if (process.env.NODE_ENV !== "production") {
  barcodesAtom.debugLabel = "barcodes";
  // debugLabel is 'count' now
}

export type { Barcode, BarcodeType };
export { barcodesAtom, barcodeTypes, maxBarcodeWidthAtom };
