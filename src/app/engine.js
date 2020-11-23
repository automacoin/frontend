import { compute } from 'compute-kernel';

export function run(states, color, runtime, start, end) {
    return compute(2, 2, 2000, 4607, 5615);
}