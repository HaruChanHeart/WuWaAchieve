import { MetaProvider, Title } from "@solidjs/meta";
import { getCookie, setCookie } from "vinxi/http";

import Category from '~/components/Category';
import Footer from '~/components/Footer';

export default function Home() {
  return (
    <MetaProvider>
      <Title>WuWaAchieve</Title>
      <div class="bg-slate-950 min-h-screen h-full py-10">
        <Category />
        <Footer />
      </div>
    </MetaProvider>
  );
}
