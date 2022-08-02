import React from "react";

function Footer() {
  return (
    <footer className="fixed-bottom text-center pb-2 pt-3 bg-primary"
      style={{
        height: "50px",
        bottom: "0",
        width: "100%",
        position: "absolute",
        color: "white"
      }}
    >
      <p>&copy; Remigijus Viciulis 2022</p>
    </footer>
  );
}

export default Footer;