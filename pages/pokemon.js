import Layout from "../components/Layout";
import Link from "next/link";

const Pokemon = ({ pokeman }) => {
  console.log(pokeman);
  return (
    <Layout title={pokeman.name}>
      <h1 className="text-2xl capitalize text-center">{pokeman.name}</h1>
      <img
        className="mx-auto w-64 h-64"
        src={pokeman.image}
        alt={pokeman.name}
      />
      <div className="text-center">
        <p>
          <span className="font-bold mr-2">Weight:</span>
          {pokeman.weight} kg
        </p>
        <p>
          <span className="font-bold mr-2">Height:</span>
          {pokeman.height} m
        </p>
        <h2 className="text-2xl mb-2 mt-4 underline">Abilities</h2>
        {pokeman.abilities.map((abi, index) => (
          <p key={index}>{abi.ability.name}</p>
        ))}
        <h2 className="text-2xl mb-2 mt-4 underline">Types</h2>
        {pokeman.types.map((type, index) => (
          <p key={index}>{type.type.name}</p>
        ))}
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-5">
            Home
          </button>
        </Link>
      </div>
    </Layout>
  );
};
export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await res.json();
    const paddedIndex = ("00" + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
    pokeman.image = image;
    return {
      props: {
        pokeman,
      },
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
export default Pokemon;
