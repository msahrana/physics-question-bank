type JsonObject = Record<string, unknown>;

const isObject = (value: unknown): value is JsonObject => {
    return typeof value === 'object' && value !== null;
};

export const extractText = (value: unknown): string => {
    if (typeof value === 'string') {
        return value;
    }

    if (typeof value === 'number') {
        return String(value);
    }

    if (Array.isArray(value)) {
        return value.map(extractText).filter(Boolean).join('\n');
    }

    if (!isObject(value)) {
        return '';
    }

    if (typeof value.text === 'string') {
        return value.text;
    }

    const keys = ['content', 'children', 'blocks', 'paragraphs', 'body'];

    return keys
        .map((key) => extractText(value[key]))
        .filter(Boolean)
        .join('\n');
};

export const extractImage = (value: unknown): string | null => {
    if (Array.isArray(value)) {
        for (const item of value) {
            const result = extractImage(item);
            if (result) return result;
        }

        return null;
    }

    if (!isObject(value)) {
        return null;
    }

    const imageKeys = ['imageUrl', 'photoUrl', 'src', 'url'];

    for (const key of imageKeys) {
        const imageUrl = value[key];

        if (typeof imageUrl === 'string' && /^https?:\/\//.test(imageUrl)) {
            return imageUrl;
        }
    }

    const nestedKeys = ['content', 'children', 'blocks', 'images'];

    for (const key of nestedKeys) {
        const result = extractImage(value[key]);
        if (result) return result;
    }

    return null;
};

export const getPartLabel = (
    part: {
        label?: string;
        part?: string;
    },
    index: number,
) => {
    return (
        part.label ||
        part.part ||
        ['ক', 'খ', 'গ', 'ঘ'][index] ||
        String(index + 1)
    );
};
