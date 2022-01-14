import { compute } from 'compute-kernel';

/** This module is meant to be run in a separate thread, it is a proxy to the compute-kernel lib*/

export function ignite(states, colors, runtime, start, end) {
    result = compute(states, colors, runtime, start, end);
    return result
}



