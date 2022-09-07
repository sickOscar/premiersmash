import client from "../lib/db";
import styles from '../styles/Ranking.module.css'
import Link from "next/link";
import Head from "next/head";
import React from "react";

function Classifica({data, total}: { data: any[], total:number }) {
  return (
    <>
      <Head>
        <title>Classifica</title>
      </Head>
      <div className={styles.ranking}>
        <header className={styles.header} >
          <div>
            <a className={styles.title} href={"/"}>
              Premier2022
            </a>
          </div>

          <div className={styles.linkBox}>
            <a className="twitter-share-button"
               href={`https://twitter.com/intent/tweet?text=Gli italiani stanno scegliedo il prossimo premier. Vieni a votare anche tu!&url=https://www.premier2022.it`}
               target="_blank"
               rel="noreferrer"
            >
              <img src="/twitter.svg" alt="twitter" style={{
                width: `20px`,
                height: `20px`
              }}/>
            </a>
          </div>
        </header>
        <div className={styles.titleBox}>
          <h1>Classifica</h1>
        </div>

        <p style={{textAlign: 'center'}}>
          Gli italiani hanno esercitato la sovranità democratica <em style={{fontSize: "2em"}}>{total}</em> volte
        </p>

        <table>
          <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Percentuale di vittorie dirette</th>
          </tr>
          </thead>
          <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td className={styles.position}>{item.position}</td>
              <td>{item.candidate}</td>
              {/*<td>{item.total}</td>*/}
              {/*<td>{item.wins}</td>*/}
              {/*<td>{item.losses}</td>*/}
              <td>{item.percentage}%</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>

  );
}

// This function gets called at build time
export async function getServerSideProps() {

  const sqlWinners = `
    SELECT winner, COUNT(*) as wins
    FROM votes 
    WHERE winner IN (
      SELECT DISTINCT winner
      from votes
    )
    GROUP BY winner
    ORDER BY wins DESC
  `;
  const resWinners = await client.query(sqlWinners);


  const sqlLosers = `
    SELECT loser, COUNT(*) as losses
    FROM votes
    WHERE loser IN (
      SELECT DISTINCT loser
      FROM votes
    )
    GROUP BY loser
    ORDER BY losses DESC
  `
  const resLosers = await client.query(sqlLosers);

  const sqlTotal = `
    SELECT COUNT(*) as total
    FROM votes
    `;
  const totalQuery = await client.query(sqlTotal);
  const total = totalQuery.rows[0].total;


  const data = resWinners.rows.map(({winner, wins}, i) => {

    const loserResult = resLosers.rows.find(({loser, losses}) => {
      return loser === winner;
    })
    if (!loserResult) {
      return null;
    }

    const {loser, losses} = loserResult;

    return {
      candidate: winner,
      wins: parseInt(wins),
      losses: parseInt(losses),
      total: parseInt(wins) + parseInt(losses),
      percentage: ((parseInt(wins) / (parseInt(wins) + parseInt(losses))) * 100).toFixed(2)
    }

  })
    .filter(res => res)
    // @ts-ignore
    .sort((a, b) => b.percentage - a.percentage)
    .map((res, i) => {
      return {
        ...res,
        position: i + 1
      }
    })


  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data,
      total
    },
  }
}

export default Classifica;