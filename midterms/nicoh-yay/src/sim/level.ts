import chunks from './tower.json' with { type: 'json' };
export interface Box {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
}
export interface Level {
    solids: Box[];
    start: {
        x: number;
        y: number;
    };
    crown: {
        x: number;
        y: number;
    };
    sections: {
        name: string;
        y: number;
    }[];
}
export function parseTower(input: unknown): Level {
    if (!Array.isArray(input) || input.length === 0)
        throw Error('Tower needs chunks');
    const solids: Box[] = [];
    const starts: {
        x: number;
        y: number;
    }[] = [];
    const crowns: {
        x: number;
        y: number;
    }[] = [];
    const sections: Level['sections'] = [];
    let width = 0;
    let previous = -Infinity;
    for (const [ci, c] of input.entries()) {
        if (!c || typeof c.name !== 'string' || !Number.isInteger(c.baseY) || c.baseY <= previous || !Array.isArray(c.rows) || c.rows.length < 2)
            throw Error('Malformed chunk');
        previous = c.baseY;
        sections.push({ name: c.name, y: c.baseY });
        if (!width)
            width = c.rows[0]?.length;
        if (!width || width % 2 === 0)
            throw Error('Odd nonempty width required');
        for (const [ri, row] of c.rows.entries()) {
            if (typeof row !== 'string' || row.length !== width || /[^.#SC]/.test(row))
                throw Error('Invalid chunk row');
            const y = c.baseY + c.rows.length - 2 - ri;
            for (let col = 0; col < width; col++) {
                const x = col - (width - 1) / 2;
                if (row[col] === '#') {
                    let end = col + 1;
                    while (row[end] === '#')
                        end++;
                    solids.push({ id: `${ci}:${ri}:${col}`, x: x - .5, y, w: end - col, h: 1 });
                    col = end - 1;
                }
                else if (row[col] === 'S')
                    starts.push({ x, y });
                else if (row[col] === 'C')
                    crowns.push({ x, y: y + 1 });
            }
        }
    }
    if (starts.length !== 1 || crowns.length !== 1)
        throw Error('Exactly one start and crown required');
    const start = starts[0];
    if (!solids.some(b => start.x >= b.x && start.x <= b.x + b.w && start.y === b.y + b.h))
        throw Error('Start must stand on a solid');
    return { solids, start, crown: crowns[0], sections };
}
export const tower = parseTower(chunks);
