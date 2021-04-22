import { GetStaticProps } from "next";
import Image from "next/image";
import { api } from "../services/api";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import convertDurationToTimeString from "../utils/convertDurationToTimeString";

import styles from "./home.module.scss";

type Episode = {
  id: string;
  title: string;
  description: string;
  members: string;
  thumbnail: string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
  url: string;
};

type HomeProps = {
  latestEpisodes: Array<Episode>; // Episode[]
  allEpisodes: Array<Episode>;
};

export default function Home({ allEpisodes, latestEpisodes }: HomeProps) {
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          {latestEpisodes.map((episode) => {
            return (
              <li key={episode.id}>
                <Image
                  width={192}
                  height={192}
                  objectFit="cover"
                  src={episode.thumbnail}
                  alt={episode.title}
                />
                <div className={styles.episodeDetails}>
                  <a href="">{episode.title}</a>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button>
                  <img src="/play-green.svg" alt="tocar episodio" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <section className={styles.allEpisodes}></section>
    </div>
  );
}

//STATIC SITE GENERATION
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      description: episode.description,
      url: episode.file.url,
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};

//SINGLE PAGE APLICATION
// useEffect(() => {
//   fetch('http://localhost:3333/episodes')
//     .then(res => res.json())
//     .then(data => console.log(data))
// }, [])

//SERVER SIDE RENDERING
// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3333/episodes')
//   const data = await response.json()

//   return {
//     props: {
//       episodes: data
//     }
//   }
// }