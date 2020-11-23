import { compute } from 'compute-kernel';

/** This module is meant to be run in a separate thread, it is a proxy to the compute-kernel lib*/

export function run(states, color, runtime, start, end) {
    return compute(states, color, runtime, start, end);
}