import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";

export const getVisitorId = async () => {
  const cookieStore = cookies();
  let visitorId = (await cookieStore).get("visitorId")?.value;

  if (!visitorId) {
    visitorId = uuid();
    (await cookieStore).set("visitorId", visitorId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return visitorId;
};
