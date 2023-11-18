import style from "./Button.module.scss";
import { ButtonProps } from "./Button.props";

export default function Button({}: ButtonProps) {
  return <div className={style.button}>ButtonComponent</div>;
}
