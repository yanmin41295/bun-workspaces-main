import {describe, it, expect} from "vitest";
import {execute} from "../src/command.js";

describe('exec ', async () => {
    it('git version', async () => {
        let data = await execute('git -v')
        expect(data).toMatch(/git version/);
    });
});