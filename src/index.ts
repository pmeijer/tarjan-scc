function Vertex(id: string | number) {
    this.id = id;
    this.connectedVertices = [];
    this.index = -1;
    this.lowlink = -1;
}

Vertex.prototype.connectTo = function (vertex: any) {
    this.connectedVertices.push(vertex);
};

function Graph() {
    // Assumption: ids are unique.
    this.vertices = {};
}

Graph.prototype.addVertex = function (id: string | number) {
    if (this.vertices.hasOwnProperty(id)) {
        return false;
    } else {
        this.vertices[id] = new Vertex(id);
        return true;
    }
};

Graph.prototype.connectVertices = function (id1: string | number, id2: string | number) {
    if (this.vertices.hasOwnProperty(id1) === false) {
        throw new Error('Vertex [' + id1 + '] was never added to graph!');
    }

    if (this.vertices.hasOwnProperty(id2) === false) {
        throw new Error('Vertex [' + id2 + '] was never added to graph!');
    }

    this.vertices[id1].connectTo(this.vertices[id2]);
};

/**
 * Class for finding strongly connected components in a directed graph, a.k.a loops.
 *
 * Based on https://gist.github.com/chadhutchins/1440602 but with constant time stack lookup.
 * https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm
 *
 * The example below returns the SCC v2,v3,v4
 *     v1 -*  v2
 *            / *
 *           *   \
 *          v3 -* v4
 * @example
 *
 * const t = new Tarjan();
 *
 * t.addVertex(1);
 * t.addVertex(2);
 * t.addVertex(3);
 * t.addVertex(4);
 *
 * t.connectVertices(1, 2); // Order matters (src-->target)
 * t.connectVertices(2, 3);
 * t.connectVertices(3, 4);
 * t.connectVertices(4, 2);
 *
 * t.calculateSCCs();   -> [[1], [2, 3, 4]]
 * t.hasLoops(); -> true
 *
 *
 * @author pmeijer / https://github.com/pmeijer
 */
export class Tarjan {
    private index: number = 0;
    private stackLookup: { [key: string]: boolean } = {};
    private stack: any[] = [];
    private graph: any = new Graph();
    private SCCs: Array<Array<string | number>> = [];
    private didRun: boolean = false;

    addVertex(id: string | number): boolean {
        if (this.didRun) {
            throw new Error('Cannot modify graph after algorithm ran!');
        }

        return this.graph.addVertex(id);
    }

    connectVertices(src: string | number, dst: string | number): void {
        if (this.didRun) {
            throw new Error('Cannot modify graph after algorithm ran!');
        }

        this.graph.connectVertices(dst, src);
    }

    hasLoops(): boolean {
        this.calculateSCCs();

        for (let i = 0; i < this.SCCs.length; i += 1) {
            if (this.SCCs[i].length > 1) {
                return true;
            }
        }

        return false;
    }

    calculateSCCs(): Array<Array<string | number>> {
        if (this.didRun === false) {
            for (const id in this.graph.vertices) {
                if (this.graph.vertices[id].index < 0) {
                    this._strongConnect(this.graph.vertices[id]);
                }
            }

            this.didRun = true;
        }

        return this.SCCs;
    }

    private _strongConnect(vertex: any): void {
        const sccVertices: any[] = [];
        let connectedVertex: any;
        let topVertex: any;

        vertex.index = this.index;
        vertex.lowlink = this.index;
        this.index = this.index + 1;

        this.stack.push(vertex);
        this.stackLookup[vertex.id] = true;

        for (let i = 0; i < vertex.connectedVertices.length; i += 1) {
            connectedVertex = vertex.connectedVertices[i];
            if (connectedVertex.index < 0) {
                this._strongConnect(connectedVertex);
                vertex.lowlink = Math.min(vertex.lowlink, connectedVertex.lowlink);
            } else if (this.stackLookup[connectedVertex.id]) {
                vertex.lowlink = Math.min(vertex.lowlink, connectedVertex.index);
            }
        }

        if (vertex.lowlink === vertex.index) {
            if (this.stack.length > 0) {
                do {
                    topVertex = this.stack.pop();
                    this.stackLookup[topVertex.id] = false;
                    sccVertices.push(topVertex.id);
                } while (vertex.id !== topVertex.id);
            }

            if (sccVertices.length > 0) {
                this.SCCs.push(sccVertices);
            }
        }
    }
}
