import data from './tower.json' with { type: 'json' };
export interface Vec {
    x: number;
    y: number;
    z: number;
}
export interface Box {
    id: string;
    min: Vec;
    max: Vec;
    material: string;
    checkpoint?: boolean;
    goal?: boolean;
}
export interface Course {
    spawn: Vec;
    stages: {
        name: string;
        y: number;
    }[];
    boxes: Box[];
}
export const course: Course = data;
export function validateCourse(value: unknown): value is Course {
    const c = value as Course;
    const vec = (v: Vec) => !!v && [v.x, v.y, v.z].every(Number.isFinite);
    return !!c && vec(c.spawn) && Array.isArray(c.stages) && c.stages.length === 5 && c.stages.every(s => !!s && typeof s.name === 'string' && Number.isFinite(s.y)) && Array.isArray(c.boxes) && c.boxes.length > 0 && new Set(c.boxes.map(b => b?.id)).size === c.boxes.length && c.boxes.every(b => !!b && typeof b.id === 'string' && typeof b.material === 'string' && vec(b.min) && vec(b.max) && (['x', 'y', 'z'] as const).every(k => b.min[k] < b.max[k])) && c.boxes.filter(b => b.checkpoint).length === 1 && c.boxes.filter(b => b.goal).length === 1;
}
if (!validateCourse(course))
    throw new Error('Invalid course');
