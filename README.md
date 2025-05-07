# 2025-group-6

2025 COMSM0166 group 6
# Puck Power Clash


## Your Game

Link to your game [PLAY HERE](https://uob-comsm0166.github.io/2025-group-6/)

Your game lives in the [/docs](/docs) folder, and is published using Github pages to the link above.

Include a demo video of your game here (you don't have to wait until the end, you can insert a work in progress video)

## Your Group

![Group-6-Banner](https://github.com/user-attachments/assets/c66c5311-e353-4e56-97a1-68db2eae6cd6)

| Group Member | Name                     | Email                 | Role                       | GitHub Username                                          |
|--------------|--------------------------|-----------------------|----------------------------|----------------------------------------------------------|
| 1            | Saquib Sayeed Kazi       | jh24162@bristol.ac.uk | Developer/ Project Manager | [@Saqsy](https://github.com/Saqsy)                       |
| 2            | Balachander Raja         | js24503@bristol.ac.uk | Developer/Sound Artist     | [@Balachander-raja](https://github.com/Balachander-Raja) |
| 3            | Rohit Bhagatkar          | np24437@bristol.ac.uk | Developer/ Game Mechanics  | [@ro-grafd](https://github.com/ro-grafd)                 |
| 4            | Adwaith Syam Sundar      | ie24068@bristol.ac.uk | Developer/ Game Mechanics  | [@adwaith911](https://github.com/adwaith911)             |
| 5            | Nilay Murlidhar Bhaisare | dh24552@bristol.ac.uk | Developer/ Scrum Master    | [@NMB99](https://github.com/NMB99)                       |
| 6            | Nishtha Singh            | ga23124@bristol.ac.uk | Developer/ UI/UX Designer  | [@ananish](https://github.com/ananish)                   |

## Project Report

### Introduction

Puck Power Clash is an exhilarating, high-energy arcade game that takes the classic air hockey experience and adds unique twists to make every match more thrilling. While it preserves the core idea of scoring by striking a puck across a frictionless table, the game introduces a series of innovative features to increase excitement and challenge.

A standout feature is the power-up system, where special items randomly appear on the table. When a player’s puck collides with their opponent’s paddle, they gain a temporary boost, such as increased speed, enhanced hitting power, or a shield for brief defence. These power-ups force players to make strategic decisions, weighing the value of offense versus defence in the heat of the moment.

Random obstacles also add unpredictability, altering the puck’s trajectory and requiring players to constantly adjust their positioning. These obstacles break away from typical gameplay patterns, demanding quick reflexes and creative thinking.

The adjustable goalpost system further intensifies the action. If a player scores two consecutive points, their opponent’s goal expands, making it easier for the leading player to score but also placing more pressure on the defender. This dynamic change rewards aggressive play and punishes defenders who concede too many points in quick succession.

With its vibrant neon artwork and dynamic sound design, Puck Power Clash immerses players in a fast-paced, futuristic atmosphere. It’s a game that challenges both reflexes and strategy, where every second on the table matters.

# Requirements

## Ideation & Concept Selection
In Week 1 our team brainstormed several 2D game concepts—using hand-written notes and sketches to capture ideas and assess feasibility. We paper-prototyped two finalists: a ring-toss physics game and **Power Puck Clash** (an air-hockey variant with power-ups and obstacles). The ring-toss concept proved too complex to simulate within our timeline, so we selected Power Puck Clash for its immediately graspable rules and straightforward p5.js implementation.

---

## Early Stage Design & Paper Prototyping
Before writing any code, we mapped out core gameplay flow and UI layouts by hand:

- **Paddle movement:** smooth keyboard control for the left mallet; CPU control on the right  
- **Puck physics:** elastic collisions with walls, paddles, and obstacles  
- **Scoring:** first to ten goals wins; only counts when the puck fully crosses between goal posts  
- **Power-up spawn zones:** two marked areas where Fire Power-Ups appear after a three-goal streak  
- **Obstacles:** rotating circular barriers that spawn randomly and expire after ten seconds  

![Initial board layout](/assets/images/Initialdesign.png)  
*Prototype playfield sketch, indicating goal posts, spawn zones, and obstacle areas.*  

![Paper prototype animation](/paper-prototype/paper-prototype.gif)  
*Animated paper prototype demonstrating puck movement, power-up spawn, and scoring.*

**Key insights:**  
1. 20 s on-board lifespan for power-ups gives players enough reaction time  
2. Spawn zones just inside each half keep power-ups accessible but still challenging  
3. Placing the scoreboard, pause, and quit controls above the playfield avoids obscuring the action  

---

## User Stories
To keep development user-focused, we distilled the following stories:

![Gameplay components](/assets/images/Board.png)  
![Jira backlog overview](/assets/images/Jira.png)  

- **As a casual player**, I want smooth paddle control so I can intercept the puck reliably  
- **As a competitive gamer**, I want a Hard mode with faster CPU reactions for a steeper challenge  
- **As a power-up enthusiast**, I want temporary goal-expansion boosts to add strategic depth  
- **As a speed-runner**, I want to restart matches quickly without reloading the page  
- **As an audio-driven user**, I want independent toggles for background music and click-SFX  
- **As a local multiplayer player**, I want to challenge a friend on the same machine  

---

## Functional Requirements
- **Core gameplay:** two mallets vs. one puck on a resizable board; left mallet under player control, right mallet under CPU or second player  
- **Scoring & win condition:** first to 10 goals wins; a goal only counts if the puck fully crosses between the opponent’s goal posts  
- **Streak-based power-up:** after three consecutive goals by one side, a Fire Power-Up icon spawns on that side, remains for 20 s, and—when collected—enlarges the opponent’s goal post for 10 s  
- **Obstacles:** circular obstacles spawn randomly via `ObstacleHandler`, persist 10 s, and deflect the puck with bounce physics and sound feedback  
- **Power-Up pickup:** a mallet–power-up collision triggers `enablePowerUpEffect()`, enlarging the goal post and playing a pickup SFX  
- **Sound management:** background music, paddle hits, board bounces, goals, power-up pickups, and UI click-SFX are each toggleable in Settings  
- **Responsive design (planned):** canvas and game objects resize dynamically on window resize via the `updateDimensions()` utility  

---

## Non-Functional Requirements
- **Compatibility:** runs smoothly in all major desktop browsers (Chrome, Firefox, Edge)  
- **Audio responsiveness:** toggling music or SFX takes effect immediately without requiring a page reload  

---

## Use-Case Diagram
The diagram below illustrates the Player’s interactions:

![Use-Case Diagram for Power Puck Clash](/assets/images/UseCaseDiagram.png)  
*UML Use-Case diagram detailing player flows from landing to match and winner screens.*

---

## Stakeholders
Below is our stakeholder Onion Model (see accompanying image for layers):

![Stakeholder Onion Model](/assets/images/stakeholder_onion.png)  

- **Core Development Team**  
  • You and your project teammates (design, implementation, testing, documentation)  

- **End-Users & Community**  
  • Classmates & peer reviewers (in-class demos)  
  • Online players via GitHub Pages (public play-link)  

- **Course Staff**  
  • Instructor & Teaching Assistant (define requirements, provide feedback, and grade)


### Design

#### Core Architecture
The game follows a classic game-loop/component-based architecture with clear separation of concerns:

##### Game Class 
The central controller that manages all game components and coordinates the overall game flow. It maintains references to core game objects (players, puck, board) , game features like powerups,obstacles and UI elemenst like (landing page, game page, winning page, butons etc).

##### GameEngine
Serves as the brain of the application, managing game logic through specialized handlers for different aspects of functionality. This follows the delegation pattern, where the engine delegates specific responsibilities to specialized components. 

##### GameObject 
 Implements an inheritance hierarchy where all interactive elements (Mallet, Puck, PowerUp, Obstacle) inherit from a common GameObject base class. This helps us to implement polymorphism and reduce the usage of repetetive code and implies the behaviour
of each and every object in the game.

#### Class Diagram 

![](/assets/images/class-diagram-final-image.png)



#### Sequence diagram

Sequence diagram shows how the different objects in the game interact with each other to express behaviour during the lifecycle
of the game

![](/assets/images/sequence-diagram-final.png)

#### User Interface Design

The UI follows a screen-based approach with separate page classes for different game states:

##### Landing Page 
The entry point with options to start the game, view instructions, or adjust settings.

*landing page*
![](/assets/images/landingpage.png)
##### Game Page 
The main gameplay screen with pause and exit functionality.

*game page*
![](/assets/images/gamescreen.png)
##### Winner Page 
Displays when a player wins, with options to restart or quit and go back to main page.

*winner page*
![](/assets/images/winnerscreen.png)
The UI elements use an inheritance hierarchy for buttons, creating a consistent interaction model.

#### Gameplay Features
The game features a range of engaging gameplay elements designed to enhance the player experience. The CPUHandler provides AI-controlled opponents with adjustable difficulty settings such as reaction delay and aggressiveness. When a player achieves a three-goal streak, the Fire PowerUp activates, temporarily enlarging the opponent’s goalpost for 10 seconds to give the streaking player an advantage. The ObstacleHandler introduces dynamic obstacles during gameplay, adding unpredictability and challenge. A SoundHandler manages various audio effects and background music to create an immersive environment. Additionally, the game includes a level system with two difficulty modes— normal and hard indicated by a level box in the top-left corner of the screen.

*the enlarged goalpost highlighted in red when firepowerup is activated*
![](/assets/images/firepowerup.png)

*obstacles during gameplay*
![](/assets/images/obstacle.png)

*level box on top left corner*
![](/assets/images/levelbox.png)


### Implementation

- 15% ~750 words

- Describe implementation of your game, in particular highlighting the three areas of challenge in developing your game.

### Evaluation

- 15% ~750 words

- One qualitative evaluation (your choice)

- One quantitative evaluation (of your choice)

- Description of how code was tested.

### Process

- 15% ~750 words

- Teamwork. How did you work together, what tools did you use. Did you have team roles? Reflection on how you worked
  together.

### Conclusion

- 10% ~500 words

- Reflect on project as a whole. Lessons learned. Reflect on challenges. Future work.

### Contribution Statement

- Provide a table of everyone's contribution, which may be used to weight individual grades. We expect that the
  contribution will be split evenly across team-members in most cases. Let us know as soon as possible if there are any
  issues with teamwork as soon as they are apparent.

### Additional Marks

You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be
marking you on the following two points:

- **Quality** of report writing, presentation, use of figures and visual material (5%)
    - Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly
      available.

- **Documentation** of code (5%)

    - Is your repo clearly organised?
    - Is code well commented throughout?
