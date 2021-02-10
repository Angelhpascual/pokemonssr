import Layout from "../components/Layout";
import Link from "next/link";

export default function Home({ pokemon }) {
  return (
    <Layout title="Nextjs Pokedex">
      <h1 className="text-4xl mb-8 text-center">Nextjs Pokedex</h1>
      <ul>
        {pokemon.map((pokeman, index) => (
          <li key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a className="border border-gray my-2 p-4 capitalize flex items-center text-lg bg-gray-200 rounded-md">
                <img
                  className="w-20 h-20 mr-3"
                  src={pokeman.image}
                  alt={pokeman.name}
                />
                <span className="font-bold mr-2">{index + 1}.</span>
                {pokeman.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?&limit=100");
    const { results } = await res.json();
    const pokemon = results.map((pokeman, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      return {
        ...pokeman,
        image,
      };
    });
    return {
      props: { pokemon },
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
