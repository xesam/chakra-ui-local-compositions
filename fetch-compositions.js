import fetch from 'node-fetch';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { HttpsProxyAgent } from 'https-proxy-agent';

const BASE_URL = 'https://chakra-v3-docs.vercel.app/compositions';
const OUTPUT_DIR = './compositions';
const HTTP_PROXY = 'http://127.0.0.1:7890';

const agent = new HttpsProxyAgent(HTTP_PROXY);

async function fetchJson(url) {
    try {
        const response = await fetch(url, { agent });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return null;
    }
}

async function saveJson(filename, data) {
    try {
        const filePath = path.join(OUTPUT_DIR, filename);
        await writeFile(filePath, JSON.stringify(data, null, 2));
        console.log(`Saved: ${filename}`);
    } catch (error) {
        console.error(`Error saving ${filename}:`, error);
    }
}

async function main() {
    // 创建输出目录（如果不存在）
    if (!existsSync(OUTPUT_DIR)) {
        await mkdir(OUTPUT_DIR);
    }

    // 获取索引文件
    const indexJson = await fetchJson(`${BASE_URL}/index.json`);
    if (!indexJson) {
        console.error('Failed to fetch index.json');
        return;
    }

    // 保存索引文件
    await saveJson('index.json', indexJson);

    // 获取每个组件的详细JSON
    for (const item of indexJson) {
        const detailJson = await fetchJson(`${BASE_URL}/${item.id}.json`);
        if (detailJson) {
            await saveJson(`${item.id}.json`, detailJson);
            // 添加小延迟以避免请求过快
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    console.log('All files have been downloaded!');
}

main().catch(console.error); 