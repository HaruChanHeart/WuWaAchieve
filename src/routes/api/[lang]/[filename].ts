import type { APIEvent } from '@solidjs/start/server';
import fs from 'node:fs';

export function GET({ params }: APIEvent) {
    try {
        const jsonFile = fs.readFileSync(`./src/assets/json/${params.lang}/${params.filename}.json`, 'utf8');
        return JSON.parse(jsonFile);
    }
    catch {
        return { 'status': 404 };
    }
}