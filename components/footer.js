import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="text-gray-700 py-4 mt-12 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <p className="text-sm text-center">
          &copy; {currentYear} Fundora. All Rights Reserved.
        </p>
      </footer>
    </>
  );
};
export default Footer;
