import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Story } from "@/components/sections/Story";
import { WatchReveal } from "@/components/sections/WatchReveal";
import { Specifications } from "@/components/sections/Specifications";
import { Presence } from "@/components/sections/Presence";
import { Craft } from "@/components/sections/Craft";
import { Movement } from "@/components/sections/Movement";
import { RotaryConnection } from "@/components/sections/RotaryConnection";
import { Caseback } from "@/components/sections/Caseback";
import { Edition } from "@/components/sections/Edition";
import { Price } from "@/components/sections/Price";
import { Service } from "@/components/sections/Service";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Story />
      <WatchReveal />
      <Specifications />
      <Craft />
      <Presence />
      <Movement />
      <RotaryConnection />
      <Caseback />
      <Edition />
      <Price />
      <Service />
      <Faq />
      <Contact />
    </>
  );
}
