import client from "../lib/db";
import {inspect} from "util";
import styles from '../styles/Ranking.module.css'

function Classifica({ data }:{ data: any[] }) {
  return (
    <div className={styles.ranking}>
      <h1 className={styles.title}>Classifica</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Percentuale di vittorie dirette</th>
          </tr>
        </thead>
        <tbody>
        {data.map((item,i) => (
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

  const data = resWinners.rows.map(({winner, wins}, i) => {

    const loserResult = resLosers.rows.find(({loser, losses}) => {
        return loser === winner;
    })
    if (!loserResult) {
      return null;
    }

    const { loser, losses } = loserResult;

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
    },
  }
}

export default Classifica;