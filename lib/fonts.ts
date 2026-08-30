import localFont from "next/font/local";

/** Söhne Buch / Kraftig — body copy, hero, UI, nav */
export const sohne = localFont({
  src: [
    {
      path: "../public/fonts/TestSohne-Buch-BF663d89cd32e6a.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/TestSohne-Kraftig-BF663d89cd37e26.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sohne",
  display: "swap",
});

/** Söhne Breit Kraftig — marquee / accent display only */
export const sohneBreit = localFont({
  src: [
    {
      path: "../public/fonts/TestSohneBreit-Buch-BF663d89ca2ff42.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/TestSohneBreit-Kraftig-BF663d89caa6b6c.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sohne-breit",
  display: "swap",
});
