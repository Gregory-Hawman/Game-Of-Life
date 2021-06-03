Conway's Game of Life project.
Started by researching Conway's Game of Life and seeing what it was about, I knew nothing before starting this project. 
These are the rules I got from my first research. Cells are alive of dead, if you are alive you need at least two neighboring cells to also be alive to keep living, if you have three you're still alive if you have more neighbors though you die. You can also be born/reborn if as a dead cell, you have at least three alive neighbors.

Alive vs Dead
Alone = Dead
1 Neighbor = Dead
2 Neighbors = Alive
3 Neighbors = Alive or if already Dead then switched to Alive
4+ Neighbors = Dead

This is really getting me excited actually. solving these problems that I have to start working on this project, what language do I use? Can I use both? Where do I start?


For Visualization of the game:
What do I need to do?
- Display a grid

To do that I need to pick a language to display everything
    - Javascript

So javascript for the front-end at the very least
What does the front-end need?
    Working off the wireframe which I like, these are the pieces broken down.
    - A grid (I'm thinking 100 x 100) (array of arrays)
    - Display the rules (just text)
    - Current Gen Display (updating Text)
    - Start / Pause / Reset Buttons
        - Next Gen, Last Gen, Speed Buttons
        - Random (Stretch)
    - Presets
    - Go to nth gen (Stretch)
    - Grid size (Stretch)

The Grid
    - The grid in which the cells are displayed
    - Fills the Grid with cells using a constructor

Cells (created with a constructor)
    - need to have a state: alive or dead
    - need to be clickable: switches current state, only before the start of the simulation
        - clear button restarts simulation (0th gen)
    - can affect neighbor cells in the simulation (aka runs the algorithm / follows the rules of the game)

The Algorithm
    - Has the rules that cells need to follow once turned on

Ok so I have a loose plan set up with what I need and can start working on, with even some stretch in mind.

Want to add drag clicking and Stamps.