import { Tarjan } from '../src/index';

describe('tarjan', () => {
    it('example in jsodc should return as stated', () => {
        const t = new Tarjan();
        t.addVertex(1);
        t.addVertex(2);
        t.addVertex(3);
        t.addVertex(4);

        t.connectVertices(1, 2);
        t.connectVertices(2, 3);
        t.connectVertices(3, 4);
        t.connectVertices(4, 2);

        const sccs = t.calculateSCCs();
        console.log(sccs);
        expect(sccs.length).toBe(2);
        expect(sccs[0].length).toBe(1);
        expect(sccs[1].length).toBe(3);
        expect(t.hasLoops()).toBe(true);
    });

    it('two loops should be found', () => {
        const t = new Tarjan();
        t.addVertex(1);
        t.addVertex(2);
        t.addVertex(3);
        t.addVertex(4);

        t.connectVertices(1, 2);
        t.connectVertices(2, 1);
        t.connectVertices(2, 3);
        t.connectVertices(3, 4);
        t.connectVertices(4, 3);

        const sccs = t.calculateSCCs();
        console.log(sccs);
        expect(sccs.length).toBe(2);
        expect(sccs[0].length).toBe(2);
        expect(sccs[1].length).toBe(2);
        expect(t.hasLoops()).toBe(true);
    });

    it('a chain of nodes should not be a loop', () => {
        const t = new Tarjan();
        t.addVertex(1);
        t.addVertex(2);
        t.addVertex(3);
        t.addVertex(4);

        t.connectVertices(1, 2);
        t.connectVertices(2, 3);
        t.connectVertices(3, 4);

        const sccs = t.calculateSCCs();
        console.log(sccs);
        expect(sccs.length).toBe(4);
        expect(t.hasLoops()).toBe(false);
    });
});