import { getUserSession } from "@/lib/session";
import GameContent from "./game-content";

export default async function Game() {
  const user = await getUserSession();
  return (
    <>
      <GameContent
        id={parseInt(JSON.stringify(user?.id))}
        image={JSON.stringify(user?.image)}
        name={JSON.stringify(user?.name)}
      />
    </>
  );
}
