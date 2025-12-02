import { getAllShortLinks } from "@/lib/db/getters";
import { Dashboard } from "../components/dashboard";
import { ShortLinkType } from "@/types/types";

export default async function DashboardPage() {

  const response = await getAllShortLinks();

  return (
    <Dashboard tableData={response.data}  />
  );
}
