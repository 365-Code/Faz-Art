import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Visitor } from "@/lib/models";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: Request) {
  await connectDB();

  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => {
      const [k, v] = c.split("=");
      return [k, decodeURIComponent(v)];
    })
  );

  let visitorId = cookies["visitor-id"];
  const now = new Date();

  // Fingerprint fallback
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown-ip";
  const userAgent = req.headers.get("user-agent") || "unknown-ua";
  const fingerprint = `${ip}-${userAgent}`;

  if (!visitorId) {
    // check if we already have a visitor with same fingerprint in last 24h
    let existing = await Visitor.findOne({
      visitorId: { $regex: `^fp-` }, // fingerprint-based IDs
      lastSeen: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    }).where("visitorId").equals(`fp-${fingerprint}`);

    if (existing) {
      visitorId = existing.visitorId;
      await Visitor.updateOne(
        { visitorId },
        { $set: { lastSeen: now } }
      );
    } else {
      visitorId = uuidv4();
      await Visitor.create({
        visitorId,
        firstVisit: now,
        lastSeen: now,
      });
    }
  } else {
    await Visitor.updateOne(
      { visitorId },
      { $set: { lastSeen: now } },
      { upsert: true }
    );
  }

  const totalVisitors = await Visitor.countDocuments();
  const activeVisitors = await Visitor.countDocuments({
    lastSeen: { $gte: new Date(Date.now() - 5 * 60 * 1000) }, // active within 5 min
  });

  const response = NextResponse.json({ totalVisitors, activeVisitors });

  // set cookie only if new visitor
  if (!cookies["visitor-id"]) {
    response.headers.set(
      "Set-Cookie",
      `visitor-id=${visitorId}; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax`
    );
  }

  return response;
}
