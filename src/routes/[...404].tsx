import { MetaProvider, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";

export default function NotFound() {
  return (
    <MetaProvider>
      <Title>Not Found</Title>
      <main class="container min-h-screen max-w-2xl h-full flex flex-col justify-center items-center text-center mx-auto text-gray-700 p-4">
        <img src="/baizhi.webp" alt="baizhi" />
        <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-2">Not Found</h1>
        <p class="my-4">
          <A href="/" class="text-sky-600 hover:underline">
            Home
          </A>
        </p>
      </main>
    </MetaProvider>
  );
}
