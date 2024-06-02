import { Navigate } from '@solidjs/router';
import { For, type Component } from 'solid-js';

const Footer: Component = () => {
    const LANG = {
        "de": "Danish",
        "en": "English",
        "es": "Spanish",
        "fr": "French",
        "ja": "Japanese",
        "ko": "Korean",
        "zh-Hans": "Chinese (Simplified)",
        "zh-Hant": "Chinese (Traditional)"
    }

    const changeLang = (lang: string) => {
        localStorage.setItem('locale', lang);
    }

    return (
        <footer class="container p-3 md:p-0 mx-auto grid md:grid-cols-2 gap-8 md:w-1/2 justify-centertext-white text-left my-10 px-5">
            <div class="flex flex-col space-y-2">
                <h2 class="text-white text-2xl font-black">WuWaAchieve</h2>
                <p class="text-md text-slate-300">&copy;2024 HaruChanHeart</p>
                <p class="text-sm text-slate-500">This website is not affiliated with or endorsed by Kuro Games. Wuthering Waves&reg; is a registered trademark of Kuro Games.</p>
            </div>
            <div class="grid grid-cols-2 md:grid-rows-4 md:grid-flow-col text-slate-400">
                <For each={Object.entries(LANG)}>
                    {(items) => <a href="/" target="_self" class="hover:text-slate-200 transition-colors" onClick={() => changeLang(items[0])}>{items[1]}</a>}
                </For>
            </div>
        </footer>
    );
};

export default Footer;