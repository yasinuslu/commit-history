import { formatDistance } from 'date-fns';
import Image from 'next/image';
import useCurrentTime from '../hooks/useCurrentTime';
import { GithubCommitResponse } from '../lib/types';

interface CommitListProps {
  commits: GithubCommitResponse[];
}

const CommitList = ({ commits }: CommitListProps) => {
  const currentTime = useCurrentTime();

  return (
    <div className="flex flex-1 flex-col items-center gap-2 mt-2">
      {commits.map((commit) => {
        return (
          <div
            key={commit.html_url}
            className="flex flex-col border border-red-300 shadow-red-300 p-4 w-1/2"
          >
            <a
              target="top _blank"
              aria-label="View commit on Github"
              href={commit.html_url}
              className="text-xl font-bold text-cyan-500"
              rel="noreferrer"
            >
              {commit.commit.message}
            </a>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-10 h-10 relative border rounded-full overflow-hidden border-red-400">
                <Image
                  aria-label="Author avatar"
                  alt={commit.commit.author.name}
                  src={commit.author.avatar_url}
                  layout="fill"
                />
              </div>
              <div className="flex flex-col">
                <div aria-label="Author name" className="text-md">
                  {commit.commit.author.name}
                </div>
                <div aria-label="Author handle" className="text-md">
                  @{commit.author.login}
                </div>
              </div>
            </div>
            <div aria-label="Commit date" className="flex justify-end mt-2">
              {formatDistance(new Date(commit.commit.author.date), currentTime)}{' '}
              ago
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommitList;
