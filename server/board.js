let board = [
  {
      "contains": "tiger",
      "possible_moves": [1, 5, 6],
      "capture": [2, 10, 12]
  },

  {
      "contains": "empty",
      "possible_moves": [0, 2, 6],
      "capture": [null, 3, 11]
  },

  {
      "contains": "empty",
      "possible_moves": [1, 3, 6, 7, 8],
      "capture": [0, 4, 10, 12, 14]
  },

  {
      "contains": "empty",
      "possible_moves": [2, 4, 8],
      "capture": [1, null, 13]
  },

  {
      "contains": "tiger",
      "possible_moves": [3, 8, 9],
      "capture": [2, 12, 14]
  },

  {
      "contains": "empty",
      "possible_moves": [0, 6, 10],
      "capture": [null, 7, 15]
  },

  {
      "contains": "empty",
      "possible_moves": [0, 1, 2, 5, 7, 10, 11, 12],
      "capture": [null, null, null, null, 8, null, 16, 18]
  },

  {
      "contains": "empty",
      "possible_moves": [2, 6, 8, 12],
      "capture": [null, 5, 9, 17]
  },

  {
      "contains": "empty",
      "possible_moves": [2, 3, 4, 7, 9, 12, 13, 14],
      "capture": [null, null, null, 6, null, 16, 18, null]
  },

  {
      "contains": "empty",
      "possible_moves": [4, 8, 14],
      "capture": [null, 7, 19]
  },

  {
      "contains": "empty",
      "possible_moves": [5, 6, 11, 15, 16],
      "capture": [0, 2, 12, 20, 22]
  },
  
  {
      "contains": "empty",
      "possible_moves": [6, 10, 12, 16],
      "capture": [1, null, 13, 21]
  },

  {
      "contains": "empty",
      "possible_moves": [6, 7, 8, 11, 13, 16, 17, 18],
      "capture": [0, 2, 4, 10, 14, 20, 22, 24]
  },

  {
      "contains": "empty",
      "possible_moves": [8, 12, 14, 18],
      "capture": [3, 12, null, 23]
  },

  {
      "contains": "empty",
      "possible_moves": [8, 9, 13, 18, 19],
      "capture": [2, 4, 12, 22, 24]
  },

  {
      "contains": "empty",
      "possible_moves": [10, 16, 20],
      "capture": [5, 17, null]
  },

  {
      "contains": "empty",
      "possible_moves": [10, 11, 12, 15, 17, 20, 21, 22],
      "capture": [null, 6, 8, null, 18, null, null, null]
  },

  {
      "contains": "empty",
      "possible_moves": [12, 16, 18, 22],
      "capture": [7, 15, 19, null]
  },

  {
      "contains": "empty",
      "possible_moves": [12, 13, 14, 17, 19, 22, 23, 24],
      "capture": [6, 8, null, 16, null, null, null, null]
  },

  {
      "contains": "empty",
      "possible_moves": [14, 18, 24],
      "capture": [9, 17, null]
  },

  {
      "contains": "tiger",
      "possible_moves": [15, 16, 21],
      "capture": [10, 12, 22]
  },

  {
      "contains": "empty",
      "possible_moves": [16, 20, 22],
      "capture": [11, null, 23]
  },

  {
      "contains": "empty",
      "possible_moves": [16, 17, 18, 21, 23],
      "capture": [10, 12, 14, 20, 24]
  },

  {
      "contains": "empty",
      "possible_moves": [18, 22, 24],
      "capture": [13, 20, null]
  },

  {
      "contains": "tiger",
      "possible_moves": [18, 19, 23],
      "capture": [12, 14, 22]
  },
]

module.exports = { board };