# We have 3 tipes of graphs:

1. Directed/Digraph => use Object{[key: node]: [destinations]} || Matrix[][] where m[i][j] !== m[j][i]; Can have more than one link between two nodes
2. Undirected => use Matrix[][] where m[i][j] === m[j][i] ;- Have just one link between each two node
3. tree - Have no cycles

each of graph types can be weighted
