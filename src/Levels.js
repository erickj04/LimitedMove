export const levels = [
      {
        initialBody: {
            position: {koorX: 1, koorY: 5},
            stepRange: 1,
            stepRemaining: {leftStep: 0, rightStep: 0, upStep: 11, downStep: 0}
        },
        walls: [
          {koorX: 3, koorY: 3},
          {koorX: 1, koorY: 1},
          {koorX: 2, koorY: 1},
        ],
        goal: {koorX: 2, koorY: 3},
        gridSize: 5,
        superJump: [

        ],
        switchClockwise: [
          {koorX: 1, koorY: 2},
          {koorX: 4, koorY: 2},
          {koorX: 4, koorY: 4},
          {koorX: 2, koorY: 4},
        ],
    },
    {
        initialBody: {
            position: {koorX: 5, koorY: 5},
            stepRange: 1,
            stepRemaining: {leftStep: 1, rightStep: 3, upStep: 1, downStep: 3}
        },
        walls: [
          {koorX: 1, koorY: 1},
          {koorX: 1, koorY: 2},
          {koorX: 1, koorY: 3},
          {koorX: 1, koorY: 4},
          {koorX: 1, koorY: 5},
          {koorX: 1, koorY: 6},
          {koorX: 1, koorY: 7},
          {koorX: 1, koorY: 8},
          {koorX: 1, koorY: 9},
          {koorX: 1, koorY: 10},
          {koorX: 2, koorY: 10},
          {koorX: 3, koorY: 10},
          {koorX: 4, koorY: 10},
          {koorX: 2, koorY: 9},
          {koorX: 3, koorY: 9},
          {koorX: 2, koorY: 8},
          {koorX: 6, koorY: 6},
          {koorX: 6, koorY: 7},
          {koorX: 6, koorY: 8},
          {koorX: 7, koorY: 7},
          {koorX: 8, koorY: 7},
          {koorX: 6, koorY: 9},
          {koorX: 7, koorY: 9},
          {koorX: 8, koorY: 9},
          {koorX: 6, koorY: 5},
          {koorX: 7, koorY: 5},
          {koorX: 8, koorY: 5},
        ],
        goal: {koorX: 10, koorY: 10},
        gridSize: 10,
        superJump: [
          {koorX: 4, koorY: 4}
        ],
        switchClockwise: [
          
        ],
    },
    {
      initialBody: {
          position: {koorX: 0, koorY: 0},
          stepRange: 0,
          stepRemaining: {leftStep: 0, rightStep: 0, upStep: 0, downStep: 0}
      },
      walls: [
        
      ],
      goal: {koorX: 0, koorY: 0},
      gridSize: 0,
      superJump: [

      ],
      switchClockwise: [

      ],
    },
]