import type { TTag } from "@/types/account.type";

export const stringToTags = (str: string): TTag[] => {
  return str
    .split(';')
    .map(tag => tag.trim())
    .filter(tag => tag)
    .map(tag => ({
      text: tag
    }))
}

export const tagsToString = (tags: TTag[]): string => {
  return tags.map(tag => tag.text.trim()).join('; ');
}