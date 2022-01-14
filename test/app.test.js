
import { normalize } from '../src/app/engine'


it('trimming...', () => {
    expect(normalize('000001010101111000000').toBe('1010101111'))
})