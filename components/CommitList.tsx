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
    <div className="flex flex-1 flex-col items-center gap-4 pt-4">
      {commits.map((commit) => {
        return (
          <div
            key={commit.html_url}
            className="flex flex-col p-4 w-1/2 bg-white rounded-md shadow-md shadow-current drop-shadow-md"
          >
            <a
              target="top _blank"
              aria-label="View commit on Github"
              href={commit.html_url}
              className="text-2xl text-black text-opacity-75"
              rel="noreferrer"
            >
              {commit.commit.message}
            </a>
            <div className="grid grid-cols-2 mt-6">
              <div className="flex gap-2 items-center">
                <div className="w-10 h-10 relative border rounded-full overflow-hidden">
                  <Image
                    aria-label="Author avatar"
                    alt={commit.commit.author.name}
                    src={commit.author.avatar_url}
                    layout="fill"
                  />
                </div>
                <div className="flex flex-col text-sm font-light text-gray-700">
                  <div aria-label="Author name">
                    {commit.commit.author.name}
                  </div>
                  <div aria-label="Author handle">@{commit.author.login}</div>
                </div>
              </div>
              <div
                aria-label="Commit date"
                className="flex justify-end items-end mt-2 font-extralight text-sm text-black text-opacity-50"
              >
                {formatDistance(
                  new Date(commit.commit.author.date),
                  currentTime,
                )}{' '}
                ago
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommitList;
