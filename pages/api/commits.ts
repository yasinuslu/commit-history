// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Octokit } from '@octokit/core';
import { GithubCommitResponse } from '../../lib/types';

const githubClient = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GithubCommitResponse[]>,
) {
  const githubResponse = await githubClient.request(
    'GET /repos/{owner}/{repo}/commits',
    {
      owner: process.env.GITHUB_OWNER || '',
      repo: process.env.GITHUB_REPO || '',
    },
  );

  const commits = githubResponse.data as GithubCommitResponse[];

  res.status(200).json(commits);
}
