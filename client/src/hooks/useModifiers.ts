import { useMemo } from "react";

type Conditions = {
  [key: string]: boolean;
};

export const useModifiers = (
  baseClass: string,
  conditionalClasses: Conditions,
  styles: Record<string, string>,
  withBaseClass: boolean = true
): string => {
  return useMemo(() => {
    let finalClasses = withBaseClass ? styles[baseClass] || baseClass : "";
    
    Object.keys(conditionalClasses).forEach((modifier) => {
      if (conditionalClasses[modifier]) {
        const modifiedClassName = `${baseClass}_${modifier}`;
        const actualClassName = styles[modifiedClassName] || modifiedClassName;
        finalClasses += ` ${actualClassName}`;
      }
    });
    
    return finalClasses.trim();
  }, [baseClass, conditionalClasses, withBaseClass, styles]);
};