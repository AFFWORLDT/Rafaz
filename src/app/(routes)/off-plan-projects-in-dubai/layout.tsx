import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Off Plan Projects in Dubai | Buy Off Plan Properties in dubai",
  description:
    "Invest in the best Off Plan Projects in Dubai! Find premium Off Plan Properties in Dubai with flexible payment options. See the latest developments with Rafaz Properties LLC.",
  keywords: [
    "off plan projects in dubai",
    "off plan properties in dubai",
    "new projects dubai",
    "dubai off plan",
    "new developments dubai",
    "off plan apartments dubai",
    "dubai payment plans",
  ],
};

export default function OffPlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

