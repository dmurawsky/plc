import { TitleAndList } from "@/services/types";
import { getData } from "@/services/client-side/api";

export default async function CommitteesPage() {
  const committees = await getData<TitleAndList>("committees");

  return (
    <div data-soil-id="CommitteesPage" className="flex flex-col p-4">
      <h1>{committees.title}</h1>
      <p>{committees.content}</p>

      <ul>
        <li>Finance</li>
        <li>Fundraiser</li>
        <li>Project</li>
      </ul>
    </div>
  );
}
