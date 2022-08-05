import type { NextPage } from 'next';
import useSWR from 'swr';
import CommitList from '../components/CommitList';
import { fetcher } from '../lib/fetcher';
import { GithubCommitResponse } from '../lib/types';

const Home: NextPage = () => {
  const { data: commits, error } = useSWR<GithubCommitResponse[]>(
    '/api/commits',
    fetcher,
  );
  if (error) return <div>Failed to load</div>;
  if (!commits) return <div>Loading...</div>;

  return (
    <div className="bg-gray-600">
      <CommitList commits={commits} />
    </div>
  );
};

export default Home;
