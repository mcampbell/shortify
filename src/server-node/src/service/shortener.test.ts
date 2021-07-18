let rewire = require('rewire');

describe('Hashing/encoding works', function () {
    const mod = rewire('../../build/src/service/shortener');
    const hashAndEncode = mod.__get__('hashAndEncode');

    it('should hash and encode to truthy', async function () {
        const result = await hashAndEncode('abcd');
        expect(result).toBeTruthy();
    });

    it('should hash and encode to the same thing twice', async function () {
        const input = 'qwert';
        const result1 = await hashAndEncode(input);
        const result2 = await hashAndEncode(input);
        expect(result2).toEqual(result1);
    });

    it('should default to 7 output letters if not told otherwise', async function () {
        const input = 'qwertlkjf0aimsdmvaoitjamvadg';
        const result1 = await hashAndEncode(input);
        expect(result1).toHaveLength(7);
    });

    it('should default to 7 output letters if told a bad value', async function () {
        const input = 'qwertlkjf0aimsdmvaoitjamvadg';
        const result1 = await hashAndEncode(input, -1);
        expect(result1).toHaveLength(7);
    });

    it('should output the number of chacters given for valid values', async function () {
        const input = 'qwertlkjf0aimsdmvaoitjamvadg';
        let i;
        for (i = 1; i <= 10; ++i) {
            const result1 = await hashAndEncode(input, i);
            expect(result1).toHaveLength(i);
        }
    });
});
