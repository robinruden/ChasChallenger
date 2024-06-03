import { ChangeEvent, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useForm, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import style from "./NewCustomCharacterRoute.module.css";
import Character from "../types/Character";
import AbilityAttribute from "../types/AbilityAttributes";
import AbilityScoreOption from "../types/AbilityScoreOption";
import { AbilityScoreDropdown } from "../components/AbilityScoreDropdown";
import Profession, { ProfessionsArray } from "../types/Profession";
import axios from "axios";
/* import Footer from "../components/Footer"; */

interface AvatarOption {
  expiryTime: string;
  url: string;
}

const abilityAttributes: AbilityAttribute[] = [
  //TODO: refactor to enum like Species.ts
  "strength",
  "dexterity",
  "intelligence",
  "wisdom",
  "constitution",
  "charisma",
];

// const handleGenerateBackstoryButtonClicked = (
//   getValues: UseFormGetValues<Character>,
//   setValue: UseFormSetValue<Character>
// ) => {
//   console.warn("Not yet implemented");

//   //TODO: send prompt with other character information (formValues) to generate a backstory
//   const formValues = getValues();
//   console.log(formValues);

//   setValue("backstory", "Some backstory generated by Le Chat Goober");
// };

const handleGenerateAvatarsButtonClicked = async (
  getValues: UseFormGetValues<Character>,
  avatarOptions: AvatarOption[],
  setLoadingAvatars: React.Dispatch<React.SetStateAction<boolean>>,
  setAvatarOptions: React.Dispatch<React.SetStateAction<AvatarOption[]>>
) => {
  try {
    setLoadingAvatars(true);
    const result = await axios.post(
      "https://chasfantasy.azurewebsites.net/api/Image/CreateProfileImageWithAI",
      // "/api/Image/CreateProfileImageWithAI",
      {
        ...getValues(),
        level: 0,
      }
    );

    setLoadingAvatars(false);
    //Add new options to state
    setAvatarOptions([
      ...avatarOptions,
      ...(result.data.urls as string[]).map(
        (url: string) =>
          ({ expiryTime: result.data.expiryTime, url }) as AvatarOption
      ),
    ]);
  } catch (error) {
    setLoadingAvatars(false);
    console.error(error);
  }
};

const handleGenerateCharacterButtonClicked = async (
  characterPrompt: string,
  setValue: UseFormSetValue<Character>,
  setAbilityScoreAllocations: React.Dispatch<
    React.SetStateAction<AbilityScoreOption[]>
  >
) => {
  try {
    const characterResult = await axios.post(
      // "https://chasfantasy.azurewebsites.net/api/character/CreateCharacterWithAi",
      "/api/character/CreateCharacterWithAi",
      {
        message: characterPrompt,
      }
    );
    const character: Character = characterResult.data;

    setValue("name", character.name);
    setValue("age", character.age);
    setValue("gender", character.gender);

    //TODO: Extra, setting like this does not change from "error field is required state".
    setValue("strength", character.strength);
    setValue("dexterity", character.dexterity);
    setValue("intelligence", character.intelligence);
    setValue("wisdom", character.wisdom);
    setValue("constitution", character.constitution);
    setValue("charisma", character.charisma);
    //All values will be set so this works
    setAbilityScoreAllocations([
      {
        value: 15,
        avalible: false,
      },
      {
        value: 14,
        avalible: false,
      },
      {
        value: 13,
        avalible: false,
      },
      {
        value: 12,
        avalible: false,
      },
      {
        value: 10,
        avalible: false,
      },
      {
        value: 8,
        avalible: false,
      },
    ]);

    setValue("backstory", character.backstory);
    setValue("profession", character.profession);
    setValue("species", character.species);
  } catch (error) {
    console.error(error);
  }
};

const handleResetAllAbilityScoreButtonClicked = (
  setValue: UseFormSetValue<Character>,
  setAbilityScoreAllocations: React.Dispatch<
    React.SetStateAction<AbilityScoreOption[]>
  >
) => {
  setValue("strength", 0);
  setValue("dexterity", 0);
  setValue("intelligence", 0);
  setValue("wisdom", 0);
  setValue("constitution", 0);
  setValue("charisma", 0);
  //All values will be set so this works
  setAbilityScoreAllocations([
    {
      value: 15,
      avalible: true,
    },
    {
      value: 14,
      avalible: true,
    },
    {
      value: 13,
      avalible: true,
    },
    {
      value: 12,
      avalible: true,
    },
    {
      value: 10,
      avalible: true,
    },
    {
      value: 8,
      avalible: true,
    },
  ]);
};

const formSubmit = async (character: Character, navigate: NavigateFunction) => {
  try {
    await axios.post(
      "/api/Character/AddCharacter",
      /* "https://chasfantasy.azurewebsites.net/api/Character/AddCharacter", */
      /* `https://localhost:7110/api/Character/AddCharacter`, */
      /* `52.149.227.5:8081/api/Character/AddCharacter`, */
      { ...character, level: 0 }
    );

    navigate("../..", { relative: "path", replace: true });
  } catch (error) {
    console.error(error);
  }
};

export const NewCustomCharacterRoute = () => {
  const navigate = useNavigate();

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<Character>({
    defaultValues: {
      name: "",
      age: 0,
      gender: "Man",
      healthPoints: 1,
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      wisdom: 0,
      constitution: 0,
      charisma: 0,
      backstory: "",
      profession: "Arbetslös",
      species: "Människa",
      imageURL: "",
      favourite: false,
    },
  });

  const [abilityScoreAllocations, setAbilityScoreAllocations] = useState<
    AbilityScoreOption[]
  >([
    {
      value: 15,
      avalible: true,
    },
    {
      value: 14,
      avalible: true,
    },
    {
      value: 13,
      avalible: true,
    },
    {
      value: 12,
      avalible: true,
    },
    {
      value: 10,
      avalible: true,
    },
    {
      value: 8,
      avalible: true,
    },
  ]);

  const [avatarIconPreviewUrl, setAvatarIconPreviewUrl] = useState<string>(
    "/src/assets/images/defaultCharacterIcon.png"
  );

  const [avatarOptions, setAvatarOptions] = useState<AvatarOption[]>([]);
  const [loadingAvatars, setLoadingAvatars] = useState<boolean>(false);

  const [generateCharacterPrompt, setGenerateCharacterPrompt] =
    useState<string>("");

  return (
    <>
      <main className={style["custom-character"]}>
        <h1>Egen Karaktär</h1>
        <div className={style["generate-character"]}>
          <h2>Generera Med Prompt</h2>
          <input
            type="text"
            value={generateCharacterPrompt}
            placeholder="En gammal bonde med ett mörkt förflutet..."
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setGenerateCharacterPrompt(event.target.value)
            }
          />
          <button
            type="button"
            onClick={async () => {
              try {
                await handleGenerateCharacterButtonClicked(
                  generateCharacterPrompt,
                  setValue,
                  setAbilityScoreAllocations
                );

                await handleGenerateAvatarsButtonClicked(
                  getValues,
                  avatarOptions,
                  setLoadingAvatars,
                  setAvatarOptions
                );
              } catch (error) {
                console.log("diud ererror");

                console.error(error);
              }
            }}
          >
            Generera Karaktär
          </button>
        </div>
        <form
          className={style["new-character-form"]}
          onSubmit={handleSubmit((character: Character) =>
            formSubmit(character, navigate)
          )}
        >
          <div>
            <label htmlFor="name">
              <h2>Namn</h2>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Sven Svensson..."
              {...register("name", {
                required: "Ett namn krävs!",
              })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="age">
              <h2>Ålder</h2>
            </label>
            <input
              type="number"
              id="age"
              {...register("age", {
                required: "En ålder krävs!",
                min: {
                  value: 0,
                  message: "Ålder måste vara ett positivt värde!",
                },
              })}
            />
            {errors.age && <p>{errors.age.message}</p>}
          </div>

          <div>
            <h2>Kön</h2>
            <div className={style["genders"]}>
              <span>
                <label htmlFor="gender-male">Man:</label>
                <input
                  type="radio"
                  id="gender-male"
                  value="Man"
                  {...register("gender", {
                    required: "Ett kön krävs!",
                  })}
                />
              </span>
              <span>
                <label htmlFor="gender-female">Kvinna:</label>
                <input
                  type="radio"
                  id="gender-female"
                  value="Kvinna"
                  {...register("gender", {
                    required: "Ett kön krävs!",
                  })}
                />
              </span>
              <span>
                <label htmlFor="gender-non-binary">Icke-binär:</label>
                <input
                  type="radio"
                  id="gender-non-binary"
                  value="Icke-binär"
                  {...register("gender", {
                    required: "Ett kön krävs!",
                  })}
                />
              </span>
            </div>

            {errors.gender && <p>{errors.gender.message}</p>}
          </div>

          {/* NOTE: Classes are on hold for MVP
        <div>
          <label htmlFor="class">
            <h2>Class</h2>
          </label>
          <select
            id="class"
            {...register("class", { required: "Class is required!" })}
          >
            <option value="wizard">Wizard</option>
            <option value="warrior">Warrior</option>
            <option value="rogue">Rogue</option>
          </select>

          {errors.class && <p>{errors.class.message}</p>}
        </div> */}

          <div>
            <h2>Förmågo Fördelning</h2>
            <div className={style["ability-scores"]}>
              {abilityAttributes.map((abilityAttribute: AbilityAttribute) => {
                return (
                  <AbilityScoreDropdown
                    key={abilityAttribute}
                    abilityScoreAttribute={abilityAttribute}
                    abilityScoreAllocations={abilityScoreAllocations}
                    setAbilityScoreAllocations={setAbilityScoreAllocations}
                    register={register}
                    getValues={getValues}
                    setValue={setValue}
                    errors={errors}
                  />
                );
              })}
            </div>
            <button
              className={style["ability-scores-reset-all"]}
              type="button"
              onClick={() =>
                handleResetAllAbilityScoreButtonClicked(
                  setValue,
                  setAbilityScoreAllocations
                )
              }
            >
              Återställ Alla
            </button>
          </div>

          {/* <div>
            <label htmlFor="species">
              <h2>Species</h2>
            </label>
            <select
              id="species"
              aria-disabled
              {...register("species", { required: "Species is required!" })}
            >
              {SpeciesArray().map((species) => {
                return (
                  <option key={species} value={Species[species]}>
                    {species}
                  </option>
                );
              })}
            </select>

            {errors.species && <p>{errors.species.message}</p>}
          </div> */}

          <div>
            <label htmlFor="profession">
              <h2>Yrke</h2>
            </label>
            <select
              id="profession"
              {...register("profession", {
                required: "Ett yrke krävs!",
              })}
            >
              {ProfessionsArray().map((profession) => {
                return (
                  <option key={profession} value={Profession[profession]}>
                    {profession}
                  </option>
                );
              })}
            </select>

            {errors.profession && <p>{errors.profession.message}</p>}
          </div>

          <div>
            <label htmlFor="backstory">
              <h2>Bakgrund</h2>
            </label>
            <textarea
              id="backstory"
              className={style.backstory}
              placeholder="Skriv din karaktärs bakgrundshistoria här..."
              {...register("backstory", {
                maxLength: {
                  value: 500,
                  message: "Max 500 characters!",
                },
              })}
            ></textarea>
            {/* <button
            type="button"
            onClick={() =>
              handleGenerateBackstoryButtonClicked(getValues, setValue)
            }
          >
            Generate New
          </button> */}

            {errors.backstory && <p>{errors.backstory.message}</p>}
          </div>

          <div className={style["avatar"]}>
            <h2>Avatar</h2>
            <img
              className={style["your-avatar"]}
              src={avatarIconPreviewUrl}
              alt="Din Avatar"
            />
            <button
              type="button"
              onClick={() =>
                handleGenerateAvatarsButtonClicked(
                  getValues,
                  avatarOptions,
                  setLoadingAvatars,
                  setAvatarOptions
                )
              }
            >
              Generera Fler
            </button>
            {(avatarOptions.length > 0 || loadingAvatars) && (
              <h3>Avatar Alternativ {loadingAvatars && " [Laddar...]"}</h3>
            )}
            {avatarOptions.length > 0 && (
              <ul className={style["avatar-options-list"]}>
                {avatarOptions.map((avatarOption: AvatarOption, index) => {
                  return (
                    <li className={style["avatar-option"]} key={index}>
                      <img
                        src={avatarOption.url}
                        alt={`Avatar option ${index + 1}`}
                        onClick={(
                          event: React.MouseEvent<HTMLImageElement, MouseEvent>
                        ) => {
                          //TODO: check that image is not expired when selected and character created
                          // const expiryDate = new Date(avatarOption.expiryTime);

                          // const timeLeft = expiryDate.getTime() - Date.now();
                          // if (timeLeft > 0) {
                          //   const dateTimeLeft = new Date(timeLeft);

                          //   console.log();
                          //   (dateTimeLeft.getUTCHours() > 0
                          //     ? `${dateTimeLeft.getUTCHours()}h `
                          //     : "") +
                          //     dateTimeLeft.getUTCMinutes() +
                          //     "m " +
                          //     dateTimeLeft.getUTCMinutes() +
                          //     "s";
                          // }

                          const src = event.currentTarget.src;
                          setAvatarIconPreviewUrl(src); //Preview
                          setValue("imageURL", src); //Form data
                        }}
                      />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <button type="submit">Skapa Karaktär!</button>
        </form>
        <Link className={style["back-button"]} relative="path" to="..">
          Tillbaka
        </Link>
      </main>
    </>
  );
};
