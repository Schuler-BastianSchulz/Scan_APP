import FlagIconFactory from 'react-flag-icon-css'
import React from "react";

const FlagIcon = FlagIconFactory(React, {useCssModules: false})

export const getIconFlagByLang = (lang: string): string => {
    if (lang == 'en') {
        return 'gb'
    } else {
        return lang
    }
}

export default FlagIcon