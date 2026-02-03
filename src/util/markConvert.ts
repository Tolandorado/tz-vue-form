import type { TTag } from "@/types/account.type";

export const stringToTags = (str: string): TTag[] => {
  return str
    .split(';')    
    .map(tag => tag.trim())
    .filter(tag => tag)          
    .map(tag => ({
      text: tag })) 
}

export const  tagsToString = (tags: string[]): string =>{
  return tags.map(tag => tag.trim()).filter(tag => tag).join('; ');
}