// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {getClientIp} from 'request-ip';
import sqlite3 from 'sqlite3';
import {promisify} from "util";


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
  const db = new sqlite3.Database('./db.sqlite');
  const allAsync = promisify(db.all).bind(db);

  const sqlWhereWinnerIs1 = `
    SELECT COUNT(*) as count FROM votes 
    WHERE (
      (winner = ? AND loser = ?) 
     )`;
  // @ts-ignore
  const resultWhereWinnerIs1:any = await allAsync(sqlWhereWinnerIs1, [req.query.candidate1, req.query.candidate2]);

  const sqlWhereWinnerIs2 = `
    SELECT COUNT(*) as count FROM votes
    WHERE (
      (winner = ? AND loser = ?)
      )`;
  // @ts-ignore
  const resultWhereWinnerIs2:any = await allAsync(sqlWhereWinnerIs2, [req.query.candidate2, req.query.candidate1]);
  
  const response = {
    votesFor1: resultWhereWinnerIs1[0].count,
    votesFor2: resultWhereWinnerIs2[0].count
  }
  
  db.close();

  res.status(200).json(response)
}

async function handleVotePost(req: NextApiRequest, res: NextApiResponse) {
  const ip = getClientIp(req);


  console.log(`req.body`, req.body)

  const db = new sqlite3.Database('./db.sqlite');
  const runAsync = promisify(db.run).bind(db);

  const create = `CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT,
    winner TEXT,
    loser TEXT
  );`;

  await runAsync(create);

  const sql = `INSERT INTO votes (ip, winner, loser) VALUES (?, ?, ?)`;
  // @ts-ignore
  await runAsync(sql, [ip, req.body.winner, req.body.loser]);

  db.close();

  const response = {
    result: 'DONE',
    ip: ip
  }

  res.status(200).json(response)
}