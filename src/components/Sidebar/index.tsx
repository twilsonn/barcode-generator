import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed w-1/4 h-screen bg-stone-100 border-r border-stone-300 p-4">
      <header className="prose pb-4 select-none">
        <h1>Barcode Generator</h1>
      </header>
      <form>
        <div className="flex flex-col mb-2">
          <label htmlFor="barcode-type" className="select-none">
            Barcode Type
          </label>
          <select name="barcode-type" id="barcode-type" className="form-select">
            <option value="test">test</option>
            <option value="test">test</option>
            <option value="test">test</option>
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
            type="button"
            className="col-span-4 bg-black text-white px-3 py-4 text-center border border-black"
          >
            Generate
          </button>
        </div>
      </form>
    </aside>
  );
};

export default Sidebar;
