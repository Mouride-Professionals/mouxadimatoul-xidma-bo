const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'assets', 'i18n');
const sourceLocale = 'fr';
const targetLocales = ['ar'];

function readLocale(locale) {
    const filePath = path.join(localesDir, `${locale}.json`);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function flatten(value, prefix = '') {
    return Object.entries(value).flatMap(([key, entry]) => {
        const nextKey = prefix ? `${prefix}.${key}` : key;
        if (
            entry &&
            typeof entry === 'object' &&
            !Array.isArray(entry)
        ) {
            return flatten(entry, nextKey);
        }
        return [[nextKey, String(entry)]];
    });
}

function placeholders(value) {
    return Array.from(value.matchAll(/\{\{\s*([\w.]+)\s*\}\}/g))
        .map((match) => match[1])
        .sort();
}

function sameList(a, b) {
    return a.length === b.length && a.every((value, index) => value === b[index]);
}

const sourceEntries = new Map(flatten(readLocale(sourceLocale)));
let hasError = false;

for (const locale of targetLocales) {
    const targetEntries = new Map(flatten(readLocale(locale)));
    const sourceKeys = Array.from(sourceEntries.keys()).sort();
    const targetKeys = Array.from(targetEntries.keys()).sort();

    const missing = sourceKeys.filter((key) => !targetEntries.has(key));
    const extra = targetKeys.filter((key) => !sourceEntries.has(key));

    if (missing.length || extra.length) {
        hasError = true;
        console.error(`Locale ${locale} does not match ${sourceLocale} keys.`);
        if (missing.length) {
            console.error(`Missing in ${locale}:`);
            missing.forEach((key) => console.error(`  - ${key}`));
        }
        if (extra.length) {
            console.error(`Extra in ${locale}:`);
            extra.forEach((key) => console.error(`  - ${key}`));
        }
    }

    for (const key of sourceKeys) {
        if (!targetEntries.has(key)) {
            continue;
        }

        const sourcePlaceholders = placeholders(sourceEntries.get(key));
        const targetPlaceholders = placeholders(targetEntries.get(key));
        if (!sameList(sourcePlaceholders, targetPlaceholders)) {
            hasError = true;
            console.error(
                `Placeholder mismatch for ${locale}:${key}. ` +
                    `${sourceLocale} has [${sourcePlaceholders.join(', ')}], ` +
                    `${locale} has [${targetPlaceholders.join(', ')}].`
            );
        }
    }
}

if (hasError) {
    process.exit(1);
}

console.log(
    `i18n check passed: ${sourceEntries.size} keys match across ` +
        [sourceLocale, ...targetLocales].join(', ')
);
