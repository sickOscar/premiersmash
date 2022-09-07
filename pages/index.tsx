import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {getCookie, setCookie} from 'cookies-next';
import {createCipheriv, randomBytes, randomFill, scrypt} from "crypto";
import Link from "next/link";


interface Premier {
  id: number;
  name: string;
  image: string;
}

const premiers: Premier[] = [
  {
    id: 1,
    name: "Carlo Calenda",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Calenda-photos2_%28cropped%29.jpg",
  },
  {
    id: 2,
    name: "Raffaele Fantetti",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Raffaele_Fantetti_datisenato_2018.jpg",
  },
  {
    id: 3,
    name: "Matteo Salvini",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Matteo_Salvini_Viminale.jpg",
  },
  {
    id: 5,
    name: "Giuseppe Conte",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/60/Giuseppe_Conte_-_Foto.jpeg",
  },
  {
    id: 6,
    name: "Giorgia Meloni",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Giorgia_Meloni_2022.jpg",
  },
  {
    id: 7,
    name: "Luigi Di Maio",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/74/Luigi_Di_Maio_2021_%28cropped%29.jpg",
  },
  {
    id: 8,
    name: "Sergio Mattarella",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Sergio_Mattarella_Presidente_della_Repubblica_Italiana.jpg",
  },
  {
    id: 9,
    name: "Angelo Bonelli",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Angelo_Bonelli_%282006%29.jpg",
  },
  {
    id: 10,
    name: "Enrico Letta",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Enrico_Letta_2022_%28cropped%29.jpg",
  },
  {
    id: 11,
    name: "Luigi de Magistris",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/11/Luigi_de_Magistris_%28cropped%29.jpg",
  },
  {
    id: 12,
    name: "Marco Cappato",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Marco_Cappato_all%27Europarlamento.jpg",
  },
  {
    id: 13,
    name: "Emma Bonino",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/26/Emma_Bonino_2017_crop.jpg",
  },
  {
    id: 14,
    name: "Antonio Pappalardo",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Pappalardo_intervista.jpg",
  },
  {
    id: 15,
    name: "Gianluigi Paragone",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/53/Gianluigi_Paragone_datisenato_2018.jpg",
  },
  {
    id: 16,
    name: "Sara Cuinal",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Sara_Cunial_2018.jpg",
  },
  {
    id: 17,
    name: "Philipp Achammer",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Achammer.jpg",
  },
  {
    id: 18,
    name: "Marco Ferrando",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Marco_Ferrando.jpg",
  },
  {
    id: 19,
    name: "Silvio Berlusconi",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/db/Silvio_Berlusconi_May_2019.jpg",
  },
  {
    id: 20,
    name: "Mario Adinolfi",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Mario_Adinolfi.jpg",
  },
  {
    id: 21,
    name: "Maurizio Lupi",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/21/Maurizio_Lupi_Official.jpeg",
  },
  {
    id: 23,
    name: "Papa Francesco",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Portrait_of_Pope_Francis_%282021%29.jpg",
  },
  {
    id: 28,
    name: "Gerry Scotty",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Gerry_Scotti_2010.jpg",
  },
  {
    id: 29,
    name: "Samantha Cristoforetti",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Samantha_Cristoforetti_portrait.jpg",
  },
  {
    id: 32,
    name: "Michelle Hunziker",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/MJK62794_Michelle_Hunziker_%28Frankfurter_Buchmesse_2018%29.jpg",
  },
  {
    id: 33,
    name: "Maria De Filippi",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Maria_De_Filippi_a_Sanremo_2009.jpg",
  },
  {
    id: 34,
    name: "Giulia De Lellis",
    image: "https://s.yimg.com/ny/api/res/1.2/q6X2zevwHRB4KdHphXWJbw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTU0NztjZj13ZWJw/https://s.yimg.com/uu/api/res/1.2/W0xENNNYr6VVSzqrV7T.eA--~B/aD02ODQ7dz0xMjAwO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/it/notizie_it_154/9a69230fb5aa5e3f019c1b3560f3c306"
  },
  {
    id: 35,
    name: "Fedez",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/39/Fedez_crop%2C_Grugliasco_%28TO%29%2C_2015-07-18.jpg"
  },
  {
    id: 36,
    name: "Gigi D'Alessio",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Gigi_dAlessio.jpg",
  },
  {
    id: 37,
    name: "Gianluca Vacchi",
    image: "https://images2.corriereobjects.it/methode_image/2022/05/27/Interni/Foto%20Interni%20-%20Trattate/gianluca-31-kweb-u33501897631136sf-656x492corriere-web-sezioni_MASTER.jpg?v=20220527093957"
  },
  {
    id: 38,
    name: "Chiara Ferragni",
    image: "https://theblondesalad.com/wp-content/uploads/2020/09/cf-herotalent-1-1024x576.jpg"
  },
  {
    id: 39,
    name: "Il drago Smaug",
    image: "https://upload.wikimedia.org/wikipedia/it/a/a6/Smaug.png"
  },
  {
    id: 40,
    name: "Maurizio Gasparri",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Murizio_Gasparri_datisenato_2018.jpg"
  },
  {
    id: 41,
    name: "Daniela Santanchè",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Daniela_Santanch%C3%A8_datisenato_2018.jpg"
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

  const [progresses, setProgresses] = useState<number[]>([]);

  const refVoteOne = useRef<HTMLDivElement>(null)
  const refVoteTwo = useRef<HTMLDivElement>(null)
  const refGameProgress = useRef<HTMLDivElement>(null)

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
        console.log(err)
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

  useEffect(() => {
    console.log('update progresses')
    updateProgressBar()
    updateProgress();
  }, [progresses])

  const chooseOne = (e: any) => {
    setFixedChoiceIndex(0);

    saveVote(choices[0], choices[1])
      .catch(console.log)

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

    const width1 = ((pollResult.votesFor1 + 1) / (pollResult.votesFor1 + pollResult.votesFor2 + 1)) * 100
    const width2 = ((pollResult.votesFor2) / (pollResult.votesFor1 + pollResult.votesFor2 + 1)) * 100
    console.log(`width1, width2`, width1, width2)
    setProgresses([width1, width2]);


  }

  const chooseTwo = (e: any) => {
    setFixedChoiceIndex(1);

    saveVote(choices[1], choices[0])
      .catch(console.log)

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

    const totalVotes = pollResult.votesFor1 + pollResult.votesFor2 + 1;

    const width1 = ((pollResult.votesFor1) / totalVotes) * 100
    const width2 = ((pollResult.votesFor2 + 1) / totalVotes) * 100
    console.log(`width1, width2`, width1, width2)

    setProgresses([width1, width2]);

  }

  const updateProgress = () => {
    setTimeout(() => {
      if (refGameProgress.current) {
        const percentProgress = (excluded.length / premiers.length) * 100;
        refGameProgress.current.style.width = `${percentProgress}%`;
      }

    }, 100)
  }

  const updateProgressBar = () => {

    setTimeout(() => {
      // width: `${Math.round(((pollResult.votesFor1 + (fixedChoiceIndex === 0 ? 1 : 0)) / (pollResult.votesFor1 + pollResult.votesFor2 + 1)) * 100)}%`,
      if (refVoteOne.current) {
        refVoteOne.current.style.width = `${Math.round(progresses[0])}%`
      }

      if (refVoteTwo.current) {
        refVoteTwo.current.style.width = `${Math.round(progresses[1])}%`
      }
    }, 200)


  }

  useEffect(() => {

    const query = router.query;

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

  const reload = () => {
    setGameStarted(false);
    setSelectionDone(false);
    setGameEnded(0);
    setExcluded([]);
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
        <script defer data-domain="premier2022.it" src="https://plausible.io/js/plausible.js"></script>
      </Head>

      {!gameStarted && (
        <>

          <video autoPlay muted loop id={'bgvideo'} className={styles.bgvideo}>
            <source src="/parlamento.mp4" type="video/mp4"/>
          </video>

          <div className={styles.start}>

            <div className={styles.startText}>
              <h1 className={styles.title}>Premier 2022</h1>
              <p style={{
                fontSize: '26px',
              }}>Chi sarebbe più adatto a diventare primo ministro italiano?</p>

              <button className={styles.btn} onClick={() => {
                setGameStarted(true)
                updateRoute(choices[0], choices[1]);
              }}>Inizia
              </button>

              <p>
                <Link href={'/classifica'}>
                  Vedi i risultati
                </Link>
              </p>

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

          <div className={styles.shareBox}>
            <a className="twitter-share-button"
               href={`https://twitter.com/intent/tweet?text=Ho scelto il primo ministro: sarà ${premiers.find(p => p.id === gameEnded)?.name}. E tu cosa sceglieresti%3F&url=https://${encodeURI(window.location.hostname)}`}
               target="_blank"
               rel="noreferrer"
            >
              <img src="/twitter.svg" alt="twitter" style={{
                width: `30px`,
                height: `30px`
              }}/>
            </a>
          </div>

          <button className={styles.btn} onClick={() => {
            window.location.href = `/`
          }}>
            Gioca ancora
          </button>
          <p>
            <Link href={'/classifica'}>Vedi i risultati</Link>
          </p>


        </div>
      )}

      {gameStarted && !gameEnded && <>
        <div className={styles.gameHeader}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <button className={styles.backbutton} onClick={reload}> 🠸 </button>
            <p>Clicca e scegli il PRIMO MINISTRO </p>
            <div></div>
          </div>

          <div className={styles.gameProgressContainer}>
            <div className={styles.gameProgress} ref={refGameProgress}></div>
          </div>
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

          <p>Hai votato <span className={styles.matchWinner}>{choices[fixedChoiceIndex].name}</span></p>

          <p>
            Il <span className={styles.matchPercent}>{
            fixedChoiceIndex === 0 ?
              Math.round(((pollResult.votesFor1 + 1) / (pollResult.votesFor1 + pollResult.votesFor2 + 1)) * 100)
              : Math.round(((pollResult.votesFor2 + 1) / (pollResult.votesFor1 + pollResult.votesFor2 + 1)) * 100)

          }%</span><br/>
            <small>degli italiani preferirebbe</small>
            <br/>{choices[fixedChoiceIndex].name} a {fixedChoiceIndex === 0 ? choices[1].name : choices[0].name}
          </p>

          <div className={styles.progress}>
            <div className={styles.progressContainer}>

              {/*<p className={styles.numberOfVotes}>*/}
              {/*  {pollResult.votesFor1 + (fixedChoiceIndex === 0 ? 1 : 0)}*/}
              {/*  {pollResult.votesFor1 + (fixedChoiceIndex === 0 ? 1 : 0) !== 1 ? ` voti` : ` voto`}*/}
              {/*</p>*/}
              <div className={styles.progressBox} ref={refVoteOne} style={{
                backgroundColor: `rgba(0, 146, 70, 0.7)`,
                right: 0
              }}>
              </div>
            </div>
            <div style={{
              backgroundColor: `rgb(255, 255, 255)`,
              height: `100%`,
              width: `100px`
            }}></div>
            <div className={styles.progressContainer}>

              {/*<p className={styles.numberOfVotes}>*/}
              {/*  {pollResult.votesFor2 + (fixedChoiceIndex === 1 ? 1 : 0)}*/}
              {/*  {pollResult.votesFor2 + (fixedChoiceIndex === 1 ? 1 : 0) !== 1 ? ` voti` : ` voto`}*/}
              {/*</p>*/}
              <div className={styles.progressBox} ref={refVoteTwo} style={{
                backgroundColor: `rgba(206, 43, 55, 0.7)`,
              }}>
              </div>

            </div>
          </div>

          <div className={styles.shareBox}>
            <a className="twitter-share-button"
               href={`https://twitter.com/intent/tweet?text=Ho preferito ${choices[fixedChoiceIndex].name} a ${choices[fixedChoiceIndex === 0 ? 1 : 0].name} come premier italiano. E tu cosa sceglieresti%3F&url=${encodeURI(window.location.href)}`}
               target="_blank"
               rel="noreferrer"
            >
              <img src="/twitter.svg" alt="twitter" style={{
                width: `30px`,
                height: `30px`
              }}/>
            </a>
          </div>


          <div>
            <button className={styles.btn} onClick={() => {
              continueGame();
            }}>Continua
            </button>
          </div>


        </div>}

      </>}


      <footer className={styles.footer}>
        <p>made with 🔨 by <a href="https://github.com/sickOscar" target="_blank" rel="noreferrer">@sickOscar</a> and <a
          href="https://github.com/gpericol" target="_blank" rel="noreferrer">@gpericol</a></p>
      </footer>

    </div>
  )
}

export default Home

export async function getServerSideProps({req, res}: { req: any, res: any }) {

  const voterIdCookie = getCookie('voter_id', {req, res});
  if (!voterIdCookie) {
    const cookieValue = generateEncryptedCookie();
    setCookie('voter_id', cookieValue, {req, res, httpOnly: true});
  }

  return {
    props: {}, // will be passed to the page component as props
  }
}

function generateEncryptedCookie() {
    const algorithm = "aes-256-ctr";
    const iv = randomBytes(16);
    const cipher = createCipheriv(algorithm, process.env.COOKIE_KEY as string, iv);
    const text = `${process.env.COOKIE_PREFIX as string}${randomBytes(16).toString('hex')}`;
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]).toString('hex');
    return `${iv.toString('hex')}:${encrypted.toString()}`;

}