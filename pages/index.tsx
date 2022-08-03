import type { NextPage } from 'next';
import { Commit } from './lib/types';

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/commits`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

interface HomeProps {
  data: Commit[];
}

const Home: NextPage<HomeProps> = ({ data }) => {
  return (
    <div>
      {data.map((commit) => {
        return (
          <div key={commit.url} className="border-red-300">
            <div>{commit.message}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
