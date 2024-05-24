import Character from "../types/Character";
import Profession from "../types/Profession";
import Species from "../types/Species";
import style from "./NewPremadeCharacterRoute.module.css";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

const premades: Character[] = [
  {
    name: "Abc",
    age: 20,
    gender: "male",
    healthpoints: 10,
    strength: 15,
    dexterity: 14,
    intelligence: 13,
    wisdom: 12,
    constitution: 10,
    charisma: 8,
    backstory:
      "My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory My backstory",
    profession: Profession.profession1,
    species: Species.human,
    imageUrl: "https://avatars.githubusercontent.com/u/72140147?v=4",
    isFavorite: false,
  },
  {
    name: "123",
    age: 30,
    gender: "female",
    healthpoints: 10,
    strength: 15,
    dexterity: 14,
    intelligence: 13,
    wisdom: 12,
    constitution: 10,
    charisma: 8,
    backstory: "My backstory",
    profession: Profession.profession2,
    species: Species.human,
    imageUrl: "",
    isFavorite: false,
  },
  {
    name: "Abc123",
    age: 40,
    gender: "non-binary",
    healthpoints: 10,
    strength: 15,
    dexterity: 14,
    intelligence: 13,
    wisdom: 12,
    constitution: 10,
    charisma: 8,
    backstory: "My backstory",
    profession: Profession.profession3,
    species: Species.human,
    imageUrl: "",
    isFavorite: false,
  },
];

const handleCharacterClicked = (
  character: Character,
  navigate: NavigateFunction
) => {
  console.log(character);
  //TODO: POST new character to server
  console.warn("Not yet implemented");
  navigate("../..", { relative: "path", replace: true });
};

export const NewPremadeCharacterRoute = () => {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Premade Characters</h1>
      <ul className={style.charactersList}>
        {premades.map((character: Character, index: number) => {
          return (
            <li
              className={style.character}
              key={character.name + index}
              onClick={() => handleCharacterClicked(character, navigate)}
            >
              <h2>{character.name}</h2>
              <img
                src={character.imageUrl}
                alt={`${character.name}'s icon`}
                loading="lazy"
                onError={(error) =>
                  ((error.target as HTMLImageElement).src =
                    "/src/assets/images/defaultCharacterIcon.png")
                }
              />
              <div className={style.traits}>
                <div className={style.strings}>
                  <h3>Species</h3>
                  <p className="capitalize">{character.species}</p>
                </div>
                <div className={style.strings}>
                  <h3>Gender</h3>
                  <p className="capitalize">{character.gender}</p>
                </div>
                <div className={style.strings}>
                  <h3>Profession</h3>
                  <p className="capitalize">{character.profession}</p>
                </div>
              </div>
              <div className={style.traits}>
                <div className={style.numbered}>
                  <h3>Age</h3>
                  <p>{character.age}</p>
                </div>
                <div className={style.numbered}>
                  <h3>HP</h3>
                  <p>{character.healthpoints}</p>
                </div>
              </div>
              <div className={style.attributes}>
                <div className={style.numbered}>
                  <h3>Strength</h3>
                  <p>{character.strength}</p>
                </div>
                <div className={style.numbered}>
                  <h3>Dexterity</h3>
                  <p>{character.dexterity}</p>
                </div>
                <div className={style.numbered}>
                  <h3>Intelligence</h3>
                  <p>{character.intelligence}</p>
                </div>
                <div className={style.numbered}>
                  <h3>Wisdom</h3>
                  <p>{character.wisdom}</p>
                </div>
                <div className={style.numbered}>
                  <h3>Constitution</h3>
                  <p>{character.constitution}</p>
                </div>
                <div className={style.numbered}>
                  <h3>Charisma</h3>
                  <p>{character.charisma}</p>
                </div>
              </div>
              <div className={style.strings}>
                <h3>Backstory </h3>
                <p>{character.backstory}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <Link className={style.backButton} relative="path" to="..">
        Back
      </Link>
    </main>
  );
};