import nodemailer from "nodemailer";
import { contactSchema } from "#shared/contact";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recentByVisitor = new Map<string, number[]>();

const isRateLimited = (visitor: string) => {
  const now = Date.now();
  const recent = (recentByVisitor.get(visitor) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  recentByVisitor.set(visitor, recent);
  return recent.length > MAX_PER_WINDOW;
};

export default defineEventHandler(async (event) => {
  const parsed = contactSchema.safeParse(await readBody(event));
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parsed.error.issues[0]?.message ?? "Please check the form.",
    });
  }

  const { purpose, name, email, message, website } = parsed.data;

  // Bots get a normal answer so they don't try again.
  if (website) return { ok: true };

  const visitor = getRequestIP(event, { xForwardedFor: true }) ?? "unknown";
  if (isRateLimited(visitor)) {
    throw createError({ statusCode: 429, statusMessage: "Too many messages. Please try again later." });
  }

  const { smtp } = useRuntimeConfig(event);
  if (!smtp.user || !smtp.password) {
    throw createError({ statusCode: 503, statusMessage: "Email is not set up yet." });
  }

  const port = Number(smtp.port);
  const transport = nodemailer.createTransport({
    host: smtp.host,
    port,
    secure: port === 465,
    auth: { user: smtp.user, pass: smtp.password },
  });

  const singleLineName = name.replace(/[\r\n]+/g, " ");

  try {
    await transport.sendMail({
      from: { name: "Design By Faizi", address: smtp.user },
      to: smtp.to || smtp.user,
      replyTo: { name: singleLineName, address: email },
      subject: `${purpose} from ${singleLineName}`,
      text: `${message}\n\n-- \n${singleLineName} <${email}>\nSent from the contact form on designbyfaizi.com`,
    });
  } catch (error) {
    console.error("Contact form email failed:", error);
    throw createError({ statusCode: 502, statusMessage: "The message could not be sent." });
  }

  return { ok: true };
});
