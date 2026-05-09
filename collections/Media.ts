import type { CollectionConfig } from "payload";
import { ValidationError } from "payload";

function hasInvalidChars(name: string): boolean {
  return /[^a-zA-Z0-9._\-]/.test(name);
}

function sanitizeFilename(name: string): string {
  const ext = name.slice(name.lastIndexOf("."));
  const base = name.slice(0, name.lastIndexOf("."));
  return (
    base
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase() + ext.toLowerCase()
  );
}

export const Media: CollectionConfig = {
  slug: "media",
  upload: true,
  hooks: {
    beforeOperation: [
      ({ args, operation }) => {
        if ((operation === "create" || operation === "update") && args.req?.file) {
          const original = args.req.file.name;
          if (hasInvalidChars(original)) {
            const suggested = sanitizeFilename(original);
            throw new ValidationError({
              errors: [
                {
                  message: `Filename contains invalid characters (spaces, accents, parentheses, etc.). Please rename the file before uploading. Suggested name: "${suggested}"`,
                  path: "file",
                },
              ],
            });
          }
        }
        return args;
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
