// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Octokit } from '@octokit/core';
import { Commit } from '../lib/types';

const githubClient = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

type Data = Commit[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const githubResponse = await githubClient.request(
    'GET /repos/{owner}/{repo}/commits',
    {
      owner: process.env.GITHUB_OWNER || '',
      repo: process.env.GITHUB_REPO || '',
    },
  );
  const commits: Commit[] = githubResponse.data.map((commit) => ({
    author: {
      name: commit.commit.author?.name,
      email: commit.commit.author?.email,
      date: commit.commit.author?.date,
    },
    message: commit.commit.message,
    url: commit.url,
  }));

  res.status(200).json(commits);
}
