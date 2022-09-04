import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

interface Premier {
  id: number;
  name: string;
  image: string;
  wiki: string;
}

const premiers: Premier[] = [
  {
    id: 1,
    name: "Carlo Calenda",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Calenda-photos2_%28cropped%29.jpg",
    wiki: "https://it.wikipedia.org/wiki/Carlo_Calenda",
  },
  {
    id: 2,
    name: "Raffaele Fantetti",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Raffaele_Fantetti_datisenato_2018.jpg",
    wiki: "https://it.wikipedia.org/wiki/Raffaele_Fantetti",
  },
  {
    id: 3,
    name: "Matteo Salvini",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Matteo_Salvini_Viminale.jpg",
    wiki: "https://it.wikipedia.org/wiki/Matteo_Salvini",
  },
  {
    id: 5,
    name: "Giuseppe Conte",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/60/Giuseppe_Conte_-_Foto.jpeg",
    wiki: "https://it.wikipedia.org/wiki/Giuseppe_Conte",
  },
  {
    id: 6,
    name: "Giorgia Meloni",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Giorgia_Meloni_2022.jpg",
    wiki: "https://it.wikipedia.org/wiki/Giorgia_Meloni",
  },
  {
    id: 7,
    name: "Luigi Di Maio",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/74/Luigi_Di_Maio_2021_%28cropped%29.jpg",
    wiki: "https://it.wikipedia.org/wiki/Luigi_Di_Maio",
  },
  {
    id: 8,
    name: "Sergio Mattarella",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Sergio_Mattarella_Presidente_della_Repubblica_Italiana.jpg",
    wiki: "https://it.wikipedia.org/wiki/Sergio_Mattarella",
  },
  {
    id: 9,
    name: "Angelo Bonelli",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Angelo_Bonelli_%282006%29.jpg",
    wiki: "https://it.wikipedia.org/wiki/Angelo_Bonelli",
  },
  {
    id: 10,
    name: "Enrico Letta",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Enrico_Letta_2022_%28cropped%29.jpg",
    wiki: "https://it.wikipedia.org/wiki/Enrico_Letta",
  },
  {
    id: 11,
    name: "Luigi de Magistris",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/11/Luigi_de_Magistris_%28cropped%29.jpg",
    wiki: "https://it.wikipedia.org/wiki/Luigi_de_Magistris",
  },
  {
    id: 12,
    name: "Marco Cappato",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Marco_Cappato_all%27Europarlamento.jpg",
    wiki: "https://it.wikipedia.org/wiki/Marco_Cappato",
  },
  {
    id: 13,
    name: "Emma Bonino",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/26/Emma_Bonino_2017_crop.jpg",
    wiki: "https://it.wikipedia.org/wiki/Giorgio_Napolitano",
  },
  {
    id: 14,
    name: "Antonio Pappalardo",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Pappalardo_intervista.jpg",
    wiki: "https://it.wikipedia.org/wiki/Antonio_Pappalardo",
  },
  {
    id: 15,
    name: "Gianluigi Paragone",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/53/Gianluigi_Paragone_datisenato_2018.jpg",
    wiki: "https://it.wikipedia.org/wiki/Gianluigi_Paragone",
  },
  {
    id: 16,
    name: "Sara Cuinal",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Sara_Cunial_2018.jpg",
    wiki: "https://it.wikipedia.org/wiki/Sara_Cuinal",
  },
  {
    id: 17,
    name: "Philipp Achammer",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Achammer.jpg",
    wiki: "https://it.wikipedia.org/wiki/Philipp_Achammer",
  },
  {
    id: 18,
    name: "Marco Ferrando",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Marco_Ferrando.jpg",
    wiki: "https://it.wikipedia.org/wiki/Marco_Ferrando",
  },
  {
    id: 19,
    name: "Silvio Berlusconi",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/db/Silvio_Berlusconi_May_2019.jpg",
    wiki: "https://it.wikipedia.org/wiki/Silvio_Berlusconi",
  },
  {
    id: 20,
    name: "Mario Adinolfi",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Mario_Adinolfi.jpg",
    wiki: "https://it.wikipedia.org/wiki/Mario_Adinolfi",
  },
  {
    id: 21,
    name: "Maurizio Lupi",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/21/Maurizio_Lupi_Official.jpeg",
    wiki: "https://it.wikipedia.org/wiki/Maurizio_Lupi",
  },
  {
    id: 22,
    name: "Jeff Bezos",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg",
    wiki: "https://it.wikipedia.org/wiki/Jeff_Bezos",
  },
  {
    id: 23,
    name: "Papa Francesco",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Portrait_of_Pope_Francis_%282021%29.jpg",
    wiki: "https://it.wikipedia.org/wiki/Papa_Francesco",
  },
  {
    id: 24,
    name: "Elon Musk",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg",
    wiki: "https://it.wikipedia.org/wiki/Elon_Musk",
  },
  {
    id: 25,
    name: "Mark Zuckerberg",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
    wiki: "https://it.wikipedia.org/wiki/Mark_Zuckerberg",
  },
  {
    id: 26,
    name: "Bill Gates",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Bill_Gates_2017_%28cropped%29.jpg",
    wiki: "https://it.wikipedia.org/wiki/Bill_Gates",
  },
  {
    id: 27,
    name: "Keanu Reeves",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Reuni%C3%A3o_com_o_ator_norte-americano_Keanu_Reeves_cropped_2_%2846806576944%29_%28cropped%29.jpg",
    wiki: "https://it.wikipedia.org/wiki/Keanu_Reeves",
  },
  {
    id: 28,
    name: "Gerry Scotty",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Gerry_Scotti_2010.jpg",
    wiki: "https://it.wikipedia.org/wiki/Gerry_Scotti",
  },
  {
    id: 29,
    name: "Samantha Cristoforetti",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Samantha_Cristoforetti_portrait.jpg",
    wiki: "https://it.wikipedia.org/wiki/Samantha_Cristoforetti",
  },
  {
    id: 30,
    name: "Angelina Jolie",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Angelina_Jolie_2_June_2014_%28cropped%29.jpg",
    wiki: "https://it.wikipedia.org/wiki/Angelina_Jolie",
  },
  {
    id: 31,
    name: "Jennifer Lopez",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/07/Jennifer_Lopez_at_GLAAD_Media_Awards_%28cropped%29.jpg",
    wiki: "https://it.wikipedia.org/wiki/Jennifer_Lopez",
  },
  {
    id: 32,
    name: "Michelle Hunziker",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/MJK62794_Michelle_Hunziker_%28Frankfurter_Buchmesse_2018%29.jpg",
    wiki: "https://it.wikipedia.org/wiki/Michelle_Hunziker",
  },
  {
    id: 33,
    name: "Maria De Filippi",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Maria_De_Filippi_a_Sanremo_2009.jpg",
    wiki: "https://it.wikipedia.org/wiki/Maria_De_Filippi",
  }
]

interface PollResult {
  votesFor1: number;
  votesFor2: number;
}

const Home: NextPage = () => {

  const [choices, setChoices] = useState<Premier[]>([]);
  const [fixedChoiceIndex, setFixedChoiceIndex] = useState<number>(0);
  const [excluded, setExcluded] = useState<number[]>([]);

  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<number>(0);

  const [nextChoice, setNextChoice] = useState<Premier | null>(null);
  const [pollResult, setPollResult] = useState<PollResult>({votesFor1: 0, votesFor2: 0});

  const [selectionDone, setSelectionDone] = useState<boolean>(false);

  const router = useRouter()

  const pickRandom = (arr: Premier[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const pickRandomPremier = (toAvoid: number[]): Premier | null => {
    let randomPremier = pickRandom(premiers);

    if (excluded.length === premiers.length) {
      console.log("All premiers have been excluded");
      return null;
    }

    if (toAvoid.includes(randomPremier.id) || excluded.includes(randomPremier.id)) {
      return pickRandomPremier(toAvoid);
    }

    return randomPremier;

  }

  const getVotes = (condidate1: string, candidate2: string) => {
    fetch(`/api/vote?candidate1=${condidate1}&candidate2=${candidate2}`)
      .then(res => res.json())
      .then(data => {
        setPollResult(data);
      })
      .catch(err => {
        alert(err)
      })
  }

  const saveVote = async (winner: Premier, loser: Premier) => {
    await fetch('/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        winner: winner.name,
        loser: loser.name
      })
    })
  }

  const setExcludedHandler = (toAdd: number[]) => {
    return function (prev: number[]) {

      const reallyToAdd = [];

      for (let a of toAdd) {
        if (!prev.includes(a)) {
          reallyToAdd.push(a);
        }
      }

      return [...prev, ...reallyToAdd];


    }
  }

  const chooseOne = (e: any) => {
    setFixedChoiceIndex(0);

    saveVote(choices[0], choices[1])
      .catch(alert)

    const newRandom = pickRandomPremier([]);
    if (newRandom) {
      setExcluded(setExcludedHandler([newRandom.id]));
    }

    if (isOver()) {
      setGameEnded(choices[0].id);
      router.push('?winner=' + choices[0].name);
      return;
    }

    if (!newRandom) {
      return;
    }

    setNextChoice(newRandom);
    setSelectionDone(true);

  }

  const chooseTwo = (e: any) => {
    setFixedChoiceIndex(1);

    saveVote(choices[1], choices[0])
      .catch(alert)

    const newRandom = pickRandomPremier([]);
    if (newRandom) {
      setExcluded(setExcludedHandler([newRandom.id]));
    }

    if (isOver()) {
      setGameEnded(choices[1].id);
      router.push('?winner=' + choices[1].name);
      return;
    }

    if (!newRandom) {
      return;
    }

    setNextChoice(newRandom);
    setSelectionDone(true);

  }

  useEffect(() => {

    const query = router.query;

    console.log(`query`, query)

    let first, second;

    if (query && query.first && query.second) {

      setGameStarted(true);

      first = premiers.find(p => p.name === query.first);
      second = premiers.find(p => p.name === query.second);
    } else {
      first = pickRandomPremier([]);
      if (!first) {
        console.log(`Something went wrong`);
        return;
      }
      second = pickRandomPremier([first.id]);
    }

    if (!first || !second) {
      return;
    }

    setExcluded(setExcludedHandler([first.id, second.id]));

    setChoices([first, second]);

    getVotes(first.name, second.name)


  }, [])

  const continueGame = () => {
    setSelectionDone(false);

    if (!nextChoice) {
      return;
    }

    if (fixedChoiceIndex === 0) {
      getVotes(choices[0].name, nextChoice.name);
      setChoices([choices[0], nextChoice]);

      updateRoute(choices[0], nextChoice);
    } else {
      getVotes(nextChoice.name, choices[1].name);
      setChoices([nextChoice, choices[1]]);
      updateRoute(nextChoice, choices[1]);

    }


  }

  const updateRoute = (first: Premier, second: Premier) => {
    if (!first || !second) {
      return;
    }
    router.push(`?first=${first.name}&second=${second.name}`)
  }

  const isOver = () => {
    return excluded.length === premiers.length;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Premier 2022 - Scegli il tuo premier</title>
        <meta name="description"
              content="Chi sarebbe più adatto ad essere il presidente del consiglio del nostro grande paese?"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      {!gameStarted && (
        <>


          <div className={styles.start}>


            <div className={styles.startText}>
              <h1>Premier 2022</h1>
              <p>Chi sarebbe più adatto a diventare primo ministro italiano?</p>

              <button onClick={() => {
                setGameStarted(true)
                updateRoute(choices[0], choices[1]);
              }}>Inizia
              </button>

            </div>


          </div>

        </>
      )}

      {gameEnded > 0 && (

        <div className={styles.gameEnded}>

          <p>La democrazia ha vinto ancora una volta!</p>

          <p>Il tuo premier sarà</p>

          <p className={styles.winner}>
            {premiers.find(p => p.id === gameEnded)?.name}
          </p>


        </div>
      )}

      {gameStarted && !gameEnded && <>
        <div className={styles.gameHeader}>
          <p>Clicca e scegli il PRIMO MINISTRO </p>
        </div>
        <main className={styles.main}>

          <div className={styles.side} style={{
            backgroundImage: `url(${choices[0]?.image})`,

          }} onClick={chooseOne}>

            <p className={styles.candidateName}>
              {choices[0] && `${choices[0].name}`}
            </p>

          </div>


          <div className={styles.separator}></div>


          <div className={styles.side} style={{
            backgroundImage: `url(${choices[1]?.image})`,
          }} onClick={chooseTwo}>
            <p className={styles.candidateName}>
              {choices[1] && `${choices[1].name}`}
            </p>


          </div>

        </main>

        {selectionDone && <div className={styles.selectionDone}>

          <p>Hai votato {choices[fixedChoiceIndex].name}</p>

          <p>
            Il {
            fixedChoiceIndex === 0 ?
              Math.round(((pollResult.votesFor1 + 1) / (pollResult.votesFor1 + pollResult.votesFor2 + 1) ) * 100)
              : Math.round(((pollResult.votesFor2 + 1) / (pollResult.votesFor1 + pollResult.votesFor2 + 1)) * 100)

            }% degli italiani
            preferirebbe {choices[fixedChoiceIndex].name} a {fixedChoiceIndex === 0 ? choices[1].name : choices[0].name}
          </p>

          <button onClick={() => {
            continueGame();
          }}>Continua
          </button>

        </div>}

      </>}


      <footer className={styles.footer}>
        <p>made with 🔨 by <a href="" target="_blank">@sickOscar</a> and <a href="" target="_blank">@gpericol</a></p>
      </footer>

    </div>
  )
}

export default Home

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
