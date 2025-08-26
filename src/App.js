import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const categories = [
  "SCHEDULING CONFLICTS",
  "PREPARATION DELAYS",
  "TIMING CONFLICTS",
  "EVS CONCERNS",
  "COURTESY & RESPECT ISSUES",
];

const styles = {
  container: {
    boxSizing: "border-box",
    width: "100vw",
    maxWidth: 440,
    minHeight: "100vh",
    margin: "0 auto",
    padding: "16px 8px 48px 8px",
    borderRadius: 0,
    background: "#fcfcfc",
    fontFamily: "Segoe UI, Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#224",
    marginBottom: 18,
    fontWeight: 600,
    fontSize: "1.6rem",
    letterSpacing: ".02em",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  item: {
    background: "#f5f8ff",
    borderRadius: 12,
    padding: "16px 12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 1px 8px #e9eaea",
    minWidth: 0,
  },
  category: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#2c426c",
    marginBottom: 6,
    textAlign: "center",
    letterSpacing: 0.2,
  },
  count: {
    fontSize: "1.25rem",
    color: "#4987f2",
    marginBottom: 4,
  },
  button: {
    width: "100%",
    minWidth: "140px",
    maxWidth: "270px",
    padding: "12px 10px",
    color: "#fff",
    backgroundColor: "#497eea",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: "1.035rem",
    fontWeight: 600,
    marginTop: 3,
    marginBottom: 0,
    transition: "background .2s",
  },
  buttonReset: {
    width: "97vw",
    maxWidth: "350px",
    margin: "30px auto 0",
    display: "block",
    padding: "16px 10px",
    background: "#ececec",
    color: "#223",
    border: "none",
    borderRadius: 12,
    fontWeight: 600,
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "background .2s",
  },
  buttonExport: {
    width: "97vw",
    maxWidth: "350px",
    margin: "18px auto 0",
    display: "block",
    padding: "16px 10px",
    background: "#49b768",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontWeight: 600,
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "background .2s",
  },
};

function App() {
  const [counts, setCounts] = useState(Array(categories.length).fill(0));

  const handleIncrement = (idx) => {
    setCounts((prev) =>
      prev.map((count, i) => (i === idx ? count + 1 : count))
    );
  };

  const handleReset = () => {
    setCounts(Array(categories.length).fill(0));
  };

  const handleExport = () => {
    const data = categories.map((cat, i) => ({
      Category: cat,
      Count: counts[i],
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Counts");
    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "dashboard_counts.xlsx");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Issue Tracking Dashboard</h2>
      <div style={styles.list}>
        {categories.map((cat, idx) => (
          <div key={cat} style={styles.item}>
            <span style={styles.category}>{cat}</span>
            <span style={styles.count}>
              Count: <b>{counts[idx]}</b>
            </span>
            <button style={styles.button} onClick={() => handleIncrement(idx)}>
              {cat}
            </button>
          </div>
        ))}
      </div>
      <button style={styles.buttonReset} onClick={handleReset}>
        🔄 Reset All Values
      </button>
      <button style={styles.buttonExport} onClick={handleExport}>
        📤 Export to Excel
      </button>
      <p
        style={{
          textAlign: "center",
          marginTop: 16,
          fontSize: ".99rem",
          color: "#8d97ad",
        }}
      >
        Tap an issue to increment.
        <br />
        Use <b>Reset</b> to start over.
        <br />
        Use <b>Export</b> for Excel.
      </p>
    </div>
  );
}

export default App;
