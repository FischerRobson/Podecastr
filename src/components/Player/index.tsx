import styles from "./styles.module.scss";

export default function Player() {
  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" />
        <strong>Tocando agora</strong>
      </header>
      <div className={styles.emptyPlayer}>
        <strong>Selecione um Podcast para ouvir</strong>
      </div>
      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>
          <span>00:00</span>
        </div>
        <div className={styles.buttons}>
          <button>
            <img src="/shuffle.svg" />
          </button>
          <button>
            <img src="/play-previous.svg" />
          </button>
          <button className={styles.playButton}>
            <img src="/play.svg"  />
          </button>
          <button>
            <img src="/play-next.svg" />
          </button>
          <button>
            <img src="/repeat.svg" />
          </button>
        </div>
      </footer>
    </div>
  );
}
