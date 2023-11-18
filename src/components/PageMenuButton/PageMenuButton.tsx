import style from './PageMenuButton.module.scss';
import { PageMenuButtonProps } from './PageMenuButton.props';
import { motion } from 'framer-motion';

export default function PageMenuButton({
  image,
  name,
  description,
  isActive,
}: PageMenuButtonProps) {
  return (
    <button className={style.button}>
      <img src={image} alt="" />
      <div className={style.title}>
        <span className={style.description}>{description}</span>
        <span className={style.buttonName}>{name}</span>
      </div>

      {isActive && <SlidingBlock />}
    </button>
  );
}

const SlidingBlock = () => {
  return (
    <motion.div layoutId={'slidingBlock'} className={style.slidingBlock} />
  );
};
