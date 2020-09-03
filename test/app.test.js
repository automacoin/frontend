import { ultimateQuestion } from '../src/app/app'

it ('the answer to the ultimate question should be 42', () => {
    expect(ultimateQuestion()).toBe(42);
})