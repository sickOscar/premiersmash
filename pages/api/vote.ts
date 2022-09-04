// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {getClientIp} from 'request-ip';
import {promisify} from "util";
import {getCookie} from "cookies-next";
import {Client} from "pg";
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT as string),
});
client.connect()
  .then(() => console.log(`Connected to database`))

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  if (req.method === 'POST') {
    return handleVotePost(req, res);
  }

  if (req.method === 'GET') {
    return handleVoteGet(req, res);
  }

}

async function handleVoteGet(req: NextApiRequest, res: NextApiResponse) {

  const sqlWhereWinnerIs1 = `
    SELECT COUNT(*) as count FROM votes 
    WHERE (
      (winner = $1 AND loser = $2) 
     )`;
  // @ts-ignore
  const resultWhereWinnerIs1:any = await client.query(sqlWhereWinnerIs1, [req.query.candidate1, req.query.candidate2]);

  const sqlWhereWinnerIs2 = `
    SELECT COUNT(*) as count FROM votes
    WHERE (
      (winner = $1 AND loser = $2)
      )`;
  // @ts-ignore
  const resultWhereWinnerIs2:any = await client.query(sqlWhereWinnerIs2, [req.query.candidate2, req.query.candidate1]);
  
  const response = {
    votesFor1: parseInt(resultWhereWinnerIs1.rows[0].count),
    votesFor2: parseInt(resultWhereWinnerIs2.rows[0].count)
  }

  res.status(200).json(response)
}

async function handleVotePost(req: NextApiRequest, res: NextApiResponse) {
  const ip = getClientIp(req);
  const voterIdCookie = getCookie('voter_id', {req, res});
  console.log(`req.body`, req.body)

  let response;

  try {
    const sql = `INSERT INTO votes (ip, cookie, winner, loser) VALUES ($1, $2, $3, $4)`;
    // @ts-ignore
    await client.query(sql, [ip, voterIdCookie, req.body.winner, req.body.loser]);

    response = {
      result: 'DONE',
      ip: ip
    }
  } catch(err) {
    console.log(`Already voted for this pair`)
    response = {
      result: 'DONE',
      ip: ip
    }
  }



  res.status(200).json(response)
}