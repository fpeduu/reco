import localFont from "next/font/local";

const NoirPro = localFont({
  src: [
    {
      path: "../../public/fonts/NoirPro-Heavy.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/NoirPro-HeavyItalic.otf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../../public/fonts/NoirPro-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/NoirPro-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/NoirPro-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/NoirPro-SemiBoldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/NoirPro-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/NoirPro-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/NoirPro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NoirPro-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/NoirPro-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
  ],
  variable: "--font-NoirPro",
});

export default NoirPro;
