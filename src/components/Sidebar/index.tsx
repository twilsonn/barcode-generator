import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside>
      <header>Barcode Generator</header>
      <form>
        <div>
          <label htmlFor="barcode-type">Barcode Type</label>
          <input type="text" name="barcode-type" id="barcode-type" />
        </div>

        <div>
          <label htmlFor="barcode-input">Text input (one code per line)</label>
          <textarea
            name="barcode-input"
            id="barcode-input"
            cols={20}
            rows={10}
          ></textarea>
        </div>

        <div>
          <button type="button">Generate</button>
        </div>
      </form>
    </aside>
  );
};

export default Sidebar;
