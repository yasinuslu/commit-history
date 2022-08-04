import Image from 'next/image';
import { useEffect, useState } from 'react';
import { formatDistance } from 'date-fns';
import { GithubCommitResponse } from '../lib/types';

interface CommitListProps {
  commits: GithubCommitResponse[];
}

const CommitList = ({ commits }: CommitListProps) => {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center gap-2 mt-2">
      {commits.map((commit) => {
        return (
          <div
            key={commit.url}
            className="flex flex-col border border-red-300 p-4 w-1/2"
          >
            <a className="text-xl font-bold text-cyan-500">
              {commit.commit.message}
            </a>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-10 h-10 relative border rounded-full overflow-hidden">
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
            <div className="flex justify-end mt-2">
              {formatDistance(new Date(commit.commit.author.date), now)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommitList;
