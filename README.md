# Tarjan-SCC

Install:
```bash
npm install --save tarjan-scc
```

Usage:
```typescript
import { Tarjan } from 'tarjan-scc';

const t = new Tarjan();

// Add verticies.
t.addVertex(1);
t.addVertex(2);
t.addVertex(3);
t.addVertex(4);

// Connect vertices.
t.connectVertices(1, 2);
t.connectVertices(2, 3);
t.connectVertices(3, 4);
t.connectVertices(4, 2);

// Check for loops.
t.hasLoops(); // true
```

### Publish a Release

1. Update to a new version (`x.x.x`) in `package.json`
2. `git commit -am "release x.x.x"`
3. `git push origin main`
4. `git tag vx.x.x`
5. `git push origin vx.x.x`
5. `npm publish ./`