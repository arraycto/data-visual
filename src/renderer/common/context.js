import { createContext } from "react";
import materials from "~packages/materials";

export const Ctx = createContext({});
export const Compose = createContext();

export function getField(type) {
  let fieldCanRedefine = false;
  let Field = materials[type];

  if (Field) {
    fieldCanRedefine = !!Field;
  }

  return {
    fieldCanRedefine,
    Field: Field || null
  };
}
