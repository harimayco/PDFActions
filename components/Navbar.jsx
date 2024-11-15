import React, { useRef, useState } from "react";
import Link from "next/link";
import styles from "../styles/navbar.module.css";

export default function Navbar() {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const hamburgerMenuRef = useRef(null);

  const navOptions = [
    ["Merge PDF", "/pdf-tools/merge"],
    ["Compres PDF", "/pdf-tools/compress"],
    ["Split PDF", "/pdf-tools/split"],
    ["Rotate PDF", "/pdf-tools/rotate"],
    ["All PDF Tools", "/pdf-tools"],
  ];

  const handleHamburgerMenuIconClick = (e) => {
    setHamburgerMenu(e.target.checked);
  };
  const handleHamburgerMenuLinkClick = () => {
    setHamburgerMenu(false);
    hamburgerMenuRef.current.checked = false;
  };

  return (
    <nav className="overflow-hidden">
      <header className="flex items-center justify-center text-gray-600 body-font h-[70px] bg-rose-800">
        <div className="flex items-center flex-wrap w-11/12 justify-between">
          <div className="text-slate-200 title-font font-medium text-xl">
            <Link href="/">PDFActions</Link>
          </div>
          <nav className="w-1/3 min-w-[400px] items-center text-base justify-around hidden md:flex">
            {navOptions.map((navOption, i) => (
              <span
                key={i}
                className="text-slate-200 hover:font-bold hover:border-b-2 border-neutral-300 transition-[border]"
              >
                <Link href={navOption[1]}>{navOption[0]}</Link>
              </span>
            ))}
          </nav>

          {/* Hamburger Menu */}
          <div className="md:hidden float-right z-50">
            <label htmlFor="check" className={styles.hamburger_icon}>
              <input
                type="checkbox"
                id="check"
                onChange={handleHamburgerMenuIconClick}
                ref={hamburgerMenuRef}
              />
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
        </div>
      </header>
      {/* Mobile Menu */}
      <div
        className="md:hidden fixed top-[10vh] right-0 h-[90vh] w-[200px] bg-rose-800 transition-all pt-12 px-4 flex flex-col"
        style={{
          transform: hamburgerMenu
            ? "translate(0px,0px)"
            : "translate(200px,0px)",
        }}
      >
        {navOptions.map((navOption, i) => (
          <Link href={navOption[1]} key={i}>
            <span className="flex items-center text-slate-200 hover:font-bold border-b-2 h-12 border-neutral-300 transition-[border]">
              <div onClick={handleHamburgerMenuLinkClick}>{navOption[0]}</div>
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
