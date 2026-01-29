import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import Innovation from "@/components/Innovation";
import Impact from "@/components/Impact";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/get-dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'ru' | 'kk');

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar lang={lang} dict={dict.navbar} />
      <main>
        <Hero dict={dict.hero} />
        <Solutions dict={dict.solutions} />
        <Innovation dict={dict.innovation} />
        <Impact dict={dict.impact} />
      </main>
      <Footer dict={dict.footer} />
    </div>
  );
}
