import { z } from "zod";

// One set of rules for the form and the server, so both always agree.
export const contactSchema = z.object({
  purpose: z.enum(["Job offer", "Project", "Say hello"]),
  name: z.string().trim().min(2, "Please add your name.").max(80, "That name is a bit long."),
  email: z.string().trim().email("That email address doesn't look right."),
  message: z
    .string()
    .trim()
    .min(5, "Please write a little more.")
    .max(5000, "Please keep it under 5000 characters."),
  // Hidden from people. Bots fill it in, which is how they give themselves away.
  website: z.string().optional(),
});
