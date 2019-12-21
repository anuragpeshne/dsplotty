# dsplotty
distributed system visualizer

Plotty is a general purpose, language agnostic, grid visualizer. It was originally designed to visualize Gossip Protocol but it is simple enough to visualize any grid based algorithm.

### How to use
Plotty reads in from `stdin` and dumps the information on browser using websockets. You can use any program to feed it information using Unix pipes. The program just needs to print the command to `stdout`.

#### Commands
1. `<plotty: draw, {num_nodes}>`: Tell Plotty about number of nodes
2. `<plotty: infected, {node_id}>`: Lit up a cell. Note that the `node_id` is used to identify a cell in grid and it ranges from 1 to `num_nodes`. So, if there are 100 cells, `node_id` will range from 1 to 100 (rather than 0 to 99).
3. `<plotty: inactive, {node_id}>`: Lit up a cell with different color.
4. `<plotty: dim, {node_id}>`: Reset a cell's look back to original. `node_id` is same as above.

### Exmaple
#### Use sample script:
`./sample.sh | node index.js`

#### Using Gossip Protocol:
![Example Gif](https://raw.githubusercontent.com/anuragpeshne/dsplotty/master/img/gossip.gif)
