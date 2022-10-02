import CustomHead from "@/components/CustomHead";
import NextLink from "next/link";

const Pathfinding = () => {
  return (
    <>
      <CustomHead title="Pathfinding"></CustomHead>
      <h1>Pathfinding</h1>
      <NextLink href="/" passHref>
        <button>Home</button>
      </NextLink>
    </>
  );
};

export default Pathfinding;
