import style from "./MessageItem.module.css";
import { StoryMessageItemProps } from "../types/types";

export const MessageItem = ({ storyMessages }: StoryMessageItemProps) => {
  return (
    <div className={style["container-chat"]}>
      <div
        className={`${
          storyMessages.characterName === null
            ? style["message-received"]
            : style["message-sent"]
        }`}
      >
        <div>
          <div
            className={`${
              storyMessages.characterName === null
                ? style["sender-received"]
                : style["sender-sent"]
            }`}
          >
            {storyMessages.characterName}
          </div>
        </div>
        <div className={style.text}>
          <div
            className={`${
              storyMessages.characterName === null
                ? style["text-content-received"]
                : style["text-content-sent"]
            }`}
          >
            {" "}
            {storyMessages.message}
          </div>
        </div>
      </div>
    </div>
  );
};
