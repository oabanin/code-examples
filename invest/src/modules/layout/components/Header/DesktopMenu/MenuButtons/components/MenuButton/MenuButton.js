import s from 'src/modules/layout/components/Header/DesktopMenu/MenuButtons/components/MenuButton/MenuButton.module.scss';

function MenuButton({ alt, src, onClick }) {
  return (
    <button onClick={onClick} className={s.button}>
      <img alt={alt} width={24} height={24} src={src} />
    </button>
  );
}

export default MenuButton;
