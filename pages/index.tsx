import type { NextPage } from 'next';
import Image from 'next/image';
import { GithubCommitResponse } from '../lib/types';

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/commits`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

interface HomeProps {
  data: GithubCommitResponse[];
}

const Home: NextPage<HomeProps> = ({ data }) => {
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
