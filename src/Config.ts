
const config = {
    appTitle: (process.env.REACT_APP_TITLE) ? process.env.REACT_APP_TITLE : "SINTRA Scan App",
    fakeScanResult: "00123",
    urlEntry: process.env.REACT_APP_SINTRA_MAIN,
    urlSuffix: "/apiv3",

    urlLogin: "/login",

    urlCustomValidateMaterialsForNewContainer: "/custom_validate_materials_for_new_container",
    urlCustomSaveMaterialsForNewContainer: "/custom_save_materials_for_new_container",
    urlCustomSaveDevectiveMaterials: "/custom_save_materials_defective",

    defaultEmail: process.env.REACT_APP_DEFAULT_LOGIN,
    defaultPassword: process.env.REACT_APP_DEFAULT_PASSWORD,
}

export default config