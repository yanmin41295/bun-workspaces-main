const lang = ["zh_CN", "en_US"] as const

const i18Key = ["user_name", "user_age"] as const

export type Lang = typeof lang[number]
export type I18NKey = typeof i18Key[number]

export type Bundler = {
    [key in I18NKey]: {
        [key in Lang]: string
    }
}

export const bundler: Bundler = {
    user_name: {
        "zh_CN": "添加",
        "en_US": "Add"
    },
    user_age: {
        zh_CN: "年龄",
        en_US: "Age"
    }
} as const