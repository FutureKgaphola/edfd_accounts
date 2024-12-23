import { CustomFlowbiteTheme } from 'flowbite-react';

export const NetworkTitle = "We Could Not Detect Internet Connection.";
export const NetworkMessage = "Please toogle or troubleshoot your internet connection.";

//submit button
export const customsubmitTheme: CustomFlowbiteTheme['button'] = {
    color: {
        appsuccess: "text-white hover:text-white bg-appGreen border border-transparent enabled:hover:bg-appGreen focus:ring-4 focus:ring-green-300 dark:bg-appGreen dark:enabled:hover:bg-black dark:focus:ring-appGreen",
        success: "text-white bg-appGreen border border-transparent enabled:hover:bg-appGreen focus:ring-4 focus:ring-green-300 dark:bg-appGreen dark:enabled:hover:bg-black dark:focus:ring-appGreen focus:border-appGreen",
        "failure": "border border-transparent bg-red-700 text-white focus:ring-4 focus:ring-red-300 enabled:hover:bg-red-800 dark:bg-red-600 dark:focus:ring-red-900 dark:enabled:hover:bg-red-700",
        light: "border border-gray-300 bg-white text-gray-900 focus:ring-4 focus:ring-green-300 enabled:hover:bg-appGreen hover:text-white dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:focus:ring-green-300 dark:enabled:hover:border-gray-700 hover:text-white dark:enabled:hover:ring-green-300",
    }
};

//Checkbox  theme
export const customCheckboxTheme: CustomFlowbiteTheme['checkbox'] = {
    root: {
        color: {
            success: "focus:ring-appGreen dark:ring-appGreen dark:focus:ring-appGreen text-appGreen"
        }
    }
};

//Footer
export const customFooterTheme:CustomFlowbiteTheme['footer']={
    "root": {
    "base": "w-full rounded-lg bg-white shadow dark:bg-gray-800 md:flex md:items-center md:justify-between",
    "container": "w-full p-6",
    "bgDark": "bg-gray-800"
  },
  "groupLink": {
    "base": "flex flex-wrap text-sm text-gray-500 dark:text-white",
    "link": {
      "base": "me-4 last:mr-0 md:mr-6",
      "href": "hover:underline"
    },
    "col": "flex-col space-y-4"
  },
  "icon": {
    "base": "text-gray-500 dark:hover:text-white",
    "size": "h-5 w-5"
  },
  "title": {
    "base": "mb-6 text-sm font-semibold uppercase text-gray-500 dark:text-white"
  },
  "divider": {
    "base": "my-6 w-full border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8"
  },
  "copyright": {
    "base": "text-sm text-gray-500 dark:text-gray-400 sm:text-center",
    "href": "ml-1 hover:underline",
    "span": "ml-1"
  },
  "brand": {
    "base": "mb-4 flex items-center sm:mb-0",
    "img": "mr-3 h-8",
    "span": "self-center whitespace-nowrap text-2xl font-semibold text-gray-800 dark:text-white"
  }
}

//badge
export const customBadgeTheme: CustomFlowbiteTheme['badge'] = {
    root: {
        color: {
            success: "bg-appGreen text-white font-thin"
        }
    }
};
export const customThemeTable:CustomFlowbiteTheme['table']={
    "root": {
    "base": "w-full text-left text-sm text-gray-500 dark:text-gray-400 bg-black ",
    "shadow": "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-black drop-shadow-md dark:bg-black",
    "wrapper": "relative"
  },
  "body": {
    "base": "group/body",
    "cell": {
      "base": "bg-black px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg"
    }
  },
  "head": {
    "base": "group/head text-xs uppercase text-appGreen bg-black dark:text-gray-400",
    "cell": {
      "base": "bg-black px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700"
    }
  },
  "row": {
    "base": "group/row",
    "hovered": "hover:bg-gray-50 dark:hover:bg-gray-600",
    "striped": "odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
  }
}
//badge
export const customAlertTheme: CustomFlowbiteTheme['alert'] = {
    "base": "flex flex-col gap-2 p-4 text-sm",
    "borderAccent": "border-t-4",
    "closeButton": {
        "base": "-m-1.5 ml-auto inline-flex h-8 w-8 rounded-lg p-1.5 focus:ring-2",
        "icon": "h-5 w-5",
        "color": {
            "info": "bg-cyan-100 text-cyan-500 hover:bg-cyan-200 focus:ring-cyan-400 dark:bg-cyan-200 dark:text-cyan-600 dark:hover:bg-cyan-300",
            "gray": "bg-gray-100 text-gray-500 hover:bg-gray-200 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
            "failure": "bg-red-100 text-red-500 hover:bg-red-200 focus:ring-red-400 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300",
            "success": "bg-green-100 text-green-500 hover:bg-green-200 focus:ring-green-400 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300",
            "warning": "bg-yellow-100 text-yellow-500 hover:bg-yellow-200 focus:ring-yellow-400 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300",
            "red": "bg-red-100 text-red-500 hover:bg-red-200 focus:ring-red-400 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300",
            "green": "bg-green-100 text-green-500 hover:bg-green-200 focus:ring-green-400 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300",
            "yellow": "bg-yellow-100 text-yellow-500 hover:bg-yellow-200 focus:ring-yellow-400 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300",
            "blue": "bg-blue-100 text-blue-500 hover:bg-blue-200 focus:ring-blue-400 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300",
            "cyan": "bg-cyan-100 text-cyan-500 hover:bg-cyan-200 focus:ring-cyan-400 dark:bg-cyan-200 dark:text-cyan-600 dark:hover:bg-cyan-300",
            "pink": "bg-pink-100 text-pink-500 hover:bg-pink-200 focus:ring-pink-400 dark:bg-pink-200 dark:text-pink-600 dark:hover:bg-pink-300",
            "lime": "bg-lime-100 text-lime-500 hover:bg-lime-200 focus:ring-lime-400 dark:bg-lime-200 dark:text-lime-600 dark:hover:bg-lime-300",
            "dark": "bg-gray-100 text-gray-500 hover:bg-gray-200 focus:ring-gray-400 dark:bg-gray-200 dark:text-gray-600 dark:hover:bg-gray-300",
            "indigo": "bg-indigo-100 text-indigo-500 hover:bg-indigo-200 focus:ring-indigo-400 dark:bg-indigo-200 dark:text-indigo-600 dark:hover:bg-indigo-300",
            "purple": "bg-purple-100 text-purple-500 hover:bg-purple-200 focus:ring-purple-400 dark:bg-purple-200 dark:text-purple-600 dark:hover:bg-purple-300",
            "teal": "bg-teal-100 text-teal-500 hover:bg-teal-200 focus:ring-teal-400 dark:bg-teal-200 dark:text-teal-600 dark:hover:bg-teal-300",
            "light": "bg-gray-50 text-gray-500 hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
        }
    },
    "color": {
        "info": "border-cyan-500 bg-cyan-100 text-cyan-700 dark:bg-cyan-200 dark:text-cyan-800",
        "gray": "border-gray-500 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
        "failure": "border-red-500 bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-800",
        "success": "border-green-500 bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800",
        "warning": "border-yellow-500 bg-yellow-100 text-yellow-700 dark:bg-yellow-200 dark:text-yellow-800",
        "red": "border-red-500 bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-800",
        "green": "border-green-500 bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800",
        "yellow": "border-yellow-500 bg-yellow-100 text-yellow-700 dark:bg-yellow-200 dark:text-yellow-800",
        "blue": "border-blue-500 bg-blue-100 text-blue-700 dark:bg-blue-200 dark:text-blue-800",
        "cyan": "border-cyan-500 bg-cyan-100 text-cyan-700 dark:bg-cyan-200 dark:text-cyan-800",
        "pink": "border-pink-500 bg-pink-100 text-pink-700 dark:bg-pink-200 dark:text-pink-800",
        "lime": "border-lime-500 bg-lime-100 text-lime-700 dark:bg-lime-200 dark:text-lime-800",
        "dark": "border-gray-600 bg-gray-800 text-gray-200 dark:bg-gray-900 dark:text-gray-300",
        "indigo": "border-indigo-500 bg-indigo-100 text-indigo-700 dark:bg-indigo-200 dark:text-indigo-800",
        "purple": "border-purple-500 bg-purple-100 text-purple-700 dark:bg-purple-200 dark:text-purple-800",
        "teal": "border-teal-500 bg-teal-100 text-teal-700 dark:bg-teal-200 dark:text-teal-800",
        "light": "border-gray-400 bg-gray-50 text-gray-600 dark:bg-gray-500 dark:text-gray-200"
    },
    "icon": "mr-3 inline h-5 w-5 flex-shrink-0",
    "rounded": "rounded-lg",
    "wrapper": "flex items-center"
};

//progrssbars
export const customProgTheme: CustomFlowbiteTheme['progress'] = {
    color: {
        "red": "bg-red-600 dark:bg-red-500",
        'green': "bg-appGreen",
        "yellow": "bg-yellow-400",
    }
};
//textinput
export const customInputBoxTheme: CustomFlowbiteTheme['textInput'] = {

    field: {
        input: {
            colors: { focuscolor: "bg-gray-50 border-gray-300 text-gray-900 focus:ring-appGreen focus:ring-appGreen dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-appGreen dark:focus:ring-appGreen focus:border-appGreen" },
            "base": "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
            "sizes": {
                "sm": "p-2 sm:text-xs",
                "md": "p-2.5 text-sm",
                "lg": "p-4 sm:text-base"
            },
            "withRightIcon": {
                "on": "pr-10",
                "off": ""
            },
            "withIcon": {
                "on": "pl-10",
                "off": ""
            },
            "withAddon": {
                "on": "rounded-r-lg",
                "off": "rounded-lg"
            },
            "withShadow": {
                "on": "shadow-sm dark:shadow-sm-light",
                "off": ""
            }

        },
        "icon": {
            "base": "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
            "svg": "h-5 w-5 text-gray-500 dark:text-gray-400"
        },
        "rightIcon": {
            "base": "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
            "svg": "h-5 w-5 text-gray-500 dark:text-gray-400"
        },

    }

};

export const customselectTheme: CustomFlowbiteTheme['select'] = {
    field: {
        select: {
            colors: {
                success: "bg-gray-50 border-gray-300 text-gray-900 focus:ring-appGreen focus:ring-appGreen dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-appGreen dark:focus:ring-appGreen focus:border-appGreen"
            },
            withShadow: {
                on: "shadow-sm dark:shadow-sm-light"
            }
        }
    }
};