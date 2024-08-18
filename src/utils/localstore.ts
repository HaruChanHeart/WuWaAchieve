import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";

export function createLocalStore<T extends object>(name: string, init: T) {
    const localState = localStorage.getItem(name);
    const [state, setState] = createStore<T>(localState ? JSON.parse(localState) : init);

    createEffect(() => localStorage.setItem(name, JSON.stringify(state)));

    return [state, setState];
}

export function mapLocale(locale: string): string {
    const localeMap: { [key: string]: string } = {
				'de-DE': 'de',
				'en-US': 'en',
				'es-ES': 'es',
				'fr-FR': 'fr',
				'ja-JP': 'ja',
				'ko-KR': 'ko',
				'ko-KP': 'ko',
        'zh-CN': 'zh-Hans',
        'zh-SG': 'zh-Hans',
        'zh-TW': 'zh-Hant',
        'zh-HK': 'zh-Hant',
        // I don't know any more correspondences, so I'll just write these for now, and the rest can be added or fix from here
    };
    return localeMap[locale] || 'en';
}
