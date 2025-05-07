# 2025-group-6

2025 COMSM0166 group 6
# Puck Power Clash


## Your Game

Link to your game [PLAY HERE](https://uob-comsm0166.github.io/2025-group-6/)

Your game lives in the [/docs](/docs) folder, and is published using Github pages to the link above.

Include a demo video of your game here (you don't have to wait until the end, you can insert a work in progress video)

## Your Group

![Group-6-Banner](https://github.com/user-attachments/assets/c66c5311-e353-4e56-97a1-68db2eae6cd6)

| Group Member | Name                     | Email                 | Role                       | GitHub Username                                  |
|--------------|--------------------------|-----------------------|----------------------------|--------------------------------------------------|
| 1            | Saquib Sayeed Kazi       | jh24162@bristol.ac.uk | Developer/ Project Manager | [@Saqsy](https://github.com/Saqsy)               |
| 2            | Balachander Raja         | js24503@bristol.ac.uk | Developer/Sound Artist     | [@B-alachander](https://github.com/B-alachander) |
| 3            | Rohit Bhagatkar          | np24437@bristol.ac.uk | Developer/ Game Mechanics  | [@ro-grafd](https://github.com/ro-grafd)         |
| 4            | Adwaith Syam Sundar      | ie24068@bristol.ac.uk | Developer/ Game Mechanics  | [@adwaith911](https://github.com/adwaith911)     |
| 5            | Nilay Murlidhar Bhaisare | dh24552@bristol.ac.uk | Developer/ Scrum Master    | [@NMB99](https://github.com/NMB99)               |
| 6            | Nishtha Singh            | ga23124@bristol.ac.uk | Developer/ UI/UX Designer  | [@ananish](https://github.com/ananish)           |

## Project Report

### Introduction

Puck Power Clash is an exhilarating, high-energy arcade game that takes the classic air hockey experience and adds unique twists to make every match more thrilling. While it preserves the core idea of scoring by striking a puck across a frictionless table, the game introduces a series of innovative features to increase excitement and challenge.

A standout feature is the power-up system, where special items randomly appear on the table. When a player’s puck collides with their opponent’s paddle, they gain a temporary boost, such as increased speed, enhanced hitting power, or a shield for brief defence. These power-ups force players to make strategic decisions, weighing the value of offense versus defence in the heat of the moment.

Random obstacles also add unpredictability, altering the puck’s trajectory and requiring players to constantly adjust their positioning. These obstacles break away from typical gameplay patterns, demanding quick reflexes and creative thinking.

The adjustable goalpost system further intensifies the action. If a player scores two consecutive points, their opponent’s goal expands, making it easier for the leading player to score but also placing more pressure on the defender. This dynamic change rewards aggressive play and punishes defenders who concede too many points in quick succession.

With its vibrant neon artwork and dynamic sound design, Puck Power Clash immerses players in a fast-paced, futuristic atmosphere. It’s a game that challenges both reflexes and strategy, where every second on the table matters.

### Requirements

- 15% ~750 words
- Use case diagrams, user stories. Early stages design. Ideation process. How did you decide as a team what to develop?
#### 1. Ideation Process

The idea for Puck Power Clash emerged from brainstorming sessions where we explored different concepts for a 2D game. 
Our primary goal was to create a game that is simple to learn but has engaging mechanics to keep players interested. 
We considered various arcade-style games and ultimately chose an air hockey-inspired game because it offers:
- Fast-paced gameplay that keeps players engaged. 
- A well-known concept that can be easily adapted.

Opportunities to introduce novel elements like power-ups and dynamic obstacles and goal posts.

As a team, we debated different features and gameplay mechanics. We used collaborative tools like Miro and Google Docs 
to map out ideas and discuss feasibility. Each team member contributed ideas, and we voted on which mechanics to 
implement in our first version.

#### 2. Early Stages of Design

In the early design phase, we focused on:

![](/docs/ppc/assets/images/Initialdesign.png)
- Defining core mechanics: paddle movement, puck physics, and scoring system. 
- Introducing power-ups: speed boost, reverse puck direction, and freeze opponent’s paddle. 
- Adding dynamic obstacles like rotating barriers to increase challenge. 
- Establishing a simple, visually appealing UI using p5.js.

To visualize these concepts, we created rough sketches and flowcharts to represent the game logic. 
We also developed wireframes to define the layout of the game elements on the screen.


##### Paper Prototype

- During the initial design phase, we developed a paper prototype of the game to visualize and test the core gameplay mechanics. 
- This hands-on approach allowed us to simulate player interactions and experiment with different game elements before moving to digital implementation.
![](/paper-prototype/paper-prototype.gif)




#### 3. User Stories
Wewq defined the following user stories to guide development:
As a player, I want to:
- Move my paddle smoothly using keyboard controls so I can intercept the puck. 
- Strike the puck with different angles and speeds to outmaneuver my opponent. 
- Collect power-ups that provide temporary advantages to make gameplay more strategic. 
- Score goals by getting the puck into the opponent’s goal area to win points. 
- Play against a friend in a local multiplayer mode for a competitive experience. 
- Restart the game easily after a match, so I can play multiple rounds without reloading.

![](/docs/ppc/assets/images/Board.png)
![](/docs/ppc/assets/images/Jira.png)

#### 4 .Next Steps

With these requirements outlined, our next steps are:
- Developing a prototype to test paddle movement and physics. 
- Implementing core game mechanics before integrating power-ups. 
- Refining UI design and adding visual effects for a polished look. 
- Play-testing to gather feedback and adjust mechanics accordingly.

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

To ensure that Puck Power Clash functions as intended and delivers a satisfying player experience, we employed both qualitative and quantitative evaluation methods. 
These approaches allowed us to gather in-depth feedback on user interaction, gameplay mechanics, and overall usability.

#### Qualitative
For the qualitative evaluation, we used the Think Aloud protocol, where participants were encouraged to verbalize their thoughts, decisions, and feelings in real-time while playing the game.
This method helped us understand the players’ cognitive processes, strategies, and emotional responses, offering valuable insights into areas such as engagement, adaptability, and decision-making.

<!-- ![](/assets/images/thinkaloudImage.jpeg) -->

![](/assets/images/final1.png)

Changes made:
- Reduced the frequency of power-up spawns.
- Adjusted power-up positions to be more accessible and strategically placed.
- Added smoother animations and warning effects before environmental changes (e.g., flashing before goal size changes).
- Reduced the spawn speed of certain high-impact obstacles to allow a more manageable reaction window.
- Enhanced visual cues (like glowing outlines) to indicate the type and effect of power-ups, helping players make quicker, more informed choices.
- Refined the UI to make score, time, and player status more visible without being distracting.
- Balanced the intensity of neon lighting and visual effects to maintain immersion without overwhelming the player.
- Made sound effects adaptive to game states (e.g., quieter during intense focus moments).
- Designed early game rounds to encourage experimentation with low stakes, allowing players to discover strategies gradually.

#### Quantitaive 
For the quantitative evaluation, we employed the System Usability Scale (SUS), a widely recognized and reliable method for measuring the usability of interactive systems. 
The SUS provides a quick and standardized way to assess user satisfaction by gathering responses to a ten-item questionnaire using a Likert scale.
It is proven to deliver consistent and valid results across various domains, making it an ideal tool for evaluating the user experience of Puck Power Clash. 
By using the SUS, we were able to quantify user perceptions of the game's ease of use, learnability, and overall satisfaction, complementing the insights gathered from our qualitative Think Aloud method.

| Participant | Normal Mode Score | Hard Mode Score |
|-------------|-------------------|-----------------|
| P1          | 45.0              | 37.5            |
| P2          | 47.5              | 52.5            |
| P3          | 60.0              | 60.0            |
| P4          | 47.5              | 52.5            |
| P5          | 67.5              | 67.5            |
| P6          | 67.5              | 67.5            |
| P7          | 45.0              | 45.0            |
| P8          | 67.5              | 72.5            |
| P9          | 57.5              | 52.5            |
| P10         | 37.5              | 62.5            |



![](/assets/images/barchart.png)

Our first method of quantitative analysis was the System Usability Scale (SUS). After interacting with both difficulty levels of the game, participants were asked to complete the SUS questionnaire, where they rated their agreement with ten standardized usability statements. These statements include perceptions of system complexity, ease of use, integration of functions, and user confidence, among others.

![](/assets/images/line.png)
The results indicated a slight difference in usability perception between the Normal and Hard modes. On average, the SUS score for Normal mode was 54.75, while the Hard mode had a slightly higher average of 56.75. Although this was contrary to our initial assumption that increased difficulty might reduce usability, the data suggested that the gameplay challenges in Hard mode did not significantly impact user satisfaction or experience. This could be attributed to the consistent UI design and responsive feedback mechanisms maintained across both modes. Overall, while both modes scored slightly below the general SUS benchmark of 68, the results highlighted areas for improvement and confirmed that users found the interface reasonably consistent, regardless of difficulty. The SUS analysis provided a solid foundation for iterative UI enhancements.

Together, these two methods enabled a comprehensive assessment of both user experience and system performance, ensuring that the game met our design goals and provided meaningful, enjoyable gameplay.


#### How code was tested.
We adopted both black-box and white-box testing methodologies to ensure that the game behaved as expected and was free from major bugs.

Black-box testing was primarily used during user playtesting and system-level evaluation. In this approach, testers interacted with the game without knowledge of the internal code structure. They verified functionality such as gameplay mechanics, scoring logic, user interface responsiveness, and transitions between game states (e.g., start, pause, game over). We evaluated the game’s behavior in response to various inputs and edge cases (e.g., no user input, maximum score, or invalid actions), ensuring that outputs and visual feedback matched expectations.

White-box testing was performed during development by the team, focusing on internal code structure and logic. We reviewed and tested key functions, loops, and conditional branches to confirm they executed as intended. This included inspecting the game loop, input handling functions, collision detection algorithms, and state updates. Console logs and debugging tools were used to trace variable changes and logic flow. Functions were tested individually and then integrated to validate proper interaction across components.

By combining both testing approaches, we achieved a robust, reliable game experience and were able to identify and fix critical issues early in the development process.

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
