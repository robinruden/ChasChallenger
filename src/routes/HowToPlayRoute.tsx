import { Link } from "react-router-dom";
import style from "./AboutRoute.module.css";

export const HowToPlay = () => {
  return (
    <main>
      <section>
        <h2 className={style["title"]}>How to play it?</h2>
        <article>
          <p className={style["mini-title"]}>Getting Started</p>
          <p>1. Create Your Character:</p>
          <li>
            Begin by designing your unique character. Choose your character's
            name, race, class, and background story.
          </li>
          <li>
            Think about your character's personality, strengths, and weaknesses.
            These traits will shape your journey and interactions within the
            game.
          </li>
          <p>2. Choose Your Theme:</p>
          <li>
            Select the overarching theme of your adventure. Do you want to
            explore a mystical forest, delve into ancient ruins, or navigate
            political intrigue in a bustling city? The theme sets the stage for
            your journey.
          </li>
        </article>
        <article>
          <p className={style["mini-title"]}>Playing the Game</p>
          <p>1. Interact with the AI Storyteller:</p>
          <li>
            Once your character and theme are set, the AI storyteller will begin
            narrating your adventure.
          </li>
          <li>
            You will play by chatting with the AI, responding to its
            descriptions, and making choices that affect the outcome of the
            story.
          </li>
        </article>
        <article>
          <p>1. Making Choices:</p>
          <li>
            The game proceeds in turns, with the AI presenting scenarios and you
            deciding how your character reacts.
          </li>
          <li>
            Use descriptive responses to convey your character's actions,
            thoughts, and dialogue. For example, if the AI describes a
            mysterious cave, you might respond with, “I cautiously approach the
            cave entrance, peering inside to see what lies within.”
          </li>
        </article>
        <article>
          <p>1. Progression and Development:</p>
          <li>
            As you progress, your character will gain experience, acquire new
            skills, and find powerful items.
          </li>
          <li>
            Your decisions shape the story, leading to multiple possible
            outcomes and endings.
          </li>
        </article>
        <article>
          <p className={style["tips"]}>Tips for an Engaging Experience</p>
          <li>
            Be Creative: Let your imagination run wild! The more vivid and
            detailed your descriptions, the richer your experience will be.
          </li>
          <li>
            Stay in Character: Think and act like your character would. This
            adds depth to your adventure and makes the story more engaging.
          </li>
          <li>
            Experiment: Don't be afraid to try different actions and explore
            various paths. The world of Fantasy Chass is full of surprises and
            hidden secrets.
          </li>
          <li>
            Have Fun: Remember, this is your adventure. Enjoy the journey and
            the stories you create.
          </li>
        </article>
        <article>
          <p className={style["example-title"]}>Example Turn</p>
          <ul>
            <li>
              AI Storyteller: The ancient forest looms ahead, its twisted trees
              casting long shadows in the moonlight. You hear a faint rustling
              in the underbrush. What do you do?
            </li>
            <li>
              Player: I draw my sword and cautiously approach the sound, keeping
              my eyes peeled for any movement. “Who goes there?” I call out,
              ready to defend myself if necessary.
            </li>
            <li>
              Embark on your journey in Fantasy Chass, where every decision
              writes a new chapter in your epic tale. Are you ready to begin
              your adventure? Let the story unfold!
            </li>
          </ul>
        </article>
      </section>
      <Link to="/">Go back</Link>
    </main>
  );
};
