import type { NextPage } from 'next';
import Image from 'next/image';
import useSWR from 'swr';
import { GithubCommitResponse } from '../lib/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: NextPage = () => {
  // Fetch data from external API
  const { data, error } = useSWR<GithubCommitResponse[]>(
    '/api/commits',
    fetcher,
  );
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-1 flex-col items-center gap-2 mt-2">
      {data.map((commit) => {
        return (
          <div key={commit.url} className="border border-red-300 p-4 w-1/2">
            <a className="text-xl font-bold text-cyan-500">
              {commit.commit.message}
            </a>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-10 h-10 relative">
                <Image
                  alt={commit.commit.author.name}
                  src={commit.author.avatar_url}
                  layout="fill"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-md">{commit.commit.author.name}</div>
                <div className="text-md">@{commit.author.login}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
