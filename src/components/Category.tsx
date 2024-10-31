import type { Component } from 'solid-js';
import { createSignal, For } from 'solid-js';
import { createLocalStore, mapLocale } from '../utils/localstore';
import { cache, createAsync } from '@solidjs/router';

// 设置语言为浏览器默认语言
const lang = localStorage.getItem('locale') ?? mapLocale(navigator.language);

interface IAchieve {
    id: number,
    groupid: number,
    level: number,
    name: string,
    desc: string,
    hidden: boolean,
    nextlink: number
}

interface IGroup {
    id: number,
    category: number,
    sort: number,
    name: string
}

interface ICategory {
    id: number,
    name: string
}

const ConvertLevel = (LEVEL: number) => {
    const ARR_LEVEL = [0, 5, 10, 20];
    return ARR_LEVEL[LEVEL];
}

// fetch json
const getACV = cache(async () => {
    const r = await fetch(`/api/${lang}/achievement.json`);
    return (await r.json()) as IAchieve[];
}, "acv");

const getGROUP = cache(async () => {
    const r = await fetch(`/api/${lang}/group.json`);
    return (await r.json()) as IGroup[];
}, "acv_grp");

const getCATEGORY = cache(async () => {
    const r = await fetch(`/api/${lang}/category.json`);
    return (await r.json()) as ICategory[];
}, "acv_cat");

export const route = {
    load() {
        void getACV();
        void getGROUP();
        void getCATEGORY();
    }
}

const Category: Component = () => {
    const ARR_LEVEL = [0, 5, 10, 20];
    const [todos, setTodos] = createLocalStore<any>("achieve_list", {});
    const [category, setCategory] = createSignal<number>(1001);
    const [search, setSearch] = createSignal<string>("");
    const [show, setShow] = createSignal<boolean>(false);

    const acv = createAsync(() => getACV());
    const acv_group = createAsync(() => getGROUP());
    const acv_cat = createAsync(() => getCATEGORY());

    const CompleteCount = (c: number) => {
        let count = 0;
        const CATEGORY_ACV = acv()?.filter((o: IAchieve) => o.groupid === c);

        Object.entries(todos).forEach((o) => {
            if (CATEGORY_ACV?.find((v: IAchieve) => v.id === parseInt(o[0])) && o[1] === true) count++;
        });

        return count;
    }

    const TotalCount = () => {
        let count = 0;
        Object.values(todos).forEach((o) => {
            if (o === true) count++;
        });

        return count;
    }

    const TotalAstrite = () => {
        let count = 0;

        acv()?.forEach((o: IAchieve) => {
            count += ARR_LEVEL[o.level];
        })

        return count;
    }

    const AstriteCount = () => {
        let count = 0;

        Object.entries(todos).forEach((o) => {
            if (o[1] === true) {
                const lv = acv()?.find((p: IAchieve) => p.id === parseInt(o[0]))?.level;
                count += lv ? ARR_LEVEL[lv] : 0;
            };
        });

        return count;
    }

    const ShowUnchecked = (id: number) => {
        if (show() === true) {
            if (todos[id] === undefined || todos[id] === false) return true;
        }
        return false;
    }

    const Card = (DATA: IAchieve) => {
        return (
            <>
                {ShowUnchecked(DATA.id) || show() === false ?
                    <div class="flex flex-row bg-slate-900 hover:bg-slate-700 transition-colors text-white border rounded-sm border-slate-800 p-2 space-x-12">
                        <div class="flex flex-col flex-1">
                            <p class="text-xl font-bold">{DATA.name}</p>
                            <p class="text-md text-slate-400">{DATA.desc}</p>
                        </div>
                        <div class="flex flex-row space-x-5 justify-center items-center">
                            <div class="flex flex-row justify-center items-center">
                                <div class="w-7 h-7 bg-transparent bg-contain bg-no-repeat astrite" />
                                <span> x {ConvertLevel(DATA.level)}</span>
                            </div>
                            <input type="checkbox" class="h-10 w-10" checked={todos[DATA.id]}
                                onChange={(e) => setTodos(DATA.id, e.currentTarget.checked)} />
                        </div>
                    </div>
                    : null}
            </>
        )
    }

    const GroupCard = (DATA: IGroup) => {
        return (
            <div>
                <div class="flex flex-row bg-slate-900 hover:bg-slate-700 transition-colors text-white border rounded-sm border-slate-800 p-2"
                    onClick={() => setCategory(DATA.id)}>
                    <div class="flex flex-col flex-1">
                        <p class="text-lg font-bold">{DATA.name}</p>
                        <p class="text-md text-slate-400">
                            <span class="mr-2">{CompleteCount(DATA.id)} / {acv()?.filter((o: IAchieve) => o.groupid === DATA.id).length}</span>
                            <span class={CompleteCount(DATA.id) === acv()?.filter((o: IAchieve) => o.groupid === DATA.id).length ? 'text-sm text-green-300' : 'text-sm text-yellow-400'}>
                                {((CompleteCount(DATA.id) / (acv()?.filter((o: IAchieve) => o.groupid === DATA.id).length ?? 0)) * 100).toFixed(2)}%
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    // Load JSON File from disk
    const LoadStorage = (e: any) => {
        const f = e.target.files[0];
        const fr = new FileReader();

        fr.addEventListener('load', (e: any) => {
            const a = e.target.result;
            localStorage.setItem('achieve_list', a);
            window.location.reload();
        });

        fr.readAsText(f);
    }

    // Save JSON File
    const SaveStorage = () => {
        const f = new Blob([localStorage.getItem('achieve_list') ?? ''], {type: "json"});
        const a = document.createElement("a"), url = URL.createObjectURL(f);

        a.href = url;
        a.download = 'data.json';
        document.body.appendChild(a);
        a.click();
    }

    return (
        <div class="container p-3 md:p-0 mx-auto grid md:grid-cols-6 md:w-1/2 justify-center gap-5">
            <div class="md:col-span-6 w-full flex flex-col md:flex-row justify-center items-start md:justify-start md:items-center space-y-3 md:space-y-0 space-x-5 text-white">
                <div class="flex md:flex-row justify-start items-center">
                    <div class="flex justify-center items-center gap-2 shrink-0 bg-blue-700 text-lg font-bold py-1 px-3 rounded-full">
                        <span>{TotalCount()} / {acv()?.length} </span>
                        <span class="text-sm">({((TotalCount() / (acv()?.length ?? 0)) * 100).toFixed(2)}%)</span>
                    </div>
                    <div class="flex flex-row justify-center items-center shrink-0 ml-2 text-base font-bold">
                        <div class="w-5 h-5 mx-1 bg-transparent bg-contain bg-no-repeat astrite" />
                        <span> {AstriteCount()} / {TotalAstrite()}</span>
                    </div>
                </div>
                <div class="flex flex-row space-x-2">
                    <input type="checkbox" accept='application/json'
                        onChange={(e) => setShow(e.currentTarget.checked)} />
                    <span class="text-sm shrink-0">Show unchecked only</span>
                </div>
            </div>
            <div class="col-span-6 flex flex-row space-x-2 text-white">
                <div class="flex justify-center items-center bg-slate-700 rounded-full">
                    <label class="cursor-pointer px-3 py-1" for="file">Load File</label>
                    <input type="file" id="file" class="hidden" onChange={(e) => LoadStorage(e)} />
                </div>
                <button class="bg-slate-700 px-3 py-1 rounded-full" type="button" onClick={() => SaveStorage()}>Save File</button>
            </div>
            <aside class="col-span-6 md:col-span-2 flex flex-col space-y-5">
                <For each={acv_cat()}>
                    {(cat: ICategory) =>
                        <div>
                            <div class="text-white text-2xl font-bold mb-2">{cat.name}</div>
                            <div class="flex flex-col space-y-1">
                                <For each={acv_group()
                                    ?.filter((o: IGroup) => o.category === cat.id)
                                    ?.sort((a: IGroup, b: IGroup) => { if (a.sort > b.sort) return 1; return 0; })}
                                    fallback={<div>Loading...</div>}>
                                    {(item: IGroup) => GroupCard(item)}
                                </For>
                            </div>
                        </div>}
                </For>
            </aside>
            <main class="col-span-6 md:col-span-4 flex flex-col space-y-1">
                <input type="text" placeholder="Search..." class="rounded-sm border border-slate-800 bg-transparent text-white py-1 px-3 mb-5"
                    onChange={(e) => { setSearch(e.currentTarget.value) }}
                />
                <For each={acv()
                    ?.filter((o: IAchieve) => o.groupid === category())
                    ?.filter((o: any) => o.name.includes(search()))}
                    fallback={<div>Loading...</div>}>
                    {(item: IAchieve) => Card(item)}
                </For>
            </main>
        </div>
    );
};

export default Category;
