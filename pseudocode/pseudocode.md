/*-------- constants --------*/
Markers so the player can avoid clicking on a mine.
Marker counter that decreases every time player marks a square.
A timer to keep track of how long it takes the player to complete the game (essentially the player's score).


/*-------- state variables --------*/
Minesweeper board, or minefield (varying grid sizes, or difficulty, that player can choose).
    Small / Beginner = 10 x 10 grid containing 10 mines
    Medium / Intermediate = 16 x 16 grid containing 40 mines
    Large / Expert = 16 x 30 grid containing 99 mines
Placement of the mines
Squares containing numbers telling player how many mines surround that particular square.
Player achieves a win by correctly marking every square containing a mine.
Player loses when a mine is clicked.


/*-------- cached elements --------*/
Reset "smiley face" button above minefield after a player either wins or clicks on a mine and loses.
Message tracking player's progress that declares a win or a loss when the game ends.


/*-------- event listeners --------*/
Click function to clear squares from the board.
Right-click function to mark squares player believes to contain a mine.
Click function for reset button above the minefield.


/*-------- functions --------*/
Initialize function to begin or reset the game.
Function that randomly distibutes mines across the board.
Function responding to player interaction (clicks / right-clicks).
Function that clears out multiple squares that do not contain adjacent mines or surrounding indicators (numbers).
Guards that prevent user interaction from disrupting the game.
    No response from the game when a marked square is clicked
    No response from the game when cleared board space is clicked.
Function revealing placement of mines and incorrectly placed markers after a player loses.
    Background of clicked mine changes to red
Function that renders the board after updates in gameplay / player interaction.
Function that defines both win and loss logic.
Function disabling the board once player wins or loses.