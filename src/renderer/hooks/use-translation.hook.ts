import { useMemo } from "react";
import { I18nService } from "renderer/services/i18n.service"

export function useTranslation(): (translationKey: string) => string{
    
    const i18nService = I18nService.getInstance();

    return (key: string) => {
        return useMemo(() => {
         const tranlatables = key.split(" ");
         return tranlatables.map((key) => i18nService.translate(key)).join(" ");
      }, [key, i18nService.currentLanguage]);
    }
}